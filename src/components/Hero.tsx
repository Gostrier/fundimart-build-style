import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-hero-gradient overflow-hidden">
      <div className="container mx-auto px-4 py-10 md:py-16 lg:py-24">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-accent/20 text-accent-foreground rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6">
              🏗️ New Season Sale - Up to 30% Off
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              Built On Trust,
              <span className="text-primary block">Delivered With Excellence</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
              Your one-stop shop for premium construction materials, professional tools, and expert advice. From foundation to finish.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
              <Link to="/products">
                <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-6"></div>
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=500&fit=crop"
              alt="Construction worker with tools"
              className="relative rounded-3xl shadow-2xl object-cover w-full h-[350px] lg:h-[500px]"
            />
          </div>
        </div>

        {/* Features bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-16">
          <div className="flex items-center gap-3 md:gap-4 bg-card p-4 md:p-6 rounded-xl shadow-sm border border-border">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm md:text-base">Fast Delivery</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Free on orders $500+</p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4 bg-card p-4 md:p-6 rounded-xl shadow-sm border border-border">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm md:text-base">Quality Guarantee</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Certified materials</p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4 bg-card p-4 md:p-6 rounded-xl shadow-sm border border-border">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm md:text-base">24/7 Support</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Expert assistance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
