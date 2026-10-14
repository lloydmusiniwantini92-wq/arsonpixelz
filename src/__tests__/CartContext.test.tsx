import React from 'react';
import { render, act, renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CartProvider, useCart } from '../context/CartContext';
import { Product } from '../data/products';

const mockProduct: Product = {
    id: 'test-product-1',
    title: 'Test Product',
    description: 'A test product',
    price: '$100',
    priceValue: 100,
    category: 'template',
    image: '/test.jpg',
    tags: ['test'],
};

const mockProduct2: Product = {
    id: 'test-product-2',
    title: 'Test Product 2',
    description: 'Another test product',
    price: '$200',
    priceValue: 200,
    category: 'font',
    image: '/test2.jpg',
    tags: ['test2'],
};

const customRender = (ui: React.ReactElement) => {
    return render(<CartProvider>{ui}</CartProvider>);
};

describe('CartContext', () => {
    beforeEach(() => {
        window.localStorage.clear();
        vi.clearAllMocks();
    });

    it('adds a product to cart and opens the cart drawer', () => {
        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
        
        act(() => {
            result.current.addToCart(mockProduct);
        });

        expect(result.current.cartItems).toHaveLength(1);
        expect(result.current.cartItems[0].id).toBe(mockProduct.id);
        expect(result.current.cartItems[0].quantity).toBe(1);
        expect(result.current.isCartOpen).toBe(true);
    });

    it('adding the same product twice increments quantity', () => {
        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
        
        act(() => {
            result.current.addToCart(mockProduct);
        });
        
        act(() => {
            result.current.addToCart(mockProduct);
        });

        expect(result.current.cartItems).toHaveLength(1);
        expect(result.current.cartItems[0].quantity).toBe(2);
    });

    it('removes a product from the cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
        
        act(() => {
            result.current.addToCart(mockProduct);
            result.current.addToCart(mockProduct2);
        });

        expect(result.current.cartItems).toHaveLength(2);

        act(() => {
            result.current.removeFromCart(mockProduct.id);
        });

        expect(result.current.cartItems).toHaveLength(1);
        expect(result.current.cartItems[0].id).toBe(mockProduct2.id);
    });

    it('updates quantity of an item', () => {
        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
        
        act(() => {
            result.current.addToCart(mockProduct);
        });

        act(() => {
            result.current.updateQuantity(mockProduct.id, 5);
        });

        expect(result.current.cartItems[0].quantity).toBe(5);
    });

    it('updateQuantity with < 1 removes the item', () => {
        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
        
        act(() => {
            result.current.addToCart(mockProduct);
        });

        act(() => {
            result.current.updateQuantity(mockProduct.id, 0);
        });

        expect(result.current.cartItems).toHaveLength(0);
    });

    it('clears the cart entirely', () => {
        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
        
        act(() => {
            result.current.addToCart(mockProduct);
            result.current.addToCart(mockProduct2);
        });

        act(() => {
            result.current.clearCart();
        });

        expect(result.current.cartItems).toHaveLength(0);
    });

    it('computes cartTotal correctly with multiple items and quantities', () => {
        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
        
        act(() => {
            result.current.addToCart(mockProduct); // 100
            result.current.updateQuantity(mockProduct.id, 2); // 200
            result.current.addToCart(mockProduct2); // 200
        });

        // 2 * 100 + 1 * 200 = 400
        expect(result.current.cartTotal).toBe(400);
    });

    it('computes cartCount correctly', () => {
        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
        
        act(() => {
            result.current.addToCart(mockProduct);
            result.current.updateQuantity(mockProduct.id, 3);
            result.current.addToCart(mockProduct2);
        });

        // 3 + 1 = 4
        expect(result.current.cartCount).toBe(4);
    });

    it('persists cart to localStorage', () => {
        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
        
        act(() => {
            result.current.addToCart(mockProduct);
        });

        const savedCart = window.localStorage.getItem('arson_cart');
        expect(savedCart).toBeTruthy();
        if (savedCart) {
            const parsed = JSON.parse(savedCart);
            expect(parsed).toHaveLength(1);
            expect(parsed[0].id).toBe(mockProduct.id);
        }
    });

    it('loads cart from localStorage on mount', () => {
        const initialCart = [{ ...mockProduct, quantity: 2 }];
        window.localStorage.setItem('arson_cart', JSON.stringify(initialCart));

        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

        expect(result.current.cartItems).toHaveLength(1);
        expect(result.current.cartItems[0].quantity).toBe(2);
    });

    it('handles corrupt localStorage gracefully', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        window.localStorage.setItem('arson_cart', 'invalid json string {]');

        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

        expect(result.current.cartItems).toHaveLength(0);
        expect(consoleSpy).toHaveBeenCalledWith('Failed to parse cart', expect.any(Error));
        
        consoleSpy.mockRestore();
    });

    it('throws error when used outside CartProvider', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        
        expect(() => {
            renderHook(() => useCart());
        }).toThrow('useCart must be used within a CartProvider');
        
        consoleSpy.mockRestore();
    });
});
