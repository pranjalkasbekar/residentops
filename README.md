ResidentOps

<p align="center">
  Real-time platform for managing residential operations — complaints, payments, and coordination.
</p>

<p align="center">
  <a href="https://residentops.vercel.app">Live Demo</a> ·
  <a href="https://github.com/pranjalkasbekar/residentops">Source</a>
</p>

---

## Preview

<p align="center">
  <img src="./public/screenshots/demo.gif" width="85%" />
</p>

---

## What this is

ResidentOps is a full-stack system that replaces fragmented workflows (WhatsApp, manual tracking) with a structured, real-time platform.

It focuses on:
- complaint lifecycle management  
- worker assignment and tracking  
- maintenance payment visibility  
- real-time multi-user updates  

---

## System Design 
Client (Next.js)
↓
State Layer (Zustand)
↓
Firebase (Auth + Firestore)
↓
Real-time listeners → push updates to all clients



Core idea: 
Single source of truth (Firestore) + real-time subscriptions → instant consistency across users.

---

## Key Capabilities

- Real-time sync using Firestore `onSnapshot`  
- Role-based interfaces (Admin / Resident)  
- Serverless backend with automatic scaling  
- Modular UI system with consistent design  

---

## Tech Stack

- Next.js — https://nextjs.org  
- Firebase — https://firebase.google.com  
- Zustand — https://github.com/pmndrs/zustand  
- Tailwind CSS — https://tailwindcss.com  

---



<p align="center">
  <img src="./public/screenshots/landing.png" width="30%" />
  <img src="./public/screenshots/resident.png" width="30%" />
  <img src="./public/screenshots/admin.png" width="30%" />
</p>

---



```bash
git clone https://github.com/pranjalkasbekar/residentops
cd residentops
npm install
npm run dev
Status
Active development — currently improving production readiness (auth protection, payments, activity feed).

Why it matters
Most projects demonstrate CRUD.

This project focuses on:

real-time data consistency

multi-user interaction

system-level design decisions


Built to explore scalable frontend architecture with real-time backend systems.





