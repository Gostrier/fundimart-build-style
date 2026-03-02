import { Search, Menu, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import fundimartLogo from "@/assets/fundimart-logo.jpeg";
import CartSheet from "@/components/CartSheet";

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
              src={fundimartLogo} 
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
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="icon" className="hidden md:flex" title="Admin Dashboard">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <CartSheet />
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
          <Link to="/admin/dashboard" className="font-bold text-primary bg-primary/10 px-3 py-1 rounded hover:bg-primary/20 transition-colors">🔧 ADMIN</Link>
          <Link to="/category/building-materials" className="font-medium text-foreground hover:text-primary transition-colors">Building Materials</Link>
          <Link to="/category/power-tools" className="font-medium text-foreground hover:text-primary transition-colors">Power Tools</Link>
          <Link to="/category/hand-tools" className="font-medium text-foreground hover:text-primary transition-colors">Hand Tools</Link>
          <Link to="/category/plumbing" className="font-medium text-foreground hover:text-primary transition-colors">Plumbing</Link>
          <Link to="/category/electrical" className="font-medium text-foreground hover:text-primary transition-colors">Electrical</Link>
          <Link to="/category/safety-gear" className="font-medium text-foreground hover:text-primary transition-colors">Safety Gear</Link>
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
              <Link to="/admin/dashboard" className="font-medium text-primary transition-colors py-2 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Admin Dashboard
              </Link>
              <Link to="/category/building-materials" className="font-medium text-foreground hover:text-primary transition-colors py-2">Building Materials</Link>
              <Link to="/category/power-tools" className="font-medium text-foreground hover:text-primary transition-colors py-2">Power Tools</Link>
              <Link to="/category/hand-tools" className="font-medium text-foreground hover:text-primary transition-colors py-2">Hand Tools</Link>
              <Link to="/category/plumbing" className="font-medium text-foreground hover:text-primary transition-colors py-2">Plumbing</Link>
              <Link to="/category/electrical" className="font-medium text-foreground hover:text-primary transition-colors py-2">Electrical</Link>
              <Link to="/category/safety-gear" className="font-medium text-foreground hover:text-primary transition-colors py-2">Safety Gear</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
