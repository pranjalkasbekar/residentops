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

## Impact

- User-friendly interface enabling easy complaint registration and tracking  
- Eliminates unstructured communication (e.g., WhatsApp-based complaints)  
- Introduces accountability through tracked complaint lifecycle  
- Ensures transparency in maintenance payments  
- Enables real-time coordination between residents and administrators  
- Improves operational efficiency through a unified system  

---

## Future Scope

- Payment gateway integration for seamless transactions  
- Mobile application for wider accessibility  
- Middleware-based authentication and security enhancements  
- AI-based complaint categorization and prioritization  
- Advanced analytics dashboard for society insights  

---

## Status

Active development — improving production readiness.
