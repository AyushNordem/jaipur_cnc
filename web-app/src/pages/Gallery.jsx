import { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import { ArrowRight, Image as ImageIcon, ZoomIn } from 'lucide-react';
import styles from './Gallery.module.css';
import { API_BASE_URL, getFullMediaUrl } from '../config';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/gallery`)
      .then(res => {
        const data = res.data.data || res.data || [];
        setCreations(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('Error fetching creation gallery:', err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All'];
  creations.forEach(item => {
    if (item.category && !categories.includes(item.category)) {
      categories.push(item.category);
    }
  });

  const filteredItems = activeCategory === 'All' 
    ? creations 
    : creations.filter(item => item.category === activeCategory);

  const getFullImageUrl = (url) => getFullMediaUrl(url);

  return (
    <div className="page-container" style={{ minHeight: '100vh', backgroundColor: 'var(--paper)', paddingBottom: '80px' }}>
      <PageHeader title="Creations" breadcrumb="Creations" />

      <div className="container" style={{ marginTop: '40px' }}>
        
        {/* Category Filters */}
        <div className={styles.filters}>
          {categories.map(cat => (
            <button 
              key={cat}
              className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--walnut)' }}>Loading creations gallery...</div>
        ) : filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--walnut)' }}>
            No creations found in gallery.
          </div>
        ) : (
          <div className={styles.masonryGrid}>
            {filteredItems.map((item) => (
              <div key={item._id} className={`glass-card ${styles.portfolioCard}`}>
                <div 
                  className={styles.imageWrapper} 
                  style={{ 
                    backgroundImage: `url(${getFullImageUrl(item.imageUrl)})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                  }}
                >
                  <div className={styles.overlay}>
                    <a href={getFullImageUrl(item.imageUrl)} target="_blank" rel="noopener noreferrer" className={styles.zoomBtn}>
                      <ZoomIn size={24} />
                    </a>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 style={{ color: 'var(--espresso)', fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--walnut)' }}>{item.category}{item.description ? ` • ${item.description}` : ''}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
