import { Search, ShoppingCart, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import jengamartLogo from "@/assets/jengamart-logo.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm border-b border-border">
          <span className="text-muted-foreground">Free delivery on orders over $500</span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Track Order</a>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img 
              src={jengamartLogo} 
              alt="FundiMart Logo" 
              className="h-10 w-auto rounded-lg"
            />
            <span className="text-2xl font-bold text-foreground">
              Fundi<span className="text-primary">Mart</span>
            </span>
          </a>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for tools, materials, equipment..."
                className="w-full pl-4 pr-12 py-6 rounded-lg border-2 border-muted focus:border-primary"
              />
              <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/auth">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation - desktop */}
        <nav className="hidden md:flex items-center gap-8 py-3">
          <a href="#" className="font-medium text-foreground hover:text-primary transition-colors">Building Materials</a>
          <a href="#" className="font-medium text-foreground hover:text-primary transition-colors">Power Tools</a>
          <a href="#" className="font-medium text-foreground hover:text-primary transition-colors">Hand Tools</a>
          <a href="#" className="font-medium text-foreground hover:text-primary transition-colors">Plumbing</a>
          <a href="#" className="font-medium text-foreground hover:text-primary transition-colors">Electrical</a>
          <a href="#" className="font-medium text-foreground hover:text-primary transition-colors">Safety Gear</a>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-12"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            <nav className="flex flex-col gap-3">
              <a href="#" className="font-medium text-foreground hover:text-primary transition-colors py-2">Building Materials</a>
              <a href="#" className="font-medium text-foreground hover:text-primary transition-colors py-2">Power Tools</a>
              <a href="#" className="font-medium text-foreground hover:text-primary transition-colors py-2">Hand Tools</a>
              <a href="#" className="font-medium text-foreground hover:text-primary transition-colors py-2">Plumbing</a>
              <a href="#" className="font-medium text-foreground hover:text-primary transition-colors py-2">Electrical</a>
              <a href="#" className="font-medium text-foreground hover:text-primary transition-colors py-2">Safety Gear</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
