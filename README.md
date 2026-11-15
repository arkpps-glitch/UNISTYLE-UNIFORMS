# UNISTYLE UNIFORMS — Premium E-Commerce Website & Backend

A luxury, modern, award-winning uniform & corporate apparel e-commerce web platform for **UNISTYLE UNIFORMS**. Designed with a deep navy & rich gold luxury aesthetic, glassmorphism, responsive grid layouts, and interactive client-side and full-stack backend capabilities.

---

## ✨ Features & Highlights

### 🎨 Visual & UI/UX Design
- **Luxury Color Palette**: Deep Navy (`#0a1628`), Rich Gold (`#c9a84c` to `#dfc577`), Soft White, and Charcoal.
- **Typography System**: Google Fonts pairing — *Playfair Display* for editorial headings and *Inter* for clean, modern readability.
- **Glassmorphism & Micro-interactions**: Frosted backdrop blur, border shimmer, button hover glows, and smooth elevation shadows.
- **Parallax Hero Section**: Layered depth with Ken Burns imagery, floating geometric shapes, sparkle particles, text reveals, and an animated stats counter.
- **Brand Trust Ticker**: Continuous marquee strip highlighting key credentials and certifications.
- **Custom Cursor & Reading Progress**: Desktop glowing cursor ring that expands over interactive elements, plus an ambient top gold scroll-progress bar.
- **Fully Responsive**: Crafted for mobile phones (<480px), phablets (580px+), tablets (768px+), laptops (1024px+), and wide 4K screens (1280px+).

### 🛍️ E-Commerce & Interactive Capabilities
- **Product Catalog with Category Filters**: Filter seamlessly between *All*, *Corporate*, *Healthcare*, *Hospitality*, *Education*, *Industrial*, and *Custom*.
- **Product Quick-View Modal**: Instant preview of fabric details, specifications, pricing, and sizing without leaving the page.
- **Slide-In Quote Cart**:
  - Live quantity adjustment (`+` / `−`) and instant removal.
  - Estimated total calculation.
  - Automatic `localStorage` persistence across page reloads.
  - One-click **"Request Quote"** integration that automatically compiles the selected items into the inquiry form.
- **Client Testimonial Slider**: Auto-playing review carousel with star ratings, quotes, and navigation dots.
- **Interactive Portfolio Lightbox**: Full-screen image preview with previous/next keyboard and click navigation.
- **Smooth FAQ Accordion**: Expandable answers with animated rotating plus/cross icons.
- **Real-Time Form Validation**: Inline error messages, email validation, and accessible feedback for contact and quote submissions.
- **Floating Controls**: Smooth **Back-to-Top** button and a direct **WhatsApp Chat** floating button with pulsing wave effect.

---

## 🚀 Running the Project

### Option A: Open Directly (Static Mode)
Double-click `index.html` or open it with any web server (VS Code Live Server, Python, etc.):
```sh
# Using Python (if installed)
python -m http.server 8080
```
Open `http://localhost:8080` or `file:///.../index.html`. All interactive features (cart, filters, quick view, lightbox, validation, toasts) work out of the box with client-side storage.

### Option B: Run Full-Stack with Node.js Backend
The project includes a ready-to-run Express + SQLite backend in the `server/` directory:

```bash
cd server
npm install
npm run seed     # Populates database with 14+ uniform products
npm start        # Starts server on http://localhost:3000
```

- **Website**: `http://localhost:3000`
- **Admin Dashboard**: `http://localhost:3000/admin` (Protected with API Key: `unistyle-admin-2024`)
- **REST API Endpoints**:
  - `GET /api/products` — List products by category
  - `POST /api/quotes` — Submit quote requests with cart items
  - `POST /api/contact` — General inquiries
  - `POST /api/newsletter` — Email subscriptions
  - `GET/POST /api/cart` — Server-side cart sessions

---

## 📁 Project Architecture

```
unistyle-uniforms-website/
├── index.html               # Main website HTML5 structure
├── style.css                # Master luxury stylesheet (Design tokens, Grid, Animations)
├── script.js                # Core interactivity (Cart, Modals, Sliders, API sync)
├── icon.svg                 # Brand vector icon
├── manifest.webmanifest     # PWA manifest
├── sw.js                    # Service worker for offline caching
├── Assets/
│   └── images/
│       └── unistyle_logo.png # High-res official brand logo
└── server/
    ├── server.js            # Express server entry point
    ├── package.json         # Backend dependencies
    ├── database.js          # SQLite setup & schema
    ├── routes/              # Modular REST routes
    ├── middleware/          # Admin authentication
    ├── data/
    │   ├── seed.js          # Realistic uniform catalog data
    │   └── unistyle.db      # SQLite database file
    └── admin/
        └── index.html       # Full web admin management portal
```

---

© UNISTYLE UNIFORMS. All Rights Reserved.
