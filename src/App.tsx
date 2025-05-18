import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Dashboard from './pages/Dashboard';
import NavbarComponent from './components/NavbarComponent';
import Footer from './components/footer';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import ResetPasswordPage from './pages/resetPassword';
import VerifyEmailPage from './pages/verifyEmail';
import BooksPage from './components/books/BooksPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import MyOrdersPage from './pages/MyOrdersPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import Contact from './pages/Contact';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <NavbarComponent/>
          <main className="content-wrap">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/my-orders" element={<MyOrdersPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <AppContent />
          </main>
          <Footer/>
        </div>
      </Router>
    </Provider>
  );
}

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && (
        <div className="dashboard-link-container">
          <Link to="/dashboard" className="dashboard-link">
            Go to Dashboard
          </Link>
        </div>
      )}
    </>
  );
};

export default App;