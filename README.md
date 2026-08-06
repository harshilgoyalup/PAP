# BrandHub - Premium Multi-Vendor Digital Marketplace

BrandHub is an enterprise-grade, modern multi-vendor marketplace platform where top global brands (Apple, Nike, Adidas, Zara, Sony, Sephora, etc.) operate verified flagship storefronts, showcase products, and manage inventory in one centralized platform.

Built with high visual polish inspired by **Apple**, **Shopify**, **Stripe**, **Nike**, and **Airbnb**.

---

## ✨ Key Features

- 🏢 **Verified Flagship Storefronts**: Dedicated brand pages with official banners, location tags, curated collections, ratings, and customer reviews.
- 🔍 **Advanced Search & Filtering**: Multi-faceted product catalog filtering by brand, category, price range slider, rating, availability, and instant sorting.
- ⚡ **Side-by-Side Specs Matrix**: Compare prices, manufacturer warranty, stock levels, and technical specifications across up to 4 items simultaneously.
- 🤖 **AI Shopping Suite**: Conversational shopping assistant for natural language recommendations and simulated visual image search scanning.
- 📊 **Brand Seller Dashboard**: Comprehensive merchant analytics dashboard featuring revenue visualizers, active listings, order tracking, and product listing creation.
- 👤 **Customer Portal & Wishlist**: Account portal with live order delivery tracking, saved wishlist items, and loyalty reward points ledger.
- 🏷️ **Flash Sales & Deals**: Festival superdrop section with countdown timers, claimable coupon codes, and limited-time offer badges.
- 🎨 **Ultra-Modern Design System**: Glassmorphism cards, dynamic floating animations, dark/light theme switching, responsive layouts, and rich micro-interactions.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Glassmorphism, CSS Custom Variables
- **Icons**: Lucide React
- **Tooling & Build**: npm, Vite, oxlint

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/brandhub.git
   cd brandhub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📁 Repository Structure

```
brandhub/
├── public/              # Static assets
├── src/
│   ├── components/      # UI Components (Navbar, Hero, Catalog, Dashboards, Modals)
│   ├── mockData.ts      # Catalog mock data (Brands, Products, Categories)
│   ├── types.ts         # TypeScript interfaces & types
│   ├── App.tsx          # Main application & router
│   ├── index.css        # Global CSS design system & glassmorphism
│   └── main.tsx         # App entry point
├── index.html           # HTML template
├── package.json         # Project dependencies & scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite build configuration
```

---

## 🐙 How to Push to GitHub

Run the following commands in your terminal to push this project to your GitHub account:

```bash
# 1. Add all files and make initial commit
git add .
git commit -m "Initial commit: BrandHub Multi-Vendor Marketplace"

# 2. Create a new repository on GitHub (e.g. named brandhub)
# 3. Link your local repository to GitHub
git remote add origin https://github.com/YOUR_USERNAME/brandhub.git

# 4. Set main branch and push code
git branch -M main
git push -u origin main
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
