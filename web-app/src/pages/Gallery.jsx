import { useState, useContext, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { ArrowRight, Image as ImageIcon, ZoomIn, Play } from 'lucide-react';
import styles from './Gallery.module.css';
import { SiteContext } from '../context/SiteContext';

const galleryItems = [
  { id: 1, category: 'furniture', title: 'Modern TV Unit', desc: 'Premium MDF Cutting', type: 'image' },
  { id: 2, category: 'temple', title: 'Traditional Mandir', desc: 'Detailed 3D Carving', type: 'image' },
  { id: 3, category: 'panels', title: 'Geometric Wall Panel', desc: 'Acrylic Laser Cut', type: 'image' },
  { id: 4, category: '3d', title: 'Floral Relief Artwork', desc: 'High-density Wood', type: 'video' },
  { id: 5, category: 'furniture', title: 'Luxury Center Table', desc: 'CNC Base Design', type: 'image' },
  { id: 6, category: 'panels', title: 'Room Divider', desc: 'WPC Lattice Pattern', type: 'image' },
  { id: 7, category: 'temple', title: 'Pooja Room Doors', desc: 'Teak Wood Carving', type: 'image' },
  { id: 8, category: '3d', title: 'Custom Portrait Carving', desc: 'Solid Wood 3D', type: 'image' }
];

const Gallery = () => {
  const { siteData } = useContext(SiteContext);
  const [activeCategory, setActiveCategory] = useState('all');
  const [dynamicItems, setDynamicItems] = useState([]);

  useEffect(() => {
    if (siteData && siteData.galleryImages) {
      setDynamicItems(siteData.galleryImages);
    } else {
      setDynamicItems(galleryItems); // fallback to static
    }
  }, [siteData]);

  const categories = [{ id: 'all', label: 'All Works' }];
  
  // Extract unique categories dynamically
  dynamicItems.forEach(item => {
    if (item.category && !categories.find(c => c.id === item.category.toLowerCase())) {
      categories.push({ id: item.category.toLowerCase(), label: item.category });
    }
  });

  const filteredItems = activeCategory === 'all' 
    ? dynamicItems 
    : dynamicItems.filter(item => item.category?.toLowerCase() === activeCategory);

  return (
    <div className="page-container" style={{ minHeight: '100vh', backgroundColor: 'var(--color-light-gray)', paddingBottom: '80px' }}>
      <PageHeader title="Creations" breadcrumb="Creations" />

      <div className="container" style={{ marginTop: '40px' }}>
        <div className={styles.filters}>
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.masonryGrid}>
          {filteredItems.map((item, idx) => (
            <div key={idx} className={`glass-card ${styles.portfolioCard}`}>
              <div className={styles.imageWrapper} style={item.url ? { backgroundImage: `url(http://localhost:5000${item.url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                {!item.url && (
                  <div className={styles.placeholder}>
                    <ImageIcon size={48} className="text-blue" style={{ opacity: 0.3 }} />
                  </div>
                )}
                <div className={styles.overlay}>
                  <button className={styles.zoomBtn}>
                    {item.type === 'video' ? <Play size={24} /> : <ZoomIn size={24} />}
                  </button>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 style={{ color: 'var(--color-black)' }}>{item.title}</h3>
                <p style={{ color: 'var(--color-medium-gray)' }}>{item.category || item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.loadMore}>
          <button className="btn btn-outline">
            Load More Projects <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
