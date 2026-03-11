// src/components/SiteLogoBadge.tsx
import { Link } from "react-router-dom";
import fundimartLogo from "@/assets/fundimart-logo.jpeg";

const SiteLogoBadge = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-pulse-slow">
      <Link to="/" className="relative block group">
        <div className="absolute -top-2 -left-2 w-12 h-12 bg-primary rounded-full animate-ping-slow"></div>
        <img
          src={fundimartLogo}
          alt="FundiMart Logo"
          className="relative w-24 h-24 sm:w-28 sm:h-28 object-contain p-2 bg-white rounded-full border-4 border-primary shadow-2xl transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className="absolute top-1/2 -left-4 w-16 h-8 bg-primary -translate-y-1/2 flex items-center justify-center text-primary-foreground font-bold text-xs shadow-lg"
          style={{ clipPath: 'polygon(0 0, 100% 0, 80% 50%, 100% 100%, 0 100%)' }}
        >
          NEW
        </div>
      </Link>
    </div>
  );
};

export default SiteLogoBadge;