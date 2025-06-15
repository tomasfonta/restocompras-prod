
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types/Product';

interface CartItem {
  product: Product;
  quantity: number;
  monthlyAmount: number;
}

interface ShoppingCartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, monthlyAmount: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number, monthlyAmount: number) => void;
  clearCart: () => void;
  getTotalCost: () => number;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number, monthlyAmount: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity, monthlyAmount }
            : item
        );
      }
      return [...prev, { product, quantity, monthlyAmount }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number, monthlyAmount: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity, monthlyAmount }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.monthlyAmount), 0);
  };

  return (
    <ShoppingCartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalCost
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
};
