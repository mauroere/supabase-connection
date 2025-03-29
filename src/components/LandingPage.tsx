import React from 'react';
import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">Bienvenido a Tienda Tech</h1>
            <p className="text-lg">
              Descubre los mejores productos tecnológicos con ofertas exclusivas.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Ver Productos
            </Link>
          </div>
          <img
            src="https://via.placeholder.com/500x300?text=Imagen+Promocional"
            alt="Promoción"
            className="mt-6 md:mt-0 w-full md:w-1/2 rounded-lg shadow-lg"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Envíos Rápidos</h3>
              <p className="text-gray-600">
                Recibe tus productos en tiempo récord con nuestro servicio de envíos rápidos.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Soporte 24/7</h3>
              <p className="text-gray-600">
                Nuestro equipo de soporte está disponible para ayudarte en cualquier momento.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Garantía de Calidad</h3>
              <p className="text-gray-600">
                Todos nuestros productos están garantizados para ofrecerte la mejor experiencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Nuestros Productos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Ejemplo de producto */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="https://via.placeholder.com/300x200?text=Producto+1"
                alt="Producto 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Producto 1</h3>
                <p className="text-gray-600 mt-1">$199.99</p>
                <Link
                  to="/products"
                  className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
            {/* Repite el bloque anterior para más productos */}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; 2023 <span className="font-bold">Tienda Tech</span>. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
