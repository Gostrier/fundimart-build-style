import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const products = [
  // Cement
  {
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    name: "Bamburi Nguvu Cement 50kg",
    price: 885,
    rating: 4.8,
    reviews: 324,
    badge: "Best Seller",
  },
  {
    image: "https://images.unsplash.com/photo-1590074072786-a66914d668f1?w=400&h=400&fit=crop",
    name: "Simba Cement 32.5R 50kg",
    price: 950,
    originalPrice: 1050,
    rating: 4.7,
    reviews: 189,
    badge: "Popular",
  },
  // Steel
  {
    image: "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?w=400&h=400&fit=crop",
    name: "Deformed Steel Bar D12 (12m)",
    price: 1150,
    originalPrice: 1300,
    rating: 4.9,
    reviews: 142,
    badge: "Hot Deal",
  },
  {
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=400&h=400&fit=crop",
    name: "High Tensile Steel 16mm (per kg)",
    price: 145,
    rating: 4.6,
    reviews: 98,
  },
  // Timber
  {
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=400&h=400&fit=crop",
    name: "Cypress Timber 4×2 (per ft)",
    price: 55,
    rating: 4.5,
    reviews: 234,
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    name: "Pine Timber 4×2 (per ft)",
    price: 38,
    rating: 4.4,
    reviews: 178,
    badge: "Budget Pick",
  },
  // Plumbing
  {
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=400&fit=crop",
    name: "PVC Pipe 110mm (6m)",
    price: 2730,
    rating: 4.7,
    reviews: 87,
    badge: "New",
  },
  // Aggregates
  {
    image: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=400&h=400&fit=crop",
    name: "Ballast / Coarse Aggregate (per m³)",
    price: 4467,
    rating: 4.8,
    reviews: 156,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 md:mb-2">
              Featured Products
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Discover our top-rated construction materials and tools
            </p>
          </div>
          <Button variant="outline" className="group w-full sm:w-auto">
            View All Products
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
