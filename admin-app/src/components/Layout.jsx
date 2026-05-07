import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, Image, FileText, LogOut, Menu, X } from 'lucide-react';

const Layout = ({ children, onLogout }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Global Info', path: '/settings', icon: <Settings size={20} /> },
    { name: 'Review Section', path: '/reviews', icon: <FileText size={20} /> },
    { name: 'Gallery Manager', path: '/gallery', icon: <Image size={20} /> },
    { name: 'Home Page Info', path: '/home-info', icon: <FileText size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f2f0', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ 
        width: isSidebarOpen ? '260px' : '0px', 
        backgroundColor: '#323232', 
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #4A4A4A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#f5f2f0', opacity: isSidebarOpen ? 1 : 0, transition: 'opacity 0.2s' }}>Jaipur Arts CNC</h2>
        </div>
        
        <nav style={{ flex: 1, padding: '20px 0' }}>
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px',
                color: location.pathname === item.path ? '#f5f2f0' : '#A09D9A',
                textDecoration: 'none',
                backgroundColor: location.pathname === item.path ? '#4A4A4A' : 'transparent',
                borderLeft: location.pathname === item.path ? '4px solid #f5f2f0' : '4px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              {item.icon}
              <span style={{ opacity: isSidebarOpen ? 1 : 0, transition: 'opacity 0.2s' }}>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div style={{ padding: '24px', borderTop: '1px solid #4A4A4A' }}>
          <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', color: '#A09D9A', cursor: 'pointer', fontSize: '1rem' }}>
            <LogOut size={20} /> 
            <span style={{ opacity: isSidebarOpen ? 1 : 0, transition: 'opacity 0.2s' }}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ backgroundColor: 'white', padding: '16px 32px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#323232', padding: '8px', borderRadius: '4px', transition: 'background 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f2f0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Menu size={24} />
          </button>
          <h1 style={{ margin: 0, fontSize: '1.4rem', color: '#323232', fontWeight: '600' }}>
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
