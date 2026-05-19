# AURA Beauty — MERN E-Commerce Platform

A stunning, modern full-stack cosmetics E-Commerce platform built using the **MERN Stack** (MongoDB, Express, React, Node.js) featuring secure **JWT Authentication**, custom product catalog filtering, interactive cart state synchronization, and checkout order processing.

---

## 🌸 Key Features

* **User Authentication:** Secure user registration, password hashing (bcryptjs), and JWT-based session protection.
* **Product Catalog:** Interactive browsable products grid, full-text search, and quick filtering by categories (Skincare, Makeup, Haircare).
* **Product Detail Views:** Dynamic views with stock status alerts, ratings summaries, descriptions, and custom quantity counters.
* **Shopping Bag (Cart):** Synchronized state cart with localStorage persistence. Adjust quantities, calculate taxes (10%), apply free-shipping thresholds ($50+), and remove items.
* **Checkout System:** Billing address forms, secure payment routing simulator, and instant order placement.
* **Order History:** Full record of previous purchases showing order ID, purchase dates, prices breakdown, payment statuses, and delivery markers.
* **Auto-Seeding:** Automatically seeds the database with 6 premium sample cosmetics items on server start if empty!
* **Aura Aesthetics:** Responsive layout styled using **Tailwind CSS v4** featuring beautiful gradients, hover micro-animations, glassmorphism wrappers, and clean layouts.

---

## 🛠️ Technology Stack

### Backend Architecture
* **Node.js & Express.js:** Fast and modular REST APIs server.
* **MongoDB & Mongoose:** Clean schemas (User, Product, Order) and database modeling.
* **JWT (JsonWebToken):** Secure authorization headers (`Bearer <token>`).
* **BcryptJS:** Secure password hashing.

### Frontend Client
* **React.js (Vite):** Blazing fast reactive views render.
* **Tailwind CSS v4:** Modern styling via `@tailwindcss/vite` plugin.
* **React Router v6:** Smooth SPA routes navigation.
* **Axios:** Async server-client REST communications.
* **Lucide React:** High-quality premium icons.

---

## 📁 Folder Structure

```
c:/Users/HP/OneDrive - University of Kelaniya/Desktop/Beauty E-Commerce Platform
├── backend/
│   ├── config/          # Database connections config (db.js)
│   ├── controllers/     # Route logic handlers (user, product, order)
│   ├── middleware/      # Protected routes validators (authMiddleware.js)
│   ├── models/          # Mongoose database models (User, Product, Order)
│   ├── routes/          # REST route endpoints (user, product, order routes)
│   ├── env.example      # Sample configurations templates
│   └── server.js        # Server initializations and auto-seeding
├── frontend/
│   ├── public/          # Main index.html and static brand assets
│   ├── src/
│   │   ├── components/  # Responsive layouts (Navbar, Footer, ProductCard)
│   │   ├── context/     # Global state context provider (AppContext.jsx)
│   │   ├── pages/       # SPA views (Home, Products, Cart, Checkout, Login...)
│   │   ├── App.jsx      # Global Router and Context wrappers
│   │   ├── index.css    # Tailwind CSS imports
│   │   └── main.jsx     # App injection point
└── README.md            # You are here!
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) installed on your machine.
* A running [MongoDB](https://www.mongodb.com/) instance (Local or Atlas cloud).

### 1. Setup Backend
Navigate to the `/backend` folder, install packages, and create your environment variables:
```bash
cd backend
npm install
copy env.example .env
```
Update the `.env` file with your configuration:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/beauty_db
JWT_SECRET=your_jwt_secret_key_here
```
Start the development server (runs auto-seeding on start):
```bash
npm run dev
```

### 2. Setup Frontend
Navigate to the `/frontend` folder, install packages, and start Vite development client:
```bash
cd ../frontend
npm install
npm run dev
```

Open your browser at `http://localhost:5173` to explore AURA Beauty!

---

## 🔒 API Endpoints References

### User / Auth APIs
* `POST /api/users` — Register new user
* `POST /api/users/login` — Login user & return token
* `GET /api/users/profile` — Get logged in user details (Protected)

### Products APIs
* `GET /api/products` — Fetch all products (supports search: `?keyword=...` or category: `?category=...`)
* `GET /api/products/:id` — Fetch single product detail
* `POST /api/products` — Create new product (Protected/Admin)

### Orders APIs
* `POST /api/orders` — Place new checkout order (Protected)
* `GET /api/orders/myorders` — Fetch logged in user orders (Protected)
* `GET /api/orders/:id` — Fetch single order by ID (Protected)
