import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, Image, FileText, MessageSquare, LogOut, Menu } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Layout = ({ children, onLogout }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Global Settings', path: '/settings', icon: <Settings size={20} /> },
    { name: 'Inquiries Manager', path: '/inquiries', icon: <MessageSquare size={20} /> },
    { name: 'Review Section', path: '/reviews', icon: <FileText size={20} /> },
    { name: 'Gallery Manager', path: '/gallery', icon: <Image size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: 'var(--cream)', overflow: 'hidden' }}>
      {/* Sidebar - Fixed Left Drawer */}
      <div style={{ 
        width: isSidebarOpen ? '260px' : '0px', 
        height: '100vh',
        flexShrink: 0,
        backgroundColor: 'var(--espresso)', 
        color: 'var(--cream)', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
        overflowY: 'auto',
        whiteSpace: 'nowrap',
        boxShadow: '4px 0 20px rgba(46,33,22,0.15)',
        zIndex: 10
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(242,234,220,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '100%' }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--brass)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>ADMIN PORTAL</span>
            <h2 style={{ 
              margin: '4px 0 0 0', 
              fontSize: '1.15rem', 
              fontFamily: 'var(--font-heading)', 
              color: 'var(--paper)', 
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              lineHeight: '1.25',
              opacity: isSidebarOpen ? 1 : 0, 
              transition: 'opacity 0.2s' 
            }}>
              {siteName}
            </h2>
          </div>
        </div>
        
        <nav style={{ flex: 1, padding: '20px 0' }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path}
                style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '14px 24px',
                  color: isActive ? 'var(--paper)' : '#C7B9A6',
                  textDecoration: 'none',
                  backgroundColor: isActive ? 'rgba(168, 61, 44, 0.25)' : 'transparent',
                  borderLeft: isActive ? '4px solid var(--brass)' : '4px solid transparent',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ color: isActive ? 'var(--brass)' : '#C7B9A6' }}>{item.icon}</span>
                <span style={{ opacity: isSidebarOpen ? 1 : 0, transition: 'opacity 0.2s', fontFamily: 'var(--font-body)' }}>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(242,234,220,0.12)' }}>
          <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', color: '#C7B9A6', cursor: 'pointer', fontSize: '0.95rem', fontFamily: 'var(--font-body)', width: '100%', padding: '8px 0', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--brick)'} onMouseOut={(e) => e.currentTarget.style.color = '#C7B9A6'}>
            <LogOut size={20} /> 
            <span style={{ opacity: isSidebarOpen ? 1 : 0, transition: 'opacity 0.2s' }}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', minWidth: 0, overflow: 'hidden' }}>
        <header style={{ backgroundColor: 'var(--paper)', padding: '16px 32px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 8px rgba(46,33,22,0.04)', flexShrink: 0 }}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--espresso)', padding: '8px', borderRadius: '4px', transition: 'background 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--cream)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Menu size={22} />
          </button>
          <h1 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontWeight: '600' }}>
            {menuItems.find(m => m.path === location.pathname)?.name || 'Admin Panel'}
          </h1>
        </header>
        <main style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
