// src/components/SiteLogoBadge.tsx
import { Link } from "react-router-dom";
import fundimartLogo from "@/assets/fundimart-logo.jpeg";

const SiteLogoBadge = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
      <Link to="/" className="block group animate-float">
        <img
          src={fundimartLogo}
          alt="FundiMart Logo"
          // Kept large dimensions, removed the white background panel/borders entirely, and added a soft dropped shadow
          className="w-40 h-40 sm:w-48 sm:h-48 object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-2xl"
        />
      </Link>
    </div>
  );
};

export default SiteLogoBadge;