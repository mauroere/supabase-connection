import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutForm } from './CheckoutForm';

export function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  if (isCheckingOut) {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setIsCheckingOut(false)}
          className="mb-6 text-blue-600 hover:text-blue-800"
        >
          ← Back to Cart
        </button>
        <CheckoutForm />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      <div className="space-y-4">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-4 py-4 border-b border-gray-200"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Minus size={20} />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus size={20} />
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-1 rounded-full hover:bg-gray-100 text-red-500 ml-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <span className="text-lg font-semibold">Total:</span>
        <span className="text-2xl font-bold">${total.toFixed(2)}</span>
      </div>
      <button
        onClick={() => setIsCheckingOut(true)}
        className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}