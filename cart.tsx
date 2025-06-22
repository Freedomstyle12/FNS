import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, Trash2, ShoppingBag, Mail } from "lucide-react";
import { Link } from "wouter";
import { sendOrderEmail } from "@/lib/emailjs";

interface CartItemWithProduct {
  id: number;
  productId: number;
  quantity: number;
  sessionId: string;
  product: {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
    category: string;
  };
}

interface OrderForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

export default function Cart() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });

  const { data: cartItems = [], isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      return apiRequest("PATCH", `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update item quantity.",
        variant: "destructive",
      });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive",
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("DELETE", "/api/cart");
    },
    onSuccess: () => {
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  );

  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shipping;

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create order summary
      const orderSummary = {
        orderNumber: `FS${Date.now()}`,
        customer: orderForm,
        items: cartItems,
        subtotal,
        shipping,
        total,
        orderDate: new Date().toLocaleDateString('en-PK')
      };

      // Send order email
      const orderEmailData = {
        to_email: "freedomstylefs12@gmail.com",
        from_name: orderForm.name,
        reply_to: orderForm.email,
        subject: `New Order #${orderSummary.orderNumber} - FreedomStyle`,
        order_number: orderSummary.orderNumber,
        customer_name: orderForm.name,
        customer_email: orderForm.email,
        customer_phone: orderForm.phone,
        customer_address: orderForm.address,
        order_items: cartItems.map(item => `${item.product.name} - Qty: ${item.quantity} - PKR ${parseFloat(item.product.price).toLocaleString()}`).join('\n'),
        subtotal: subtotal.toLocaleString(),
        shipping: shipping === 0 ? 'Free' : shipping.toLocaleString(),
        total: total.toLocaleString(),
        notes: orderForm.notes || 'None'
      };

      // Send the email
      const emailSent = await sendOrderEmail(orderEmailData);

      toast({
        title: "Order placed successfully!",
        description: `Order #${orderSummary.orderNumber} has been sent to freedomstylefs12@gmail.com`,
      });

      // Clear cart and form
      clearCartMutation.mutate();
      setOrderForm({ name: "", email: "", phone: "", address: "", notes: "" });
      setShowCheckout(false);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
              <Link href="/products">
                <Button size="lg" className="btn-gradient">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => clearCartMutation.mutate()}
                    disabled={clearCartMutation.isPending}
                  >
                    Clear Cart
                  </Button>
                </div>

                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <Link href={`/product/${item.product.id}`}>
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        </Link>
                        
                        <div className="flex-1">
                          <Link href={`/product/${item.product.id}`}>
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-gray-600 capitalize">{item.product.category}</p>
                          <p className="text-lg font-bold text-blue-600">
                            PKR {parseFloat(item.product.price).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantityMutation.mutate({ id: item.id, quantity: item.quantity - 1 })}
                            disabled={item.quantity <= 1 || updateQuantityMutation.isPending}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value);
                              if (newQuantity > 0) {
                                updateQuantityMutation.mutate({ id: item.id, quantity: newQuantity });
                              }
                            }}
                            className="w-16 text-center"
                            min="1"
                          />
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantityMutation.mutate({ id: item.id, quantity: item.quantity + 1 })}
                            disabled={updateQuantityMutation.isPending}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItemMutation.mutate(item.id)}
                          disabled={removeItemMutation.isPending}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>PKR {subtotal.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                          {shipping === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            `PKR ${shipping.toLocaleString()}`
                          )}
                        </span>
                      </div>
                      
                      {shipping > 0 && (
                        <p className="text-sm text-gray-600">
                          Free shipping on orders over PKR 5,000
                        </p>
                      )}
                      
                      <Separator />
                      
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>PKR {total.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-6 btn-gradient" 
                      size="lg"
                      onClick={() => setShowCheckout(true)}
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <Link href="/products">
                      <Button variant="outline" className="w-full mt-3">
                        Continue Shopping
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Checkout Modal */}
          {showCheckout && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Checkout</h2>
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowCheckout(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </Button>
                  </div>

                  <form onSubmit={handleOrderSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={orderForm.name}
                          onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={orderForm.email}
                          onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={orderForm.phone}
                        onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                        required
                        className="mt-1"
                        placeholder="03XXXXXXXXX"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        value={orderForm.address}
                        onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                        required
                        className="mt-1"
                        rows={3}
                        placeholder="Complete address with city and postal code"
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        value={orderForm.notes}
                        onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})}
                        className="mt-1"
                        rows={2}
                        placeholder="Any special instructions for your order"
                      />
                    </div>

                    {/* Order Summary */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                      <div className="space-y-2 text-sm">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex justify-between">
                            <span>{item.product.name} × {item.quantity}</span>
                            <span>PKR {(parseFloat(item.product.price) * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                        <Separator className="my-2" />
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>PKR {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span>{shipping === 0 ? 'Free' : `PKR ${shipping.toLocaleString()}`}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span>PKR {total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={() => setShowCheckout(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 btn-gradient"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 animate-pulse" />
                            <span>Placing Order...</span>
                          </div>
                        ) : (
                          "Place Order"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
