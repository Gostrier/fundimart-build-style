export interface Product {
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
}

export const products: Product[] = [
  // Building Materials
  {
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    name: "Bamburi Nguvu Cement 50kg",
    price: 885,
    rating: 4.8,
    reviews: 324,
    badge: "Best Seller",
    category: "building-materials",
  },
  {
    image: "https://images.unsplash.com/photo-1590074072786-a66914d668f1?w=400&h=400&fit=crop",
    name: "Simba Cement 32.5R 50kg",
    price: 950,
    originalPrice: 1050,
    rating: 4.7,
    reviews: 189,
    badge: "Popular",
    category: "building-materials",
  },
  {
    image: "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?w=400&h=400&fit=crop",
    name: "Deformed Steel Bar D12 (12m)",
    price: 1150,
    originalPrice: 1300,
    rating: 4.9,
    reviews: 142,
    badge: "Hot Deal",
    category: "building-materials",
  },
  {
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=400&h=400&fit=crop",
    name: "High Tensile Steel 16mm (per kg)",
    price: 145,
    rating: 4.6,
    reviews: 98,
    category: "building-materials",
  },
  {
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=400&h=400&fit=crop",
    name: "Cypress Timber 4×2 (per ft)",
    price: 55,
    rating: 4.5,
    reviews: 234,
    category: "building-materials",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    name: "Pine Timber 4×2 (per ft)",
    price: 38,
    rating: 4.4,
    reviews: 178,
    badge: "Budget Pick",
    category: "building-materials",
  },
  {
    image: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=400&h=400&fit=crop",
    name: "Ballast / Coarse Aggregate (per m³)",
    price: 4467,
    rating: 4.8,
    reviews: 156,
    category: "building-materials",
  },

  // Power Tools
  {
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
    name: "Bosch Impact Drill 750W",
    price: 8500,
    originalPrice: 9500,
    rating: 4.8,
    reviews: 210,
    badge: "Best Seller",
    category: "power-tools",
  },
  {
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
    name: "Makita Angle Grinder 115mm",
    price: 5200,
    rating: 4.7,
    reviews: 145,
    category: "power-tools",
  },
  {
    image: "https://images.unsplash.com/photo-1513467535987-db81bc0d0222?w=400&h=400&fit=crop",
    name: "DeWalt Circular Saw 185mm",
    price: 12500,
    originalPrice: 14000,
    rating: 4.9,
    reviews: 98,
    badge: "Hot Deal",
    category: "power-tools",
  },

  // Hand Tools
  {
    image: "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=400&h=400&fit=crop",
    name: "Stanley Claw Hammer 20oz",
    price: 1800,
    rating: 4.6,
    reviews: 312,
    category: "hand-tools",
  },
  {
    image: "https://images.unsplash.com/photo-1581147036324-c47a03a81d48?w=400&h=400&fit=crop",
    name: "Spirit Level 600mm",
    price: 950,
    rating: 4.5,
    reviews: 178,
    category: "hand-tools",
  },
  {
    image: "https://images.unsplash.com/photo-1530124566582-a45a7e3e29bf?w=400&h=400&fit=crop",
    name: "Measuring Tape 8m",
    price: 650,
    rating: 4.7,
    reviews: 256,
    badge: "Popular",
    category: "hand-tools",
  },

  // Plumbing
  {
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=400&fit=crop",
    name: "PVC Pipe 110mm (6m)",
    price: 2730,
    rating: 4.7,
    reviews: 87,
    badge: "New",
    category: "plumbing",
  },
  {
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=400&fit=crop",
    name: "Water Tank 1000L",
    price: 15000,
    originalPrice: 17000,
    rating: 4.8,
    reviews: 134,
    badge: "Hot Deal",
    category: "plumbing",
  },
  {
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=400&fit=crop",
    name: "PPR Pipe 25mm (4m)",
    price: 450,
    rating: 4.5,
    reviews: 67,
    category: "plumbing",
  },

  // Electrical
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    name: "Twin & Earth Cable 2.5mm (100m)",
    price: 8900,
    rating: 4.6,
    reviews: 189,
    category: "electrical",
  },
  {
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop",
    name: "MCB Circuit Breaker 20A",
    price: 650,
    rating: 4.7,
    reviews: 112,
    category: "electrical",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    name: "Double Socket Outlet",
    price: 350,
    rating: 4.4,
    reviews: 234,
    badge: "Popular",
    category: "electrical",
  },

  // Safety Gear
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop",
    name: "Safety Helmet (Hard Hat)",
    price: 850,
    rating: 4.8,
    reviews: 298,
    badge: "Best Seller",
    category: "safety-gear",
  },
  {
    image: "https://images.unsplash.com/photo-1618517048289-f5a30fbbdd6e?w=400&h=400&fit=crop",
    name: "High-Vis Reflective Vest",
    price: 450,
    rating: 4.5,
    reviews: 178,
    category: "safety-gear",
  },
  {
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=400&h=400&fit=crop",
    name: "Safety Boots (Steel Toe)",
    price: 3500,
    originalPrice: 4200,
    rating: 4.9,
    reviews: 156,
    badge: "Hot Deal",
    category: "safety-gear",
  },
];

export const categories = [
  { slug: "building-materials", name: "Building Materials", count: "2,450+ items" },
  { slug: "power-tools", name: "Power Tools", count: "890+ items" },
  { slug: "hand-tools", name: "Hand Tools", count: "1,200+ items" },
  { slug: "plumbing", name: "Plumbing", count: "650+ items" },
  { slug: "electrical", name: "Electrical", count: "780+ items" },
  { slug: "safety-gear", name: "Safety Gear", count: "420+ items" },
];
