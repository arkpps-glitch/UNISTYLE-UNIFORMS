/**
 * Seed Data — Populates the database with 14 realistic uniform products.
 * Run: node data/seed.js  (or npm run seed)
 */

const path = require('path');

// We need to require database.js from the parent directory
const db = require(path.join(__dirname, '..', 'database'));

const products = [
  // ===== CORPORATE =====
  {
    name: 'Executive Business Suit',
    description: 'Premium tailored two-piece business suit crafted from fine Italian wool blend. Features a modern slim-fit silhouette with notch lapels, two-button closure, and fully lined interior. Perfect for boardrooms and client meetings.',
    category: 'corporate',
    price_min: 120.00,
    price_max: 195.00,
    image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600',
    features: ['Italian wool blend', 'Slim-fit cut', 'Fully lined', 'Custom monogramming available', 'Wrinkle-resistant'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Navy Blue', 'Charcoal Gray', 'Black'],
    in_stock: 1
  },
  {
    name: 'Classic Dress Shirt',
    description: 'Crisp, professional dress shirt made from premium Egyptian cotton with a smooth finish. Features a spread collar, adjustable cuffs, and a tailored fit that transitions seamlessly from desk to dinner.',
    category: 'corporate',
    price_min: 35.00,
    price_max: 55.00,
    image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600',
    features: ['100% Egyptian cotton', 'Spread collar', 'Non-iron finish', 'Adjustable cuffs', 'Tailored fit'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Pink', 'Lavender'],
    in_stock: 1
  },
  {
    name: 'Women\'s Corporate Blazer',
    description: 'Sophisticated women\'s blazer with a refined single-button silhouette. Crafted from stretch-blend fabric for all-day comfort. Features princess seams, flap pockets, and a luxurious satin lining.',
    category: 'corporate',
    price_min: 85.00,
    price_max: 140.00,
    image_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600',
    features: ['Stretch-blend fabric', 'Single-button closure', 'Princess seams', 'Satin lined', 'Machine washable'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    in_stock: 1
  },

  // ===== HEALTHCARE =====
  {
    name: 'Premium Medical Scrub Set',
    description: 'High-performance medical scrub set featuring moisture-wicking, anti-microbial fabric. V-neck top with chest and side pockets. Drawstring waist pants with cargo pockets for utility. Built for 12-hour shifts.',
    category: 'healthcare',
    price_min: 35.00,
    price_max: 60.00,
    image_url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600',
    features: ['Anti-microbial fabric', 'Moisture-wicking', '4-way stretch', 'Multiple pockets', 'Fade-resistant'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Ceil Blue', 'Navy', 'Teal', 'Wine', 'Black', 'Grey'],
    in_stock: 1
  },
  {
    name: 'Professional Lab Coat',
    description: 'Classic white lab coat designed for medical professionals. Made from heavyweight poly-cotton twill with soil-release finish. Features three large patch pockets, side vents, and a consultation-length hem.',
    category: 'healthcare',
    price_min: 40.00,
    price_max: 75.00,
    image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600',
    features: ['Poly-cotton twill', 'Soil-release finish', 'Three patch pockets', 'Knee length', 'Button front'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['White'],
    in_stock: 1
  },

  // ===== HOSPITALITY =====
  {
    name: 'Executive Chef Coat',
    description: 'Double-breasted chef coat with classic styling and modern performance features. Made from breathable poly-cotton blend with stain-resistant coating. Cloth-covered buttons and French cuffs add a professional touch.',
    category: 'hospitality',
    price_min: 30.00,
    price_max: 55.00,
    image_url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600',
    features: ['Double-breasted', 'Stain-resistant', 'Breathable fabric', 'Cloth-covered buttons', 'French cuffs'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['White', 'Black'],
    in_stock: 1
  },
  {
    name: 'Hotel Front Desk Uniform',
    description: 'Elegant front desk uniform set including a fitted vest and matching trousers/skirt. Designed to project warmth and professionalism with subtle gold-tone accents. Available in both men\'s and women\'s cuts.',
    category: 'hospitality',
    price_min: 65.00,
    price_max: 110.00,
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
    features: ['Fitted vest + trousers/skirt', 'Wrinkle-resistant', 'Gold-tone buttons', 'Comfort waistband', 'Custom embroidery option'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Burgundy/Gold', 'Black/Silver', 'Navy/Gold'],
    in_stock: 1
  },

  // ===== EDUCATION =====
  {
    name: 'Classic School Uniform Set',
    description: 'Traditional school uniform bundle with crisp button-down shirt and pleated trousers/skirt. Made from durable, easy-care fabric that holds up to active students. Includes school crest embroidery option.',
    category: 'education',
    price_min: 30.00,
    price_max: 50.00,
    image_url: 'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600',
    features: ['Easy-care fabric', 'Reinforced knees', 'Adjustable waist', 'Machine washable', 'School crest option'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White/Navy', 'White/Gray', 'White/Khaki'],
    in_stock: 1
  },
  {
    name: 'School Sports Polo',
    description: 'Performance school polo for PE classes and sports activities. Moisture-wicking piqué knit with UPF 30+ sun protection. Reinforced collar stays crisp all day. Available with custom school logo embroidery.',
    category: 'education',
    price_min: 18.00,
    price_max: 30.00,
    image_url: 'https://images.unsplash.com/photo-1503341504253-dff4f94032d4?w=600',
    features: ['Moisture-wicking', 'UPF 30+ protection', 'Reinforced collar', 'Side vents', 'Logo-ready'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Navy', 'Red', 'Forest Green'],
    in_stock: 1
  },

  // ===== INDUSTRIAL =====
  {
    name: 'Heavy-Duty Workwear Coverall',
    description: 'Rugged full-body coverall engineered for demanding industrial environments. Made from heavyweight 100% cotton duck with triple-needle stitching. Features bi-swing back for unrestricted movement and action-cut sleeves.',
    category: 'industrial',
    price_min: 55.00,
    price_max: 90.00,
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
    features: ['100% cotton duck', 'Triple-needle stitching', 'Bi-swing back', 'Two-way zipper', 'Multiple tool pockets'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Navy', 'Khaki', 'Charcoal'],
    in_stock: 1
  },
  {
    name: 'Hi-Vis Safety Vest',
    description: 'ANSI/ISEA Class 2 compliant high-visibility safety vest with reflective tape. Lightweight breathable mesh keeps workers cool. Multiple pockets including radio loop and ID holder. Essential for construction and roadwork.',
    category: 'industrial',
    price_min: 12.00,
    price_max: 25.00,
    image_url: 'https://images.unsplash.com/photo-1578939556763-ff72753c9b7b?w=600',
    features: ['ANSI Class 2 compliant', '2" reflective tape', 'Breathable mesh', 'Zipper closure', 'Radio loop & ID pocket'],
    sizes: ['S/M', 'L/XL', 'XXL/3XL'],
    colors: ['Fluorescent Yellow', 'Fluorescent Orange'],
    in_stock: 1
  },

  // ===== CUSTOM =====
  {
    name: 'Custom Branded Polo Shirt',
    description: 'Premium piqué polo shirt ready for your company branding. Made from combed cotton with a relaxed fit that works in the office or at team events. Includes up to 3 embroidery locations for logos and names.',
    category: 'custom',
    price_min: 25.00,
    price_max: 45.00,
    image_url: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600',
    features: ['Combed cotton piqué', '3 embroidery locations', 'Side-seam construction', 'Tagless comfort', 'Bulk pricing available'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['White', 'Black', 'Navy', 'Red', 'Royal Blue', 'Forest Green'],
    in_stock: 1
  },
  {
    name: 'Custom Team T-Shirt',
    description: 'Versatile crew-neck t-shirt ideal for team branding, events, and casual workwear. Soft ring-spun cotton with a modern fit. Available with screen printing or direct-to-garment (DTG) printing for full-color designs.',
    category: 'custom',
    price_min: 15.00,
    price_max: 30.00,
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    features: ['Ring-spun cotton', 'Screen print or DTG', 'Tear-away label', 'Pre-shrunk', 'Min order 12 pieces'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['White', 'Black', 'Navy', 'Heather Gray', 'Red', 'Royal Blue'],
    in_stock: 1
  },
  {
    name: 'Branded Softshell Jacket',
    description: 'Water-resistant softshell jacket perfect for outdoor teams and corporate gifting. Features a 3-layer bonded shell with micro-fleece lining for warmth without bulk. Laser-ready for logo placement on chest and back.',
    category: 'custom',
    price_min: 55.00,
    price_max: 95.00,
    image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    features: ['3-layer bonded shell', 'Water-resistant', 'Micro-fleece lined', 'Zippered pockets', 'Laser-cut logo ready'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Black', 'Navy', 'Charcoal'],
    in_stock: 1
  }
];

/**
 * Seed the database
 */
function seed() {
  // Check if products already exist
  const count = db.prepare('SELECT COUNT(*) as count FROM products').get().count;

  if (count > 0) {
    console.log(`[Seed] Database already has ${count} products. Clearing and re-seeding...`);
    db.prepare('DELETE FROM products').run();
  }

  const stmt = db.prepare(`
    INSERT INTO products (name, description, category, price_min, price_max, image_url, features, sizes, colors, in_stock)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertAll = db.transaction((items) => {
    for (const p of items) {
      stmt.run(
        p.name,
        p.description,
        p.category,
        p.price_min,
        p.price_max,
        p.image_url,
        JSON.stringify(p.features),
        JSON.stringify(p.sizes),
        JSON.stringify(p.colors),
        p.in_stock
      );
    }
  });

  insertAll(products);

  console.log(`[Seed] Successfully inserted ${products.length} products.`);

  // Print summary
  const categories = db.prepare('SELECT category, COUNT(*) as count FROM products GROUP BY category').all();
  console.log('\n[Seed] Products by category:');
  categories.forEach(c => console.log(`  - ${c.category}: ${c.count}`));
}

seed();
console.log('\n[Seed] Done!');
