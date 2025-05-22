import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
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
import About from './pages/About';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
          <Route path="/verifyEmail" element={<VerifyEmailPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/myorders" element={<MyOrdersPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <AppContent />
        <ChatbotWidget />
        <Footer />
      </Router>
    </Provider>
  );
}

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <>
      
    </>
  );
};

export default App;
