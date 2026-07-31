import { useContext } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { SiteContext } from '../context/SiteContext';
import styles from './FloatingSideButtons.module.css';

const FloatingSideButtons = () => {
  const { siteData } = useContext(SiteContext);

  const rawPhone = siteData?.contactPhone || '9001021857';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const telUrl = `tel:${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}`;
  
  const whatsappUrl = siteData?.whatsappUrl || `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent('Hi Jaipur Arts CNC, I would like to inquire about your CNC cutting & design services.')}`;

  return (
    <div className={styles.sideContainer}>
      <a 
        href={telUrl} 
        className={styles.sideTabCall} 
        aria-label="Call Us" 
        title="Call Us Now"
      >
        <Phone size={14} className={styles.tabIcon} /> CALL US
      </a>

      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.sideTabWhatsapp} 
        aria-label="WhatsApp Us" 
        title="Chat on WhatsApp"
      >
        <MessageCircle size={14} className={styles.tabIcon} /> WHATSAPP
      </a>
    </div>
  );
};

export default FloatingSideButtons;
