# ResidentOps

<p align="center">
  Real-time platform for managing residential operations — complaints, payments, and coordination.
</p>

<p align="center">
  <a href="https://residentops.vercel.app"><b>Live Demo</b></a> ·
  <a href="https://github.com/pranjalkasbekar/residentops"><b>Source</b></a>
</p>

---

## Preview

<p align="center">
  <img src="./public/screenshots/demo.gif" width="85%" />
</p>

---

## Overview

ResidentOps replaces fragmented workflows with a structured, real-time system:

<div align="center">

| Complaints        | Workers            | Payments           | Real-time        |
|------------------|-------------------|-------------------|------------------|
| Track lifecycle  | Assign & monitor  | Maintain records  | Instant updates  |

</div>

---

## System Design
Client (Next.js)
↓
State (Zustand)
↓
Firebase (Auth + Firestore)
↓
Real-time listeners → push updates



**Core idea:**  
Single source of truth + real-time subscriptions → consistent UI across users

---

## Key Capabilities

- Real-time sync using Firestore `onSnapshot`  
- Role-based dashboards (Admin / Resident)  
- Serverless architecture  
- Modular, reusable UI  

---

## Tech Stack

- Next.js → https://nextjs.org  
- Firebase → https://firebase.google.com  
- Zustand → https://github.com/pmndrs/zustand  
- Tailwind CSS → https://tailwindcss.com  

---

## Screens

<p align="center">
  <img src="./public/screenshots/landing.png" width="30%" />
  <img src="./public/screenshots/resident.png" width="30%" />
  <img src="./public/screenshots/admin.png" width="30%" />
</p>

---

## Run

```bash
git clone https://github.com/pranjalkasbekar/residentops
cd residentops
npm install
npm run dev
Status
Active development — improving production readiness.


