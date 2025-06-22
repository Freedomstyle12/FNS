import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/cart", {
        productId: parseInt(id!),
        quantity: 1,
      });
    },
    onSuccess: () => {
      toast({
        title: "Added to cart",
        description: `${product?.name} has been added to your cart.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Skeleton className="h-8 w-32 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="w-full h-96 rounded-lg" />
              <div className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-12 w-1/2" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
              <Link href="/products">
                <Button>Back to Products</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Link href="/products">
            <Button variant="ghost" className="mb-8 p-0 h-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover rounded-lg shadow-lg"
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-blue-600">
                  Featured
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive" className="absolute top-4 right-4">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-5 w-5 fill-current text-yellow-400" 
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">(4.8/5 - 124 reviews)</span>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-6">
                  PKR {parseFloat(product.price).toLocaleString()}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700 font-medium">Category:</span>
                    <Badge variant="outline" className="capitalize">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700 font-medium">Availability:</span>
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={() => addToCartMutation.mutate()}
                  disabled={!product.inStock || addToCartMutation.isPending}
                  className="w-full mt-8 btn-gradient"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {addToCartMutation.isPending 
                    ? "Adding to Cart..." 
                    : product.inStock 
                      ? "Add to Cart" 
                      : "Out of Stock"
                  }
                </Button>
              </div>

              {/* Product Features */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Premium quality materials</li>
                  <li>• Carefully crafted design</li>
                  <li>• Comfortable fit and feel</li>
                  <li>• Long-lasting durability</li>
                  <li>• Easy care instructions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
