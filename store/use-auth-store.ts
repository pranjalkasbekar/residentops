"use client";

import { auth, db } from "@/lib/firebase";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { create } from "zustand";

export type Role = "SUPER_ADMIN" | "MANAGER" | "STAFF" | "ADMIN" | "RESIDENT";

type AuthUser = {
  uid: string;
  name: string;
  email: string;
  role: Role;
};

type LoginInput = {
  email: string;
  password: string;
  role: "ADMIN" | "RESIDENT";
  remember: boolean;
};

type SignupInput = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "ADMIN" | "RESIDENT";
};

type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
  initialized: boolean;
  login: (input: LoginInput) => Promise<AuthUser>;
  signup: (input: SignupInput) => Promise<AuthUser>;
  logout: () => Promise<void>;
  setRole: (role: Role) => void;
  initializeAuth: () => void;
};

async function getProfile(firebaseUser: User, fallbackRole: "ADMIN" | "RESIDENT" = "RESIDENT") {
  const profileRef = doc(db, "users", firebaseUser.uid);
  const profileSnap = await getDoc(profileRef);
  if (profileSnap.exists()) {
    const data = profileSnap.data() as { name?: string; role?: Role; phone?: string };
    return {
      uid: firebaseUser.uid,
      name: data.name ?? firebaseUser.displayName ?? "HomeOps User",
      email: firebaseUser.email ?? "",
      role: (data.role as Role) ?? fallbackRole,
    } satisfies AuthUser;
  }

  const profile: AuthUser = {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName ?? "HomeOps User",
    email: firebaseUser.email ?? "",
    role: fallbackRole,
  };
  await setDoc(
    profileRef,
    {
      name: profile.name,
      role: profile.role,
      email: profile.email,
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
  return profile;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  initialized: false,
  initializeAuth: () => {
    if (get().initialized) return;
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        set({ user: null, initialized: true, isLoading: false });
        return;
      }
      try {
        const profile = await getProfile(firebaseUser);
        set({ user: profile, initialized: true, isLoading: false });
      } catch {
        set({ user: null, initialized: true, isLoading: false });
      }
    });
    set({ initialized: true });
  },
  login: async ({ email, password, role, remember }) => {
    set({ isLoading: true });
    try {
      await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
      const creds = await signInWithEmailAndPassword(auth, email, password);
      const profile = await getProfile(creds.user, role);
      set({ user: profile, isLoading: false });
      return profile;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  signup: async ({ name, email, phone, password, role }) => {
    set({ isLoading: true });
    try {
      const creds = await createUserWithEmailAndPassword(auth, email, password);
      const user: AuthUser = { uid: creds.user.uid, name, email, role };
      await setDoc(doc(db, "users", creds.user.uid), {
        name,
        email,
        phone,
        role,
        createdAt: serverTimestamp(),
      });
      set({ user, isLoading: false });
      return user;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },
  setRole: (role) => {
    const user = get().user;
    if (!user) return;
    set({ user: { ...user, role } });
  },
}));
