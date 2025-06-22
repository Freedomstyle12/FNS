import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      <div className="hero-overlay absolute inset-0" />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 slide-up">
          FreedomStyle
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto slide-up">
          Discover the latest in fashion, luxury watches, and trendy shoes
        </p>
        <Link href="/products">
          <Button 
            size="lg" 
            className="btn-gradient text-white px-8 py-4 text-lg font-semibold scale-in"
          >
            Shop Now
          </Button>
        </Link>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  );
}
