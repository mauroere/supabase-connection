import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export function Checkout() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [shippingOption, setShippingOption] = useState<'takeaway' | 'delivery' | null>(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    lastName: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const storeAddress = '123 Main Street, City Center'; // Dirección configurable por el administrador

  const handleNextStep = () => {
    if (step === 3 && shippingOption === 'delivery') {
      if (!deliveryDetails.name || !deliveryDetails.lastName || !deliveryDetails.address) {
        setError('Please fill in all the required fields.');
        return;
      }
    }
    setError('');
    setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => setStep((prev) => prev - 1);

  const handleConfirmOrder = () => {
    setIsLoading(true);
    const orderSummary = `
      Order Summary:
      ${items.map((item) => `${item.name} x${item.quantity}`).join('\n')}
      Total: $${total.toFixed(2)}
      Shipping Option: ${shippingOption === 'takeaway' ? 'Take Away' : 'Delivery'}
      ${
        shippingOption === 'delivery'
          ? `Delivery Address: ${deliveryDetails.name} ${deliveryDetails.lastName}, ${deliveryDetails.address}`
          : `Store Address: ${storeAddress}`
      }
    `;
    const whatsappMessage = encodeURIComponent(orderSummary);
    const whatsappURL = `https://wa.me/?text=${whatsappMessage}`;
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
      clearCart();
      setIsLoading(false);
      setStep(1); // Reinicia el flujo de checkout
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleNextStep}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Shipping Option</h2>
          <div className="space-y-4">
            <button
              onClick={() => {
                setShippingOption('takeaway');
                handleNextStep();
              }}
              className="w-full bg-gray-100 py-3 rounded-lg hover:bg-gray-200 transition"
            >
              Take Away (Pick up at {storeAddress})
            </button>
            <button
              onClick={() => {
                setShippingOption('delivery');
                handleNextStep();
              }}
              className="w-full bg-gray-100 py-3 rounded-lg hover:bg-gray-200 transition"
            >
              Delivery (Enter your address)
            </button>
          </div>
          <button
            onClick={handlePreviousStep}
            className="w-full mt-6 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Back
          </button>
        </div>
      )}

      {step === 3 && shippingOption === 'delivery' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Delivery Details</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNextStep();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                required
                value={deliveryDetails.name}
                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                required
                value={deliveryDetails.lastName}
                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, lastName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                required
                value={deliveryDetails.address}
                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Next
            </button>
          </form>
          <button
            onClick={handlePreviousStep}
            className="w-full mt-6 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Back
          </button>
        </div>
      )}

      {step === 3 && shippingOption === 'takeaway' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Take Away</h2>
          <p className="text-gray-700">You can pick up your order at:</p>
          <p className="font-bold">{storeAddress}</p>
          <button
            onClick={handleNextStep}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>
          <button
            onClick={handlePreviousStep}
            className="w-full mt-6 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Back
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Payment</h2>
          <p className="text-gray-700">Simulating payment...</p>
          <button
            onClick={handleNextStep}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Confirm Payment
          </button>
          <button
            onClick={handlePreviousStep}
            className="w-full mt-6 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Back
          </button>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
          <p className="text-gray-700">Thank you for your order!</p>
          <button
            onClick={handleConfirmOrder}
            disabled={isLoading}
            className={`w-full mt-6 py-3 rounded-lg transition ${
              isLoading
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Processing...' : 'Send Order via WhatsApp'}
          </button>
        </div>
      )}
    </div>
  );
}
