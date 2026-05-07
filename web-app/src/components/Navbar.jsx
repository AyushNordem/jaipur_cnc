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
      <div className={`container ${styles.navbar}`}>
        <Link to="/" className={styles.logo}>
          <span className="text-gradient">{siteData?.siteName?.split(' ')[0]} {siteData?.siteName?.split(' ')[1]}</span>
          <span className="text-gold"> {siteData?.siteName?.split(' ').slice(2).join(' ')}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <NavLink to="/" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Home</NavLink>
          <NavLink to="/services" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Our Services</NavLink>
          <NavLink to="/gallery" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Creations</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>About Us</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Contact</NavLink>
        </nav>

        <div className={styles.navActions}>
          <button 
            className={styles.mobileMenuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''} glass`}>
        <NavLink to="/" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
        <NavLink to="/services" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Our Services</NavLink>
        <NavLink to="/gallery" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Creations</NavLink>
        <NavLink to="/about" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink>
        <NavLink to="/contact" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
      </div>
    </header>
  );
};

export default Navbar;
