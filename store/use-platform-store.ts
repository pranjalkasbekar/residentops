"use client";

import { create } from "zustand";

type PlatformState = {
  residentTab: string;
  adminTab: string;
  setResidentTab: (tab: string) => void;
  setAdminTab: (tab: string) => void;
};

export const usePlatformStore = create<PlatformState>((set) => ({
  residentTab: "dashboard",
  adminTab: "complaints",
  setResidentTab: (residentTab) => set({ residentTab }),
  setAdminTab: (adminTab) => set({ adminTab }),
}));
