import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp, FaTwitter, FaLinkedinIn, FaGoogle } from 'react-icons/fa';
import styles from './Footer.module.css';
import { useContext } from 'react';
import { SiteContext } from '../context/SiteContext';

const Footer = () => {
  const { siteData } = useContext(SiteContext);

  const hasSocialLinks = Boolean(
    siteData?.facebookUrl ||
    siteData?.instagramUrl ||
    siteData?.youtubeUrl ||
    siteData?.whatsappUrl ||
    siteData?.twitterUrl ||
    siteData?.linkedinUrl ||
    siteData?.googleBusinessUrl
  );

  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.footerGrid}`}>
        <div>
          <div className={styles.footerLogo}>{siteData?.siteName || 'Jaipur Art CNC'}</div>
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

          {/* Social Links conditionally displayed under Hours */}
          {hasSocialLinks && (
            <div className={styles.socialSection}>
              <span className={styles.socialHeading}>Follow Us</span>
              <div className={styles.socialIcons}>
                {siteData?.instagramUrl && (
                  <a href={siteData.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}>
                    <FaInstagram size={17} />
                  </a>
                )}
                {siteData?.facebookUrl && (
                  <a href={siteData.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialIcon}>
                    <FaFacebookF size={15} />
                  </a>
                )}
                {siteData?.whatsappUrl && (
                  <a href={siteData.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={styles.socialIcon}>
                    <FaWhatsapp size={17} />
                  </a>
                )}
                {siteData?.youtubeUrl && (
                  <a href={siteData.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialIcon}>
                    <FaYoutube size={17} />
                  </a>
                )}
                {siteData?.twitterUrl && (
                  <a href={siteData.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={styles.socialIcon}>
                    <FaTwitter size={16} />
                  </a>
                )}
                {siteData?.linkedinUrl && (
                  <a href={siteData.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
                    <FaLinkedinIn size={16} />
                  </a>
                )}
                {siteData?.googleBusinessUrl && (
                  <a href={siteData.googleBusinessUrl} target="_blank" rel="noopener noreferrer" aria-label="Google Business" className={styles.socialIcon}>
                    <FaGoogle size={15} />
                  </a>
                )}
              </div>
            </div>
          )}
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
