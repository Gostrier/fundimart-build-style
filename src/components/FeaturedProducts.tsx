import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { Product } from "@/types/product";

const FeaturedProducts = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    // Get default products
    let displayProducts = [...products];

    // Load and merge seller products from localStorage
    try {
      const sellerProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      // Convert seller products to ProductCard format
      const formattedSellerProducts = sellerProducts.map((p: Product) => ({
        id: p.id || p.name.toLowerCase().replace(/\s+/g, '-'),
        image: p.photos[0] || "https://via.placeholder.com/300x300?text=" + encodeURIComponent(p.name),
        name: p.name,
        price: p.price,
        rating: 4.5,
        reviews: 12,
        badge: p.quality ? p.quality : undefined,
        seller: p.sellerName,
      }));
      displayProducts = [...formattedSellerProducts, ...displayProducts];
    } catch (error) {
      console.error("Error loading seller products:", error);
    }

    setAllProducts(displayProducts);
  }, []);

  // Show first 8 products as featured
  const featured = allProducts.slice(0, 8);

  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 md:mb-2">
              Featured Products
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Discover our top-rated construction materials and tools from verified sellers
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
