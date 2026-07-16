# 📱 ReTech | Pre-Owned Gadget Marketplace

A web platform where users can post their used tech gadgets for sale, and other users can find and buy necessary pre-owned items at affordable prices.

### 🚀 Quick Links
[![Live Demo](https://img.shields.io/badge/Live-Demo-4f46e5?style=for-the-badge&logo=vercel)](https://re-tech-phi.vercel.app)
[![Client Repository](https://img.shields.io/badge/Client-Repository-blue?style=for-the-badge&logo=github)](https://github.com/hridoy-web/ReTech)
[![Server Repository](https://img.shields.io/badge/Server-Repository-orange?style=for-the-badge&logo=github)](https://github.com/hridoy-web/ReTech-Backend)

---

## 💻 Project Features

- **🛍️ Sell & Buy Gadgets:** Users can create posts to sell their pre-owned tech hardware. Buyers can browse listings to find budget-friendly items.
- **📋 Manage Inventory:** Sellers can view all their active gadget posts in one dedicated space and instantly delete them if needed.
- **🔍 Dynamic Explore Page:** Fully functional filtering pipeline driven by the backend. Users can search and sort gadgets based on parameters like Title, Category, and Maximum Price.
- **🔥 Latest Additions Grid:** The home page displays a dynamic section rendering the 4 latest product listings directly fetched from the database.
- **🛡️ Secure Access:** Features authentication flow using BetterAuth to secure specific item routing actions.

---

## 📸 Interface Previews & Screenshots

### 🌐 Application Layouts
<table width="100%">
  <tr>
    <td width="50%">
      <p align="center"><b>🏠 Landing / Home Interface</b></p>
      <img src="https://github.com/hridoy-web/ReTech/blob/main/ReTech-Home.png?raw=true" alt="ReTech Home" width="100%"/>
    </td>
    <td width="50%">
      <p align="center"><b>🔥 Latest Additions (Dynamic 4-Grid)</b></p>
      <img src="https://github.com/hridoy-web/ReTech/blob/main/lateast-gadget.png?raw=true" alt="ReTech Latest Gadgets" width="100%"/>
    </td>
  </tr>
</table>

### 🔍 Explore Catalog & Inventory Workspaces
<table width="100%">
  <tr>
    <td width="50%">
      <p align="center"><b>⚡ Gadget Explore Catalog (Search & Filters)</b></p>
      <img src="https://github.com/hridoy-web/ReTech/blob/main/gadget-explore.png?raw=true" alt="ReTech Explore Page" width="100%"/>
    </td>
    <td width="50%">
      <p align="center"><b>📋 Manage Inventory Page (Seller Panel)</b></p>
      <img src="https://github.com/hridoy-web/ReTech/blob/main/manage-inventory.png?raw=true" alt="ReTech Manage Inventory" width="100%"/>
    </td>
  </tr>
</table>

---

## 🧠 Personal Journey & Learnings

> 💡 This project was specifically built to practice and get hands-on experience with **TypeScript**. 

As my very first TypeScript full-stack project, I faced numerous configuration errors and syntax roadblocks along the way. However, debugging these strict type issues helped me understand the core foundations of type safety and robust code structure. I managed to successfully resolve the errors and fully complete the application. In the future, whenever I get more time, I plan to integrate additional systems and improve the codebase further.

---

## 🛠️ Tech Stack

### 💻 Frontend Architecture
* ⚡ **Next.js 16** — React framework with App Routing and server rendering optimizations.
* 🛡️ **TypeScript** — Strict type structures for reliable state properties and parameters.
* 🔑 **BetterAuth** — Secure session orchestration for user authentication.
* 🎨 **Tailwind CSS v4** — Modern utility-first CSS compilation engine.
* 🌼 **DaisyUI** — Semantic component layouts built directly on Tailwind.
* 🍞 **React Hot Toast** — Non-blocking dashboard status alerts and updates.
* 📦 **React Icons** — Clean and lightweight vector glyph icons.

### ⚙️ Backend & Database
* 🟢 **Node.js** — Event-driven server runtime environment.
* 🚂 **Express.js** — Fast, structural server middleware utilizing type-safe pipelines.
* 🛡️ **TypeScript** — Enforced static types for models, server routing, and controller layers.
* 🍃 **MongoDB** — Scalable NoSQL database utilizing native driver aggregation configurations.

---

## 💻 Complete Local Environment Setup & Launch Guide

Follow this single terminal guide to clone the repositories, configure all required environment variables, install dependencies, and run both frontend and backend concurrently.

```bash
=========================================================================
# STEP 1: CLONE REPOSITORIES & SET UP FRONTEND CLIENT
=========================================================================
git clone https://github.com/hridoy-web/ReTech.git
cd ReTech

# --- Create Frontend Environment File (.env) ---

# ReTech Frontend Url
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=**YOUR_MONGODB_URI_HERE**
DB_NAME=**YOUR_DATABASE_NAME_HERE**
BETTER_AUTH_SECRET=**YOUR_BETTERAUTH_SECRET_KEY_HERE**
GOOGLE_CLIENT_ID=**YOUR_GOOGLE_CLIENT_ID_HERE**
GOOGLE_CLIENT_SECRET=**YOUR_GOOGLE_CLIENT_SECRET_HERE**
NEXT_PUBLIC_IMGBB_API_KEY=**YOUR_IMGBB_API_KEY_HERE**
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000

# Install frontend modules and run the client server
npm install
npm run dev

=========================================================================
# STEP 2: SET UP BACKEND SERVER ENVIRONMENT
=========================================================================
git clone https://github.com/hridoy-web/ReTech-Backend.git
cd ReTech-Backend

# --- Create Backend Environment File (.env) ---
PORT=8000
MONGO_URI=**YOUR_MONGODB_URI_HERE**

# Install backend dependencies and launch the API gateway
npm install
npm run dev
