import { Search, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fundimartLogo from "@/assets/fundimart-logo.jpeg";
import CartSheet from "@/components/CartSheet";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { categoryItems } from "@/data/categories";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm border-b border-border">
          <span className="text-muted-foreground">Enjoy your shopping experience with FundiMart</span>
          <div className="flex items-center gap-4">
            <Link 
              to={user?.role === 'seller' ? "/seller/dashboard" : "/seller/login"} 
              className="text-primary font-semibold hover:underline flex items-center gap-1"
            >
              Hardware Seller Portal
            </Link>
            <div className="w-px h-4 bg-border" />
            <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link>
            <Link to="/track-order" className="text-muted-foreground hover:text-primary transition-colors">Track Order</Link>
            {user && (
              <Link to="/logout" className="text-primary font-medium hover:underline flex items-center gap-1">
                <LogOut className="w-3 h-3" />
                Logout
              </Link>
            )}
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
            {!user ? (
              <Link to="/auth" className="flex flex-col items-center">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
                <span className="text-[10px] md:text-xs font-medium text-foreground">Login</span>
              </Link>
            ) : (
              <Link to={user.role === 'seller' ? '/seller/dashboard' : '/profile'} className="flex flex-col items-center">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
                <span className="text-[10px] md:text-xs font-medium text-foreground">{user.role === 'seller' ? 'Seller' : 'Profile'}</span>
              </Link>
            )}
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
              <Link 
                to={user?.role === 'seller' ? "/seller/dashboard" : "/seller/login"} 
                className="font-bold text-primary py-2 border-b border-border flex items-center gap-2" 
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                Hardware Seller Portal
              </Link>
              {user && (
                <Link to="/logout" className="font-bold text-primary py-2 border-b border-border flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <LogOut className="w-4 h-4" />
                  Logout
                </Link>
              )}
              {categoryItems.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
