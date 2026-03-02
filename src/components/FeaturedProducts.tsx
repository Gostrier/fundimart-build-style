import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";

const FeaturedProducts = () => {
  // Show first 8 products as featured
  const featured = products.slice(0, 8);

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
          {featured.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
