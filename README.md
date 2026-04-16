<div align="center">
  <img src="./public/favicon.svg" alt="ProServe Logo" width="72" />
  <h1>ProServe POS</h1>
  <p><strong>Restaurant Operations System</strong></p>
  <p><em>A modern, multi-screen point-of-sale system designed to simulate real-world ordering, kitchen workflows, and checkout processes.</em></p>
  <br/>
  <a href="https://github.com/Alysha93/ProServe-POS-System"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/Alysha93/ProServe-POS-System?style=flat-square&color=a855f7" /></a>
  <img alt="React" src="https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss" />
</div>


## ⚡ Features

| Feature | Description |
|---|---|
| **Real-Time Order Sync** | POS → Kitchen via Zustand global state. Zero latency, zero backend. |
| **Kitchen Display (KDS)** | 3-column live board with ⏱ per-order timers & urgency glow (green→yellow→red). |
| **Staff Shift Management** | Clock In/Out enforcement — orders are locked until a staff member is on-shift. |
| **Multi-Screen Workflow** | POS, Takeout, Kitchen, and Tables operate as independent synchronized views. |
| **Order Voiding** | Manager-level item void with visual strikethrough, excluded from totals. |
| **Promo Engine** | Live discount codes (`PROSERVE10`, `ELITE20`) with real-time total recalculation. |
| **Print Receipts** | `@media print` CSS generates clean paper-ready bills. |
| **Table Management** | Interactive drag-capable floor map — Available → Seated → Checkout → Clear. |
| **Speed Mode** | Keyboard shortcuts (1–9 to add items, Enter to send order). |
| **Dynamic Takeout UI** | Full-bleed hero banners, category filter pills, cart drawer, and mobile-first design. |

---

## 🧠 What Makes This Different

> Built with a focus on **real product workflows** rather than static UI demos.
>
> Every screen is interconnected. Adding an order on the POS immediately appears in the Kitchen Display. Completing an order in the Kitchen updates the table status. The system behaves like a real deployed product.

---

## 🚀 Quick Start

```bash
git clone https://github.com/Alysha93/ProServe-POS-System.git
cd ProServe-POS-System
npm install
npm run dev


## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **State** | Zustand (global real-time store) |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── kitchen/    # OrderCard with urgency timers
│   ├── layout/     # Sidebar + Layout shell
│   └── pos/        # MenuItem, CategoryTabs, OrderPanel
├── pages/
│   ├── POSPage         # Main ordering interface
│   ├── TakeoutPage     # Premium takeout experience
│   ├── KDSPage         # Kitchen Display System
│   └── TablesPage      # Table management map
└── store/
    └── useAppStore.ts  # Central Zustand store
```

---

## 💼 Resume Bullet Points

> *ProServe POS – Restaurant Operations System · React · TypeScript · Zustand*
>
> - Built a multi-screen restaurant POS with real-time UI synchronization across POS, Kitchen, and Table views
> - Implemented a Zustand global store enabling instant order state propagation with zero backend
> - Designed enterprise-grade features: staff shift enforcement, order voiding, promo engine, and print receipts
> - Applied modern UX patterns including per-ticket urgency timers, micro-interactions, and `@media print` CSS

---

<div align="center">
  <p>Made with ☕ and 🔥 · Built to get hired</p>
</div>
