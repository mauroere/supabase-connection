import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  published: boolean;
  description: string;
  quantity: number;
  image: string;
  video?: string;
  variations: { id: number; name: string; value: string }[];
}

interface ProductsContextType {
  products: Product[];
  updateProducts: (updatedProducts: Product[]) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts
      ? JSON.parse(savedProducts)
      : [
          {
            id: 1,
            name: 'Auriculares Inalámbricos',
            price: 199.99,
            published: true,
            description: 'Auriculares de alta calidad con cancelación de ruido.',
            quantity: 10,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
            variations: [],
          },
          {
            id: 2,
            name: 'Reloj Inteligente',
            price: 299.99,
            published: true,
            description: 'Reloj inteligente con funciones avanzadas de salud.',
            quantity: 5,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
            variations: [],
          },
          {
            id: 3,
            name: 'Mochila para Laptop',
            price: 79.99,
            published: true,
            description: 'Mochila duradera y espaciosa con puerto de carga USB.',
            quantity: 15,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
            variations: [],
          },
        ];
  });

  const updateProducts = useCallback((updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  }, []);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  return (
    <ProductsContext.Provider value={{ products, updateProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
