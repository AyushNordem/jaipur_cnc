import { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './ImageLightbox.module.css';

const ImageLightbox = ({ src, alt, onClose, svgData }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close zoomed view">
          <X size={22} />
        </button>

        {src ? (
          <img src={src} alt={alt || 'Zoomed view'} className={styles.image} />
        ) : svgData ? (
          <div className={styles.svgFrame}>
            <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
              <rect width="400" height="400" fill={svgData.fill || '#6E4A2E'} />
              {svgData.pattern && (
                <>
                  <defs>
                    <pattern id="modalPat" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="14" fill="none" stroke="#F2EADC" strokeWidth="1.8" opacity="0.6" />
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#modalPat)" />
                </>
              )}
              {svgData.path && <path d="M0 200 200 0 400 200 200 400Z" fill="#F2EADC" opacity="0.22" />}
              {svgData.circle && <circle cx="200" cy="200" r="110" fill="none" stroke="#2E2116" strokeWidth="4" opacity="0.4" />}
              {svgData.triangle && <path d="M40 360 L200 40 L360 360 Z" fill="none" stroke="#B8892B" strokeWidth="4" />}
              {svgData.rect && <rect x="80" y="80" width="240" height="240" fill="none" stroke="#F2EADC" strokeWidth="3" opacity="0.5" />}
              {svgData.doubleCircle && (
                <>
                  <circle cx="120" cy="120" r="28" fill="#F2EADC" opacity="0.35" />
                  <circle cx="280" cy="280" r="28" fill="#F2EADC" opacity="0.35" />
                </>
              )}
            </svg>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ImageLightbox;
