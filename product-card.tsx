import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/cart", {
        productId: product.id,
        quantity: 1,
      });
    },
    onSuccess: () => {
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCartMutation.mutate();
  };

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="product-card overflow-hidden cursor-pointer h-full">
        <div className="relative">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-blue-600">
              Featured
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-3 right-3">
              Out of Stock
            </Badge>
          )}
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="text-2xl font-bold text-blue-600">
            PKR {parseFloat(product.price).toLocaleString()}
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0">
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock || addToCartMutation.isPending}
            className="w-full btn-gradient"
          >
            {addToCartMutation.isPending 
              ? "Adding..." 
              : product.inStock 
                ? "Add to Cart" 
                : "Out of Stock"
            }
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
