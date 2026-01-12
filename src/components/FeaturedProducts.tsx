import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const products = [
  {
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
    name: "Professional Cordless Drill Set",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 324,
    badge: "Best Seller",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    name: "Premium Portland Cement 50kg",
    price: 12.99,
    rating: 4.6,
    reviews: 156,
  },
  {
    image: "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=400&h=400&fit=crop",
    name: "Industrial Safety Helmet",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.9,
    reviews: 89,
    badge: "20% OFF",
  },
  {
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=400&fit=crop",
    name: "Heavy Duty Tool Box Set",
    price: 79.99,
    rating: 4.7,
    reviews: 212,
  },
  {
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
    name: "Circular Saw 7-1/4 Inch",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviews: 178,
    badge: "Hot Deal",
  },
  {
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop",
    name: "Measuring Tape Set (3-Pack)",
    price: 24.99,
    rating: 4.4,
    reviews: 445,
  },
  {
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=400&fit=crop",
    name: "Professional Paint Brushes Set",
    price: 39.99,
    rating: 4.6,
    reviews: 98,
  },
  {
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    name: "Steel Reinforcement Bars (Bundle)",
    price: 89.99,
    rating: 4.8,
    reviews: 67,
    badge: "New",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Discover our top-rated construction materials and tools
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 group">
            View All Products
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
