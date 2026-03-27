import React, { createContext, useContext, useState } from 'react';

interface CartContextType {
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = 0;

  return (
    <CartContext.Provider value={{ cartCount, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};
