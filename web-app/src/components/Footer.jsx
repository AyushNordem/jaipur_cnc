import { MapPin, Phone, Mail, Camera, Share2, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { useContext } from 'react';
import { SiteContext } from '../context/SiteContext';

const Footer = () => {
  const { siteData } = useContext(SiteContext);
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.footerGrid}`}>
        <div>
          <div className={styles.footerLogo}>Jaipur Art CNC</div>
          <p className={styles.footerDescription}>
            Custom CNC wood cutting in Jaipur — 2D &amp; 3D patterns on MDF, Plywood and Pine, made to your exact design.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/services">Wood Types</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>{siteData?.contactPhone || '+91 90010 21857'}</li>
            <li>{siteData?.contactEmail || 'hello@jaipurartcnc.com'}</li>
            <li>{siteData?.address || 'Jaipur, Rajasthan'}</li>
          </ul>
        </div>
        <div>
          <h4>Hours</h4>
          <ul>
            <li>Mon – Sun: 10:00 – 21:00</li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={`container ${styles.footerBottomFlex}`}>
          <span>© {new Date().getFullYear()} Jaipur Art CNC. All rights reserved.</span>
          <span>Made with wood dust &amp; precision.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
