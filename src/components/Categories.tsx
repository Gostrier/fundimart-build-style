import { Hammer, Zap, Droplets, HardHat, Ruler, Home, Layers, Box } from "lucide-react";
import { Link } from "react-router-dom";

const categoryItems = [
  { icon: Droplets, name: "Cement", count: "450+ items", color: "bg-orange-100 text-orange-600", slug: "cement" },
  { icon: Ruler, name: "Steel", count: "320+ items", color: "bg-slate-100 text-slate-600", slug: "steel" },
  { icon: Hammer, name: "Timber", count: "600+ items", color: "bg-amber-100 text-amber-600", slug: "timber" },
  { icon: Box, name: "Sand and Ballast", count: "250+ items", color: "bg-yellow-100 text-yellow-600", slug: "sand-and-ballast" },
  { icon: Home, name: "Roofing Materials", count: "150+ items", color: "bg-blue-100 text-blue-600", slug: "roofing-materials" },
  { icon: Droplets, name: "Plumbing Materials", count: "650+ items", color: "bg-cyan-100 text-cyan-600", slug: "plumbing-materials" },
  { icon: Zap, name: "Electrical Materials", count: "780+ items", color: "bg-indigo-100 text-indigo-600", slug: "electrical-materials" },
  { icon: Layers, name: "Tiles and Finishing Materials", count: "500+ items", color: "bg-emerald-100 text-emerald-600", slug: "tiles-and-finishing-materials" },
];

const Categories = () => {
  return (
    <section className="py-10 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Shop by Category
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Browse our extensive collection of construction materials and tools organized by category
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
          {categoryItems.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.slug}`}
              className="group bg-card rounded-xl md:rounded-2xl p-3 md:p-6 border border-border hover:border-primary hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className={`w-10 h-10 md:w-16 md:h-16 mx-auto rounded-xl md:rounded-2xl ${category.color} flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="font-medium md:font-semibold text-foreground mb-0.5 md:mb-1 group-hover:text-primary transition-colors text-xs md:text-base">
                {category.name}
              </h3>
              <p className="text-[10px] md:text-sm text-muted-foreground hidden sm:block">{category.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
