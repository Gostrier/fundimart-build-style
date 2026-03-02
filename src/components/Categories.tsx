import { Hammer, Wrench, Zap, Droplets, HardHat, Ruler } from "lucide-react";
import { Link } from "react-router-dom";

const categoryItems = [
  { icon: Hammer, name: "Building Materials", count: "2,450+ items", color: "bg-orange-100 text-orange-600", slug: "building-materials" },
  { icon: Wrench, name: "Power Tools", count: "890+ items", color: "bg-blue-100 text-blue-600", slug: "power-tools" },
  { icon: Ruler, name: "Hand Tools", count: "1,200+ items", color: "bg-green-100 text-green-600", slug: "hand-tools" },
  { icon: Droplets, name: "Plumbing", count: "650+ items", color: "bg-cyan-100 text-cyan-600", slug: "plumbing" },
  { icon: Zap, name: "Electrical", count: "780+ items", color: "bg-yellow-100 text-yellow-600", slug: "electrical" },
  { icon: HardHat, name: "Safety Gear", count: "420+ items", color: "bg-red-100 text-red-600", slug: "safety-gear" },
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

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
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
