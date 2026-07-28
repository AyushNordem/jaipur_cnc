import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SiteContext } from '../context/SiteContext';
import { getFullMediaUrl } from '../config';
import styles from './PageHeader.module.css';

const PageHeader = ({ title, breadcrumb, pageKey, bgImage }) => {
  const { siteData } = useContext(SiteContext);

  const getHeaderImage = () => {
    // 1. If explicit bgImage prop is provided, use it
    if (bgImage) return bgImage;

    // 2. Map pageKey / title / breadcrumb to siteData fields
    let dynamicImage = '';
    const key = (pageKey || breadcrumb || title || '').toLowerCase();
    
    if (key.includes('service')) {
      dynamicImage = siteData?.servicesHeroImage;
    } else if (key.includes('creation') || key.includes('gallery')) {
      dynamicImage = siteData?.creationsHeroImage;
    } else if (key.includes('about')) {
      dynamicImage = siteData?.aboutHeroImage;
    } else if (key.includes('contact')) {
      dynamicImage = siteData?.contactHeroImage;
    }

    if (dynamicImage) {
      return getFullMediaUrl(dynamicImage);
    }

    // 3. Fallback to default header background image
    return '/page_header_bg.png';
  };

  const activeHeaderBg = getHeaderImage();

  return (
    <div 
      className={styles.pageHeader}
      style={{
        backgroundImage: `url(${activeHeaderBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className={styles.overlay}></div>
      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.homeLink}>Home</Link>
          <ChevronRight size={14} className={styles.separator} />
          <span className={styles.current}>{breadcrumb}</span>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
