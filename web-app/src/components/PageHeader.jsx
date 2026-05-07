import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './PageHeader.module.css';

const PageHeader = ({ title, breadcrumb }) => {
  return (
    <div className={styles.pageHeader}>
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
