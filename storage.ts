import { 
  products, 
  cartItems, 
  contactMessages,
  type Product, 
  type InsertProduct, 
  type CartItem, 
  type InsertCartItem,
  type ContactMessage,
  type InsertContactMessage 
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<void>;
  
  // Contact
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async initializeProducts() {
    try {
      // Check if products already exist
      const existingProducts = await db.select().from(products).limit(1);
      if (existingProducts.length > 0) {
        return; // Products already initialized
      }

      // Insert sample products
      const sampleProducts: InsertProduct[] = [
        // Clothes
        {
          name: "Casual Style Outfit",
          description: "Premium cotton blend casual wear perfect for everyday comfort",
          price: "4500.00",
          category: "clothes",
          imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          featured: true,
          inStock: true,
        },
        {
          name: "Designer Dress",
          description: "Elegant evening wear for special occasions",
          price: "8200.00",
          category: "clothes",
          imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          featured: true,
          inStock: true,
        },
        {
          name: "Business Shirt",
          description: "Professional attire for the modern workplace",
          price: "3800.00",
          category: "clothes",
          imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          featured: true,
          inStock: true,
        },
        {
          name: "Denim Jacket",
          description: "Classic vintage style denim jacket",
          price: "6800.00",
          category: "clothes",
          imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          featured: true,
          inStock: true,
        },
        {
          name: "Summer T-Shirt",
          description: "Lightweight cotton t-shirt for summer",
          price: "2500.00",
          category: "clothes",
          imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          featured: false,
          inStock: true,
        },
        {
          name: "Winter Coat",
          description: "Warm and stylish winter outerwear",
          price: "12000.00",
          category: "clothes",
          imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          featured: false,
          inStock: true,
        },
        
        // Watches
        {
          name: "Luxury Watch",
          description: "Swiss movement luxury timepiece",
          price: "25000.00",
          category: "watches",
          imageUrl: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          featured: true,
          inStock: true,
        },
        {
          name: "Sport Watch",
          description: "Water resistant sports watch",
          price: "15000.00",
          category: "watches",
          imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          featured: true,
          inStock: true,
        },
        {
          name: "Classic Timepiece",
          description: "Timeless design with modern functionality",
          price: "18500.00",
          category: "watches",
          imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          featured: false,
          inStock: true,
        },
        {
          name: "Digital Watch",
          description: "Modern digital display with smart features",
          price: "8500.00",
          category: "watches",
          imageUrl: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          featured: false,
          inStock: true,
        },
        
        // Shoes
        {
          name: "Premium Sneakers",
          description: "Comfort meets style in these premium sneakers",
          price: "12500.00",
          category: "shoes",
          imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          featured: true,
          inStock: true,
        },
        {
          name: "Formal Shoes",
          description: "Genuine leather formal footwear",
          price: "9500.00",
          category: "shoes",
          imageUrl: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          featured: true,
          inStock: true,
        },
        {
          name: "Running Shoes",
          description: "High-performance athletic footwear",
          price: "11000.00",
          category: "shoes",
          imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          featured: false,
          inStock: true,
        },
        {
          name: "Casual Loafers",
          description: "Comfortable everyday casual shoes",
          price: "7500.00",
          category: "shoes",
          imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
          featured: false,
          inStock: true,
        },
      ];

      await db.insert(products).values(sampleProducts);
      console.log('Sample products initialized in database');
    } catch (error) {
      console.error('Error initializing products:', error);
    }
  }

  constructor() {
    // Initialize products when storage is created
    this.initializeProducts();
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.featured, true));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const result = await db
      .select({
        id: cartItems.id,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        sessionId: cartItems.sessionId,
        product: products
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.sessionId, sessionId));
    
    return result;
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.productId, insertCartItem.productId),
          eq(cartItems.sessionId, insertCartItem.sessionId)
        )
      );

    if (existingItem) {
      // Update quantity
      const [updatedItem] = await db
        .update(cartItems)
        .set({ quantity: existingItem.quantity + (insertCartItem.quantity || 1) })
        .where(eq(cartItems.id, existingItem.id))
        .returning();
      return updatedItem;
    } else {
      // Create new cart item
      const [cartItem] = await db
        .insert(cartItems)
        .values({
          ...insertCartItem,
          quantity: insertCartItem.quantity || 1
        })
        .returning();
      return cartItem;
    }
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const [updatedItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return updatedItem || undefined;
  }

  async removeFromCart(id: number): Promise<boolean> {
    const result = await db
      .delete(cartItems)
      .where(eq(cartItems.id, id));
    return (result.rowCount || 0) > 0;
  }

  async clearCart(sessionId: string): Promise<void> {
    await db
      .delete(cartItems)
      .where(eq(cartItems.sessionId, sessionId));
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values({ 
        ...insertMessage, 
        createdAt: new Date().toISOString() 
      })
      .returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
