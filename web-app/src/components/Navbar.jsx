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
          <img
            src={siteData?.logoUrl || "/logo.png"}
            alt={siteData?.siteName || "JAIPUR ARTS CNC"}
            className={styles.logoImg}
            onError={(e) => { e.target.src = "/logo.png"; }}
          />
          <div className={styles.logoText}>
            {siteData?.siteName || 'JAIPUR ARTS CNC'}
            <span>Wood &amp; Pattern Cutting</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.navLinks}>
          <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Home</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Services</NavLink>
          <NavLink to="/shop" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Shop</NavLink>
          <NavLink to="/gallery" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Creations</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>About Us</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Contact</NavLink>
        </nav>

        <div className={styles.navRight}>
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
        <NavLink to="/shop" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Shop</NavLink>
        <NavLink to="/gallery" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Creations</NavLink>
        <NavLink to="/about" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink>
        <NavLink to="/contact" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>

        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/contact" className="btn btn-primary" style={{ textAlign: 'center', width: '100%', padding: '14px' }} onClick={() => setIsMobileMenuOpen(false)}>
            Get a Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
