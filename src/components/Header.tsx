import { Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import fundimartLogo from "@/assets/fundimart-logo.jpeg";
import CartSheet from "@/components/CartSheet";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false); // Close mobile menu after search
      setSearchQuery(""); // Clear search input
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm border-b border-border">
          <span className="text-muted-foreground">Enjoy your shopping experience with FundiMart</span>
          <div className="flex items-center gap-4">
            <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link>
            <Link to="/track-order" className="text-muted-foreground hover:text-primary transition-colors">Track Order</Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={fundimartLogo}
              alt="FundiMart Logo"
              className="h-10 w-auto rounded-lg"
            />
            <span className="text-2xl font-bold text-foreground">
              Fundi<span className="text-primary">Mart</span>
            </span>
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="Search for tools, materials, equipment..."
                className="w-full pl-4 pr-12 py-6 rounded-lg border-2 border-muted focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
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
        <nav className="hidden md:flex items-center gap-6 py-3 overflow-x-auto no-scrollbar">
          <Link to="/category/cement-concrete" className="font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap">Cement & Concrete</Link>
          <Link to="/category/steel-reinforcement" className="font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap">Steel & Reinforcement</Link>
          <Link to="/category/timber-wood" className="font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap">Timber & Wood</Link>
          <Link to="/category/aggregates" className="font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap">Aggregates</Link>
          <Link to="/category/power-tools" className="font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap">Power Tools</Link>
          <Link to="/category/hand-tools" className="font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap">Hand Tools</Link>
          <Link to="/category/plumbing" className="font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap">Plumbing</Link>
          <Link to="/category/electrical" className="font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap">Electrical</Link>
          <Link to="/category/safety-gear" className="font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap">Safety Gear</Link>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5" />
              </Button>
            </form>
            <nav className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
              <Link to="/category/cement-concrete" className="font-medium text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Cement & Concrete</Link>
              <Link to="/category/steel-reinforcement" className="font-medium text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Steel & Reinforcement</Link>
              <Link to="/category/timber-wood" className="font-medium text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Timber & Wood</Link>
              <Link to="/category/aggregates" className="font-medium text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Aggregates</Link>
              <Link to="/category/power-tools" className="font-medium text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Power Tools</Link>
              <Link to="/category/hand-tools" className="font-medium text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Hand Tools</Link>
              <Link to="/category/plumbing" className="font-medium text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Plumbing</Link>
              <Link to="/category/electrical" className="font-medium text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Electrical</Link>
              <Link to="/category/safety-gear" className="font-medium text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Safety Gear</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;