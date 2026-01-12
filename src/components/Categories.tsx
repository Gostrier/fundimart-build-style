import { Hammer, Wrench, Zap, Droplets, HardHat, Ruler } from "lucide-react";

const categories = [
  {
    icon: Hammer,
    name: "Building Materials",
    count: "2,450+ items",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Wrench,
    name: "Power Tools",
    count: "890+ items",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Ruler,
    name: "Hand Tools",
    count: "1,200+ items",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Droplets,
    name: "Plumbing",
    count: "650+ items",
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    icon: Zap,
    name: "Electrical",
    count: "780+ items",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: HardHat,
    name: "Safety Gear",
    count: "420+ items",
    color: "bg-red-100 text-red-600",
  },
];

const Categories = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our extensive collection of construction materials and tools organized by category
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <a
              key={index}
              href="#"
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className={`w-16 h-16 mx-auto rounded-2xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">{category.count}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
