import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import GalleryManager from './pages/GalleryManager';
import ReviewManager from './pages/ReviewManager';
import InquiryManager from './pages/InquiryManager';
import ProductManager from './pages/ProductManager';
import Login from './pages/Login';

const SESSION_KEY = 'admin_session_expiry';
const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutes in milliseconds

function App() {
  const checkIsSessionValid = () => {
    const expiry = localStorage.getItem(SESSION_KEY);
    if (!expiry) return false;
    if (Date.now() > parseInt(expiry, 10)) {
      localStorage.removeItem(SESSION_KEY);
      return false;
    }
    return true;
  };

  const [isAuthenticated, setIsAuthenticated] = useState(() => checkIsSessionValid());

  // Handle successful login
  const handleLoginSuccess = () => {
    const expiryTime = Date.now() + SESSION_DURATION_MS;
    localStorage.setItem(SESSION_KEY, expiryTime.toString());
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  // Periodically check session expiry every 10 seconds while logged in
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      if (!checkIsSessionValid()) {
        handleLogout();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  return (
    <Router>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductManager />} />
          <Route path="/inquiries" element={<InquiryManager />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reviews" element={<ReviewManager />} />
          <Route path="/gallery" element={<GalleryManager />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
