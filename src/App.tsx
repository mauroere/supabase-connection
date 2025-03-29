import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { AdminDashboard } from './components/AdminDashboard';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem('isAdminLoggedIn') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isAdminLoggedIn', String(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  return (
    <ProductsProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/cart" element={<Cart openCheckout={() => {}} />} />
            <Route path="/checkout" element={<Checkout />} />
            {isAdminLoggedIn && (
              <Route
                path="/admin"
                element={
                  <AdminDashboard
                    onLogout={() => {
                      setIsAdminLoggedIn(false);
                      localStorage.removeItem('isAdminLoggedIn');
                    }}
                  />
                }
              />
            )}
          </Routes>
        </Router>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;