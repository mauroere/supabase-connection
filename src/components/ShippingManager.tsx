import React, { useState } from 'react';

interface ShippingManagerProps {
  orders: { id: number; customer: string; status: string }[];
  updateOrders: (orders: typeof orders) => void;
}

export function ShippingManager({ orders, updateOrders }: ShippingManagerProps) {
  const [successMessage, setSuccessMessage] = useState('');

  const updateStatus = (id: number, status: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );
    updateOrders(updatedOrders);
    setSuccessMessage(`Estado del pedido actualizado a "${status}".`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteOrder = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      const updatedOrders = orders.filter((order) => order.id !== id);
      updateOrders(updatedOrders);
      setSuccessMessage('Pedido eliminado con éxito.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Envíos</h2>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2">Pedido</th>
            <th className="px-4 py-2">Cliente</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-2">#{order.id}</td>
              <td className="px-4 py-2">{order.customer}</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => updateStatus(order.id, 'Preparando')}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Preparando
                </button>
                <button
                  onClick={() => updateStatus(order.id, 'Enviado')}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Enviado
                </button>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
