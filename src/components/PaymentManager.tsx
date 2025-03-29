import React, { useState, useEffect } from 'react';

export function PaymentManager() {
  const [paymentMethods, setPaymentMethods] = useState(() => {
    const savedMethods = localStorage.getItem('paymentMethods');
    return savedMethods
      ? JSON.parse(savedMethods)
      : {
          mercadopago: true,
          cashOnDelivery: false,
          bankTransfer: false,
          cash: true,
        };
  });

  useEffect(() => {
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  const togglePaymentMethod = (method: keyof typeof paymentMethods) => {
    setPaymentMethods((prev) => ({
      ...prev,
      [method]: !prev[method],
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
      <div className="space-y-4">
        {Object.entries(paymentMethods).map(([method, isActive]) => (
          <div
            key={method}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
          >
            <span className="capitalize">{method.replace(/([A-Z])/g, ' $1')}</span>
            <button
              onClick={() => togglePaymentMethod(method as keyof typeof paymentMethods)}
              className={`px-4 py-2 rounded-lg ${
                isActive ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'
              } hover:opacity-80 transition`}
            >
              {isActive ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
