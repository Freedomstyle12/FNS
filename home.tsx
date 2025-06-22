import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Categories from "@/components/categories";
import FeaturedProducts from "@/components/featured-products";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";

export default function Home() {
  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animation').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <div className="scroll-animation">
          <Categories />
        </div>
        <div className="scroll-animation">
          <FeaturedProducts />
        </div>
        
        {/* About Section */}
        <section className="py-20 bg-white scroll-animation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Modern Lifestyle Fashion" 
                  className="rounded-xl shadow-lg w-full" 
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">About FreedomStyle</h2>
                <p className="text-gray-600 text-lg mb-6">
                  We're passionate about bringing you the latest in fashion, luxury timepieces, and stylish footwear. 
                  Our curated collection represents the perfect blend of contemporary design and timeless elegance.
                </p>
                <p className="text-gray-600 text-lg mb-8">
                  From casual wear to formal attire, luxury watches to trendy sneakers, we've got everything you need 
                  to express your unique style and personality.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="gradient-bg text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="fas fa-shipping-fast text-xl"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Fast Shipping</h4>
                    <p className="text-gray-600 text-sm">Free delivery on orders over PKR 5,000</p>
                  </div>
                  <div className="text-center">
                    <div className="gradient-bg text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="fas fa-medal text-xl"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Quality Assured</h4>
                    <p className="text-gray-600 text-sm">100% authentic products guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="scroll-animation">
          <Newsletter />
        </div>
      </main>
      <Footer />
    </div>
  );
}
