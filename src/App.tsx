import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={
                    <PrivateRoute>
                      <CartPage />
                    </PrivateRoute>
                  } />
                  <Route path="/login" element={<LoginPage />} />
                  {/* <Route path="/signup" element={<SignupPage />} /> */}
                </Routes>
              </div>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}