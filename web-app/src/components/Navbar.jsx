import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import { useContext } from 'react';
import { SiteContext } from '../context/SiteContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { siteData } = useContext(SiteContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.nav}>
        <Link to="/" className={styles.logo}>
          {siteData?.logoUrl ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src={siteData.logoUrl} 
                alt={siteData?.siteName || "Jaipur Art CNC"} 
                className={styles.logoImg} 
              />
              <div className={styles.logoText}>
                {siteData?.siteName || 'Jaipur Art CNC'}
                <span>Wood &amp; Pattern Cutting</span>
              </div>
            </div>
          ) : (
            <>
              <svg className={styles.logoMark} viewBox="0 0 40 40" fill="none">
                <rect x="1" y="1" width="38" height="38" stroke="#A83D2C" strokeWidth="1.4"/>
                <path d="M20 5 L20 35 M5 20 L35 20 M9 9 L31 31 M31 9 L9 31" stroke="#B8892B" strokeWidth="1" opacity="0.55"/>
                <circle cx="20" cy="20" r="7" fill="#2E2116"/>
                <circle cx="20" cy="20" r="2.4" fill="#F2EADC"/>
              </svg>
              <div className={styles.logoText}>
                {siteData?.siteName || 'Jaipur Art CNC'}
                <span>Wood &amp; Pattern Cutting</span>
              </div>
            </>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.navLinks}>
          <NavLink to="/" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Home</NavLink>
          <NavLink to="/services" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Services</NavLink>
          <NavLink to="/gallery" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Creations</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>About Us</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Contact</NavLink>
        </nav>

        <div className={styles.navRight}>
          <span className={styles.phone}>{siteData?.contactPhone || '+91 90010 21857'}</span>
          <Link to="/contact" className={`btn btn-primary ${styles.desktopQuoteBtn}`}>Get a Quote</Link>
          <button 
            className={styles.mobileMenuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`}>
        <NavLink to="/" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
        <NavLink to="/services" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Services</NavLink>
        <NavLink to="/gallery" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Creations</NavLink>
        <NavLink to="/about" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink>
        <NavLink to="/contact" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>

        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/contact" className="btn btn-primary" style={{ textAlign: 'center', width: '100%', padding: '14px' }} onClick={() => setIsMobileMenuOpen(false)}>
            Get a Free Quote
          </Link>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--walnut)', textAlign: 'center', marginTop: '4px' }}>
            {siteData?.contactPhone || '+91 90010 21857'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
