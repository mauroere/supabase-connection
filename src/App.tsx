import React, { useState } from 'react';
import { ShoppingCart as CartIcon } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Product } from './types';

// Sample products data
const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    description: 'High-quality wireless headphones with noise cancellation',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 299.99,
    description: 'Feature-rich smartwatch with health tracking',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  },
  {
    id: '3',
    name: 'Laptop Backpack',
    price: 79.99,
    description: 'Durable and spacious laptop backpack with USB charging port',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
  },
];

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Tech Store</h1>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <CartIcon size={24} />
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {isCartOpen ? (
            <Cart />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </CartProvider>
  );
}

export default App;