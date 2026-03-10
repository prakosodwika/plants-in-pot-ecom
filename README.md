# Plants in Pot | Premium Indoor Plants

A modern, feature-rich E-commerce application for premium indoor plants. This project features a curated botanical collection, plant care guides, and a robust admin dashboard for managing inventory and orders.

## 🌿 Project Overview

**Plants in Pot** is designed to transform living spaces into sanctuaries. It provides a seamless shopping experience for customers and a comprehensive management system for administrators.

## 🚀 Features

### **Customer Storefront**
- **Curated Collections**: Browse through "New Arrivals", "Best Sellers", and "Rare Plants".
- **Product Details**: Comprehensive information on each plant, including care requirements.
- **Plant Care Guides**: Expert advice to help your plants thrive.
- **Wishlist & Cart**: Save your favorites and manage your shopping list easily.
- **Seamless Checkout**: A step-by-step process for a smooth purchasing experience.
- **User Profiles**: Manage your personal information and track your orders.

### **Admin Dashboard**
- **Dashboard Overview**: Get a bird's-eye view of your business performance.
- **Product Management**: Easily add, edit, and manage your plant inventory.
- **Order Tracking**: Keep tabs on all customer orders from placement to delivery.
- **Customer Management**: View and manage customer accounts.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com) & [Base UI](https://base-ui.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski)
- **Typography**: [Manrope](https://fonts.google.com/specimen/Manrope) & [Material Symbols](https://fonts.google.com/icons)

## 📁 Project Structure

```text
src/
├── app/
│   ├── (public)/      # Customer-facing routes (Shop, Product, Care Guides)
│   │   └── (private)/ # Authenticated customer routes (Cart, Checkout, Profile)
│   ├── admin/         # Admin dashboard and management routes
│   └── login/         # Authentication page
├── components/
│   ├── profile/       # User profile components
│   ├── shared/        # Shared UI components (Header, Footer, Product cards)
│   └── ui/            # Shadcn UI base components
├── lib/
│   ├── data.ts        # Mock data for products, categories, etc.
│   ├── store.ts       # Zustand state management stores
│   └── utils.ts       # Utility functions
└── public/            # Static assets
```

## 🎨 Design

The project includes design mockups located in the `/design` folder, featuring the visual direction for both the customer and admin interfaces.

## 🏁 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm, yarn, pnpm, or bun

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Development Server

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the results.

## 📄 License

This project is private and for internal use.
