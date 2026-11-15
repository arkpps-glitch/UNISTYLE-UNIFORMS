# UNISTYLE UNIFORMS — Backend Server

A Node.js/Express backend powering the UNISTYLE UNIFORMS e-commerce website.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)

## Quick Start

```bash
# 1. Navigate to the server directory
cd server

# 2. Install dependencies
npm install

# 3. Seed the database with sample products
npm run seed

# 4. Start the server
npm start
```

The server will start at **http://localhost:3000**.

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Main website |
| `http://localhost:3000/admin` | Admin dashboard |
| `http://localhost:3000/api/health` | API health check |

## API Endpoints

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | — | List all products (`?category=corporate`) |
| GET | `/api/products/:id` | — | Get a single product |
| POST | `/api/products` | Admin | Create a product |
| PUT | `/api/products/:id` | Admin | Update a product |
| DELETE | `/api/products/:id` | Admin | Delete a product |

### Quote Requests
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/quotes` | — | Submit a quote request |
| GET | `/api/quotes` | Admin | List all quote requests |
| PUT | `/api/quotes/:id/status` | Admin | Update quote status |

### Contact
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact` | — | Submit contact form |
| GET | `/api/contact` | Admin | List all contact submissions |

### Newsletter
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/newsletter` | — | Subscribe email |
| GET | `/api/newsletter` | Admin | List all subscribers |
| DELETE | `/api/newsletter/:email` | — | Unsubscribe |

### Cart (Session-based)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/cart` | — | Add item to cart |
| GET | `/api/cart` | — | Get cart items |
| PUT | `/api/cart/:itemId` | — | Update item quantity |
| DELETE | `/api/cart/:itemId` | — | Remove item |

### Admin
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/dashboard` | Admin | Dashboard summary |

## Authentication

Admin endpoints require the `X-Admin-Key` header:

```
X-Admin-Key: unistyle-admin-2024
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `ADMIN_KEY` | `unistyle-admin-2024` | Admin API key |
| `NODE_ENV` | — | Set to `development` for verbose errors |

## Project Structure

```
server/
├── server.js            Main entry point
├── package.json         Dependencies & scripts
├── database.js          SQLite setup & initialization
├── README.md            This file
├── routes/
│   ├── products.js      Product CRUD + filtering
│   ├── quotes.js        Quote request handling
│   ├── contact.js       Contact form submissions
│   ├── newsletter.js    Newsletter subscriptions
│   ├── cart.js           Session-based cart
│   └── admin.js          Admin dashboard API
├── middleware/
│   └── auth.js           Admin auth middleware
├── data/
│   ├── seed.js           Seed data (14 products)
│   └── unistyle.db       SQLite database (auto-created)
└── admin/
    └── index.html        Admin dashboard UI
```
