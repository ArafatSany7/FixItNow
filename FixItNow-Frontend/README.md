<div align="center">
  
  # 🛠️ FixItNow
  
  **A Modern Home Maintenance & Repair Platform**
  
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="Shadcn UI" />
  </p>
</div>

<br />

## 🌟 Overview

**FixItNow** is a comprehensive, full-stack home maintenance platform that connects homeowners with certified repair technicians. This repository contains the **Frontend** application, built with modern web technologies to ensure a fast, responsive, and beautifully animated user experience.

The platform provides dedicated, specialized portals for **Customers**, **Technicians**, and **Administrators**—each tailored to provide exactly the tools they need.

---

## ✨ Key Features

### 👤 Customer Portal
- **Service Browsing:** Browse a wide variety of maintenance services by category.
- **Easy Booking:** Select dates, time slots, and preferred technicians.
- **Real-Time Tracking:** View the status of ongoing jobs (Requested, Accepted, In Progress, Completed).
- **Secure Payments:** Integrated payment flow for completed or accepted jobs.
- **Reviews & Ratings:** Leave feedback for technicians after a job is successfully completed.

### 🧑‍🔧 Technician Portal
- **Profile Management:** Set up specialized skills, services offered, and an hourly/fixed rate.
- **Availability Scheduler:** Easily select available days and time slots using a mobile-optimized weekly calendar grid.
- **Job Management:** Accept, decline, and update the status of incoming service requests.
- **Booking History:** Automatically archive completed, declined, and canceled jobs.

### 👑 Admin Dashboard
- **Platform Analytics:** Overview of platform health, total revenue, and active bookings.
- **User Management:** View, suspend, or manage customers and technicians.
- **Category Control:** Create and modify available service categories.

---

## 💻 Tech Stack

This frontend is powered by a robust, modern ecosystem:

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) / Radix UI
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **State & HTTP:** React hooks, `js-cookie`, standard Fetch API
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/fixitnow-frontend.git
cd fixitnow-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` or `.env.local` file in the root directory and add the following variable pointing to your backend API:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
*(Note: If no URL is provided, it will gracefully fallback to the production API)*

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📱 Mobile-First Design

FixItNow is designed with a strict **Mobile-First** approach. Every dashboard, booking card, and data table dynamically adapts to smaller screens:
- **Card-based layouts** automatically replace complex tables on mobile devices.
- **Responsive Navigation** featuring smooth slide-out hamburger menus.
- **Touch-friendly** inputs, grids, and touch targets across all forms.

---
