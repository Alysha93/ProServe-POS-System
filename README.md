# ProServe POS – Modern Restaurant Management UI

> ProServe POS is a modern frontend point-of-sale system designed to simulate real-world restaurant workflows including ordering, kitchen processing, and checkout.

## 🚀 Features

* **Real-time order flow simulation**: Add items to your cart, send the order, and watch it instantly appear on the KDS system using global state.
* **Multi-screen POS system**: Built out full UI views for taking orders, managing tickets, and categorizing menus.
* **Kitchen Display System (KDS)**: Time-based visual ticker tracking orders as they move from "New" to "Preparing" to "Ready". Features live pulsing states and timers.
* **Table Management UI**: Interactive restaurant map visualization for tracking active, empty, and checking-out tables.
* **Smooth UI animations**: Powered by `framer-motion` for fluid cart additions and status transitions that gives the app an alive feel.

## 🧠 Why This Project Stands Out

This project focuses on **production-level UI patterns**, **reusable component architecture**, and **real-world restaurant workflows** rather than static demo interfaces. It uses a custom Tailwind V4 design system built from scratch with premium CSS custom properties (layered dark modes, green accents, backdrop blurs).

## 🛠 Tech Stack

* **React** (Vite SPA)
* **Tailwind CSS V4** (Configured for premium SaaS look)
* **Zustand** (App-wide global state mocking WebSocket behaviors)
* **Framer Motion** (Layout animations)

## 📌 Architecture

The component architecture clearly separates the feature logic to simulate enterprise-grade application structure:
- `src/components/pos` - Holds the Menu System, grid cards, Category Tabs, and active Order Panel (cart).
- `src/components/kitchen` - Holds the Order KDS ticketer, pulsing statuses, and elapsed timer state logic.
- `src/components/layout` - Defines the App Shell with custom `react-router-dom` Sidebar integrations.
- `src/store` - The central `useAppStore` acts as a mock backend pushing data universally.

## 📸 Screenshots
*(Add screenshots once deployed)*
