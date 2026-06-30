# Flexura | Ultimate Fitness & Gym Management Platform

> A high-performance, role-based fitness ecosystem designed to streamline gym memberships, class scheduling, trainer management, and secure financial transactions.

### 🚀 Quick Links
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://flexura-frontend-fitness-and-gym-ma.vercel.app/)
[![Client Repository](https://img.shields.io/badge/Client-Repository-blue?style=for-the-badge&logo=github)](https://github.com/hridoy-web/flexura-frontend-fitness-and-gym-management-platform)
[![Server Repository](https://img.shields.io/badge/Server-Repository-orange?style=for-the-badge&logo=github)](https://github.com/hridoy-web/Flexura-Server)

---

## 🏋️‍♂️ Project Overview

**Flexura** is a comprehensive, production-grade Fitness & Gym Management Platform engineered to bridge the gap between fitness enthusiasts, certified trainers, and gym administrators. Built on the modern MERN stack with Next.js, Flexura provides a seamless digital environment for booking classes, tracking payments, and managing a growing fitness community. 

The platform solves real-world gym operational challenges by eliminating fragmented manual scheduling, ensuring secure payment operations, and offering modular administration through strict Role-Based Access Control (RBAC).

### 🔑 Demo Admin Credentials
To explore the administrative dashboard and advanced management metrics:
* **Email:** `hridoy463@gmail.com`
* **Password:** `Hridoy67`

---

## 📸 Interface Previews & Screenshots

### 🌐 Application Layouts
<table width="100%">
  <tr>
    <td width="50%">
      <p align="center"><b>🏠 Landing / Home Interface</b></p>
      <img src="https://github.com/hridoy-web/flexura-frontend-fitness-and-gym-management-platform/raw/46b457dfb15c6693abe308a03de5ad874121ced2/Home.png" alt="Flexura Home" width="100%"/>
    </td>
    <td width="50%">
      <p align="center"><b>💪 Explore Training Classes</b></p>
      <img src="https://github.com/hridoy-web/flexura-frontend-fitness-and-gym-management-platform/raw/46b457dfb15c6693abe308a03de5ad874121ced2/Classes-page.png" alt="Flexura Classes" width="100%"/>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <p align="center"><b>💬 Fitness Forum & Community Discussions</b></p>
      <img src="https://github.com/hridoy-web/flexura-frontend-fitness-and-gym-management-platform/raw/46b457dfb15c6693abe308a03de5ad874121ced2/forum-page.png" alt="Flexura Forum" width="100%"/>
    </td>
  </tr>
</table>

### 🛡️ Secure Role-Based Dashboards
<table width="100%">
  <tr>
    <td width="50%">
      <p align="center"><b>👑 Administrative Command Center</b></p>
      <img src="https://github.com/hridoy-web/flexura-frontend-fitness-and-gym-management-platform/raw/46b457dfb15c6693abe308a03de5ad874121ced2/admin-dashboard.png" alt="Admin Dashboard" width="100%"/>
    </td>
    <td width="50%">
      <p align="center"><b>🏋️‍♂️ Trainer Workspace</b></p>
      <img src="https://github.com/hridoy-web/flexura-frontend-fitness-and-gym-management-platform/raw/46b457dfb15c6693abe308a03de5ad874121ced2/trainer-dashboard.png" alt="Trainer Dashboard" width="100%"/>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <p align="center"><b>👥 Users Interactions Track</b></p>
      <img src="https://github.com/hridoy-web/flexura-frontend-fitness-and-gym-management-platform/raw/46b457dfb15c6693abe308a03de5ad874121ced2/users-dashboard.png" alt="User Dashboard" width="100%"/>
    </td>
  </tr>
</table>

---

## 🚀 Key Features

Flexura features a robust architecture segmented into three distinct user roles, ensuring dedicated layouts and restricted access control.

### 👥 1. Member / User Features
* **Interactive Class Booking:** Seamlessly browse available slots, select certified fitness trainers, and book specialized training sessions.
* **Secure Stripe Payment:** Integrated Stripe API for trouble-free subscription management and instant invoice generation.
* **Personalization & Favorites:** Bookmark preferred trainers and save customized workout routines directly to the user dashboard.
* **State-Persistent Authentication:** Safe and structured signup/login flow with advanced user session management.
* **Community Forum Interaction:** Engage in community building by upvoting, downvoting, and commenting on fitness blogs and discussions.

### 🏋️‍♂️ 2. Trainer Features
* **Dynamic Class Management:** Construct, edit, and schedule specialized weekly workout routines and slots.
* **Community Thought Leadership:** Create, publish, and moderate comprehensive educational fitness articles within the forum.
* **Student Attendee Tracking:** Access a dedicated analytical interface to monitor active members enrolled in specific training schedules.

### 🛡️ 3. Admin Features
* **Role-Based Access Management:** Upgrade user permissions, evaluate trainer applications, and assign operational roles safely.
* **Smart Soft-Block System:** Instant access restriction for malicious users without wiping historical transaction or interaction data from the database.
* **Class & Slot Approvals:** Centralized approval workflow for evaluating and launching new gym classes proposed by trainers.
* **Real-time Financial Auditing:** Comprehensive transaction history logs tracking platform revenue, premium signups, and Stripe payment parameters.
* **Forum Moderation:** Maintain platform guidelines by managing and pinning community posts.

---

## 🛠️ Technologies Used

### Frontend Architecture
* **Next.js** — React Framework for server-rendered components and optimized routing.
* **Tailwind CSS** — Utility-first styling framework utilizing modern engine optimizations.
* **DaisyUI** — Semantic and customizable component library built on top of Tailwind.
* **Framer Motion** — Fluid, production-ready animations and interactive UI transitions.

### Backend & Core Infrastructure
* **Node.js & Express.js** — Event-driven backend environment and robust RESTful API layer.
* **MongoDB** — Scalable NoSQL document schema design for optimal structural querying.
* **Better Auth & JWT** — Advanced session handling, cookie management, and jsonwebtoken validation layer.
* **Stripe SDK** — High-security infrastructure for managing payment subscription checkouts.

---

## 💻 Installation & Local Setup

Follow these structured steps to replicate the complete development environment on your local system.

### 1. Client Side Configuration

```bash
# Clone the client repository
git clone https://github.com/hridoy-web/flexura-frontend-fitness-and-gym-management-platform.git

# Install project dependencies
npm install

```
### 2. Frontend Environment Setup

Create a `.env.local` file in the root of your frontend project folder and populate it with your own credentials based on the template below:

```env
# Base Application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Server API Gateway
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

# Better Auth Authentication Configuration
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret_key_here

# Third-Party OAuth Provider (Google Console)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Image Hosting API (e.g., ImgBB)
NEXT_PUBLIC_IMG_UPLOAD_KEY=your_image_upload_api_key_here

# Stripe Payment Gateway Integration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# Database Configuration (If handled via Next.js API Routes/Actions)
MONGODB_URI=your_mongodb_atlas_connection_string_here
DB_NAME=your_database_name_here

# Start the development server
npm run dev

```

### 3. Server Side Configuration

```bash
# Clone the server repository
git clone https://github.com/hridoy-web/Flexura-Server.git

# Install server dependencies
npm install

```

### 4. Server Environment Setup
```
# Server Port Configuration
PORT=5000

# Database Configuration
MONGODB_URI=your_mongodb_atlas_connection_string_here
DB_NAME=your_database_name_here

# JWT Authentication Secret
JWT_SECRET=your_jwt_state_secret_hash_here

# Start the development server
nodemon index.js

```
