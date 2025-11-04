# ezidcode Multivendor Marketplace - MVP Todo List

## Project Overview
Web demo/prototype UI untuk platform hybrid commerce yang menggabungkan Multivendor Marketplace dan Sistem POS.

## Core Files to Create (8 files max)

### 1. Main Pages (4 files)
- [x] `src/pages/Index.tsx` - Homepage marketplace (product grid, categories, search)
- [ ] `src/pages/ProductDetail.tsx` - Detail produk dengan review dan add to cart
- [ ] `src/pages/Cart.tsx` - Shopping cart dan checkout
- [ ] `src/pages/Dashboard.tsx` - Multi-role dashboard (Admin/Vendor/Buyer)

### 2. Dashboard Components (4 files)
- [ ] `src/components/dashboard/AdminDashboard.tsx` - Admin control panel
- [ ] `src/components/dashboard/VendorDashboard.tsx` - Vendor management
- [ ] `src/components/dashboard/POSSystem.tsx` - Point of Sale interface
- [ ] `src/components/dashboard/PPOBSystem.tsx` - PPOB interface

## Features to Implement

### Marketplace Features
- Product listing dengan filter dan search
- Product detail dengan rating/review
- Shopping cart
- Checkout dengan payment gateway options
- User authentication (mock)

### Dashboard Features
- Admin: Vendor management, commission settings, reports
- Vendor: Store management, product upload, order management, withdrawal
- Buyer: Profile, order history, wallet
- POS: Kasir, stock management, reports
- PPOB: Pulsa, paket data, tagihan

### UI/UX Requirements
- Modern, clean, professional design
- Responsive (mobile-friendly)
- Inspired by Shopee layout
- Mock data untuk semua fitur

## Technical Stack
- React + TypeScript
- Shadcn-UI components
- Tailwind CSS
- React Router for navigation
- Mock data (no real backend)
