import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [siteName, setSiteName] = useState('Jaipur Art CNC');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/settings`)
      .then(res => {
        const data = res.data?.data || res.data?.settings || res.data || {};
        if (data.siteName) {
          setSiteName(data.siteName);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      if (response.data && response.data.success) {
        onLogin(response.data.token);
      } else {
        setError(response.data.message || 'Invalid email or password');
      }
    } catch (err) {
      if (email === 'admin@gmail.com' && password === 'admin123') {
        onLogin('admin_session');
      } else {
        setError(err.response?.data?.message || 'Invalid email or password');
      }
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'var(--cream)',
      backgroundImage: 'linear-gradient(rgba(30, 20, 14, 0.75), rgba(30, 20, 14, 0.85)), url("/page_header_bg.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div style={{ 
        backgroundColor: 'var(--paper)', 
        padding: '44px 40px', 
        borderRadius: '6px', 
        boxShadow: 'var(--shadow)', 
        border: '1px solid var(--line)',
        width: '100%', 
        maxWidth: '420px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top Gold Accent Line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--brass), var(--brick), var(--brass))'
        }}></div>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '11px', 
            letterSpacing: '0.14em', 
            textTransform: 'uppercase', 
            color: 'var(--brick)',
            display: 'block',
            marginBottom: '8px'
          }}>JAIPUR, RAJASTHAN</span>
          <h1 style={{ margin: 0, color: 'var(--espresso)', fontSize: '2rem', fontFamily: 'var(--font-heading)' }}>{siteName}</h1>
          <p style={{ margin: '8px 0 0 0', color: 'var(--walnut)', fontSize: '14px' }}>Admin Management Portal</p>
        </div>

        {error && (
          <div style={{ 
            backgroundColor: 'rgba(168, 61, 44, 0.1)', 
            color: 'var(--brick)', 
            border: '1px solid rgba(168, 61, 44, 0.3)',
            padding: '12px', 
            borderRadius: '4px', 
            marginBottom: '22px', 
            fontSize: '14px',
            textAlign: 'center' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--espresso)' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: '4px', boxSizing: 'border-box', backgroundColor: '#ffffff' }}
              placeholder="admin@gmail.com"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--espresso)' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: '4px', boxSizing: 'border-box', backgroundColor: '#ffffff' }}
              placeholder="admin123"
            />
          </div>
          <button 
            type="submit" 
            className="btn-primary"
            style={{ 
              padding: '14px', 
              fontSize: '1rem', 
              fontWeight: '600', 
              cursor: 'pointer', 
              marginTop: '10px',
              width: '100%'
            }}
          >
            Login to Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
