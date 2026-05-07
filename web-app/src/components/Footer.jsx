import { MapPin, Phone, Mail, Camera, Share2, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { useContext } from 'react';
import { SiteContext } from '../context/SiteContext';

const Footer = () => {
  const { siteData } = useContext(SiteContext);
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        
        {/* Brand Info */}
        <div className={styles.brandSection}>
          <Link to="/" className={styles.logo}>
            <span className="text-gradient">{siteData?.siteName?.split(' ')[0]} {siteData?.siteName?.split(' ')[1]}</span>
            <span className="text-gold"> {siteData?.siteName?.split(' ').slice(2).join(' ')}</span>
          </Link>
          <p className={styles.description}>
            Transforming Wood Into Premium Art. Custom 2D & 3D CNC cutting and premium wood crafting solutions for modern spaces.
          </p>
          <div className={styles.socialLinks}>
            <a href={siteData?.facebookUrl || "#"} className={styles.socialIcon}><Globe size={20} /></a>
            <a href={siteData?.instagramUrl || "#"} className={styles.socialIcon}><Camera size={20} /></a>
            <a href={siteData?.whatsappUrl || "#"} className={styles.socialIcon}><Share2 size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.linksSection}>
          <h4 className={styles.heading}>Quick Links</h4>
          <ul className={styles.linkList}>
            <li><Link to="/"><ArrowRight size={14} /> Home</Link></li>
            <li><Link to="/about"><ArrowRight size={14} /> About Us</Link></li>
            <li><Link to="/services"><ArrowRight size={14} /> Our Services</Link></li>
            <li><Link to="/gallery"><ArrowRight size={14} /> Creations</Link></li>
            <li><Link to="/contact"><ArrowRight size={14} /> Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className={styles.linksSection}>
          <h4 className={styles.heading}>Services</h4>
          <ul className={styles.linkList}>
            <li><Link to="/services"><ArrowRight size={14} /> 2D CNC Cutting</Link></li>
            <li><Link to="/services"><ArrowRight size={14} /> 3D CNC Carving</Link></li>
            <li><Link to="/services"><ArrowRight size={14} /> Furniture Design</Link></li>
            <li><Link to="/services"><ArrowRight size={14} /> Temple CNC Work</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles.contactSection}>
          <h4 className={styles.heading}>Contact Us</h4>
          <ul className={styles.contactList}>
            <li>
              <MapPin size={18} className="text-blue" />
              <span>{siteData?.address || 'Shop No. 2, Narayan Vihar Asarpura, Jaipur'}</span>
            </li>
            <li>
              <Phone size={18} className="text-blue" />
              <span>{siteData?.contactPhone || '90010-21857'}</span>
            </li>
            <li>
              <Mail size={18} className="text-blue" />
              <span>{siteData?.contactEmail || 'jaipurartscnc@gmail.com'}</span>
            </li>
          </ul>
        </div>

      </div>
      
      <div className={styles.bottomBar}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Jaipur Arts CNC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
