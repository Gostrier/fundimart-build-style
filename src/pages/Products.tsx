// src/pages/Products.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products"; // Import products data
import ProductCard from "@/components/ProductCard"; // Import ProductCard component

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;