import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Shield, Clock } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-hero-gradient overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent-foreground rounded-full text-sm font-semibold mb-6">
              🏗️ New Season Sale - Up to 30% Off
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Build Your Dreams with
              <span className="text-primary block">Quality Materials</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
              Your one-stop shop for premium construction materials, professional tools, and expert advice. From foundation to finish.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button variant="hero" size="lg" className="group">
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                View Catalog
              </Button>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-6"></div>
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=500&fit=crop"
              alt="Construction worker with tools"
              className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px]"
            />
          </div>
        </div>

        {/* Features bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="flex items-center gap-4 bg-card p-6 rounded-xl shadow-sm border border-border">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <Truck className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Free on orders $500+</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-card p-6 rounded-xl shadow-sm border border-border">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Quality Guarantee</h3>
              <p className="text-sm text-muted-foreground">Certified materials</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-card p-6 rounded-xl shadow-sm border border-border">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <Clock className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Expert assistance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
