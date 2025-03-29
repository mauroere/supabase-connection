import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShippingAddress } from '../types';
import toast from 'react-hot-toast';
import { db } from '../lib/database';

export function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (items.length === 0) {
      toast.error('Your cart is empty. Please add items before checking out.');
      setIsSubmitting(false);
      return;
    }

    if (!db) {
      toast.error('Database is not initialized. Please try again later.');
      setIsSubmitting(false);
      return;
    }

    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        toast.error('Please sign in to complete your purchase');
        return;
      }
      const user = JSON.parse(storedUser);

      // Check stock availability
      for (const item of items) {
        const product = await db.get('SELECT stock FROM products WHERE id = ?', [item.id]);
        if (!product || product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${item.name}`);
        }
      }

      // Create order
      const result = await db.run(
        'INSERT INTO orders (user_id, total, shipping_address) VALUES (?, ?, ?)',
        [user.id, total, JSON.stringify(shippingAddress)]
      );
      const orderId = result.lastID;

      // Create order items
      for (const item of items) {
        await db.run(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.id, item.quantity, item.price]
        );
      }

      // Update stock
      for (const item of items) {
        await db.run(
          'UPDATE products SET stock = stock - ? WHERE id = ?',
          [item.quantity, item.id]
        );
      }

      // Clear cart and show success message
      clearCart();
      toast.success('Order placed successfully!');

    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          required
          value={shippingAddress.fullName}
          onChange={e => setShippingAddress(prev => ({ ...prev, fullName: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
          Street Address
        </label>
        <input
          type="text"
          id="streetAddress"
          required
          value={shippingAddress.streetAddress}
          onChange={e => setShippingAddress(prev => ({ ...prev, streetAddress: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            required
            value={shippingAddress.city}
            onChange={e => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            required
            value={shippingAddress.state}
            onChange={e => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            required
            value={shippingAddress.zipCode}
            onChange={e => setShippingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            id="country"
            required
            value={shippingAddress.country}
            onChange={e => setShippingAddress(prev => ({ ...prev, country: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          required
          value={shippingAddress.phone}
          onChange={e => setShippingAddress(prev => ({ ...prev, phone: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : `Pay $${total.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
}