import { Link } from "wouter";
import { Shirt, Clock, Footprints } from "lucide-react";

const categories = [
  {
    id: "clothes",
    title: "Clothes",
    subtitle: "Latest Fashion Trends",
    icon: Shirt,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    href: "/products/clothes",
  },
  {
    id: "watches",
    title: "Watches",
    subtitle: "Luxury Timepieces",
    icon: Clock,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    href: "/products/watches",
  },
  {
    id: "shoes",
    title: "Shoes",
    subtitle: "Step in Style",
    icon: Footprints,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    href: "/products/shoes",
  },
];

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 text-lg">Explore our premium collection</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.id} href={category.href}>
                <div className="category-card relative h-96 rounded-xl overflow-hidden cursor-pointer group">
                  <img 
                    src={category.image} 
                    alt={`${category.title} Collection`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="category-overlay absolute inset-0 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-600/80 group-hover:to-blue-800/90">
                    <div className="text-white text-center">
                      <Icon className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                      <p className="text-sm opacity-90">{category.subtitle}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
