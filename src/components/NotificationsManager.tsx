import React, { useState } from 'react';

export function NotificationsManager() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10,15}$/; // Asegura que el número tenga entre 10 y 15 dígitos
    return phoneRegex.test(phone);
  };

  const sendNotification = () => {
    setError('');
    setSuccessMessage('');

    if (!phoneNumber || !message) {
      setError('Please fill in both fields.');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number (10-15 digits).');
      return;
    }

    if (!window.confirm('Are you sure you want to send this notification?')) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const whatsappMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
      window.open(whatsappURL, '_blank');
      setSuccessMessage('Notification sent successfully!');
      setPhoneNumber('');
      setMessage('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Send Notifications</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={sendNotification}
          disabled={isLoading}
          className={`w-full py-3 rounded-lg transition ${
            isLoading
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Sending...' : 'Send via WhatsApp'}
        </button>
      </div>
    </div>
  );
}
