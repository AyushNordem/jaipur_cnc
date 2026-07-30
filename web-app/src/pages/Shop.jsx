import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, RefreshCw, Eye } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { API_BASE_URL, getFullMediaUrl } from '../config';
import { SiteContext } from '../context/SiteContext';
import styles from './Shop.module.css';

const CATEGORIES = ["All", "3D Design", "2D Design", "Temple & Mandir", "Door Design"];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { siteData } = useContext(SiteContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch products from backend API:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const phoneNum = (siteData?.contactPhone || '9001021857').replace(/[^0-9]/g, '');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || 
      (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());

    const query = searchTerm.toLowerCase().trim();
    const matchesSearch = !query || 
      (product.title && product.title.toLowerCase().includes(query)) ||
      (product.designCode && product.designCode.toLowerCase().includes(query)) ||
      (product.category && product.category.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.shopPage}>
      <PageHeader 
        title="CNC Design Files Shop" 
        subtitle="Download High Quality Artcam RLF & STL 3D Relief Models & 2D Vector Designs"
        breadcrumb="Shop / Designs"
      />

      <section className={styles.shopContentSection}>
        <div className="container">

          {/* Clean Search Bar & Category Pills */}
          <div className={styles.filterSection}>
            
            {/* Search Box Input */}
            <div className={styles.searchWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search design code or title (e.g. JAC-3D-3028, Door)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            {/* Category Filter Pills */}
            <div className={styles.categoryPills}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.activeCategory : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* Active Filter Count & Tagline */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '14.5px', color: 'var(--espresso)', fontWeight: '600', fontFamily: 'var(--font-heading)' }}>
              Showing <strong>{filteredProducts.length}</strong> {selectedCategory !== "All" ? selectedCategory : 'High-Precision CNC'} Design Files Ready for WhatsApp Purchase
            </span>
            {(selectedCategory !== "All" || searchTerm) && (
              <button 
                onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }}
                style={{ background: 'none', border: 'none', color: 'var(--brick)', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Product Grid Layout */}
          {loading ? (
            <div className={styles.productsGrid}>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage} />
                  <div className={styles.skeletonMeta}>
                    <div className={styles.skeletonTagRow}>
                      <div className={styles.skeletonTag} />
                      <div className={styles.skeletonCode} />
                    </div>
                    <div className={styles.skeletonTitle} />
                    <div className={styles.skeletonTitleShort} />
                    <div className={styles.skeletonFooter}>
                      <div className={styles.skeletonPrice} />
                      <div className={styles.skeletonBtn} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className={styles.noResults}>
              <h3>No Design Files Found</h3>
              <p>No matching models found for "{searchTerm || selectedCategory}". Try searching for another code like 3028 or change filters.</p>
              <button 
                onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }} 
                className="btn btn-primary mt-4"
              >
                View All Designs
              </button>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => {
                const productId = product._id || product.designCode;
                const imgUrl = (product.images && product.images.length > 0) 
                  ? getFullMediaUrl(product.images[0]) 
                  : 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80';
                
                const whatsappOrderUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(`Hi Jaipur Art CNC, I want to buy Design File: ${product.title} (${product.designCode || productId}) for ₹${product.price}`)}`;

                return (
                  <div key={productId} className={styles.productCard}>
                    
                    <div className={styles.imageBoxWrapper}>
                      {product.discountPercent && (
                        <span className={styles.discountBadge}>
                          -{product.discountPercent}% OFF
                        </span>
                      )}

                      <Link to={`/shop/${productId}`} className={styles.imageBox}>
                        <img src={imgUrl} alt={product.title} loading="lazy" />
                      </Link>

                      <div className={styles.hoverOverlay}>
                        <Link to={`/shop/${productId}`} className={styles.overlayQuickBtn}>
                          <Eye size={16} /> Quick Details
                        </Link>
                      </div>
                    </div>

                    <div className={styles.productMeta}>
                      <div className={styles.categoryCodeRow}>
                        <span className={styles.categoryTag}>
                          {product.category || '3D Design'}
                        </span>
                        <span className={styles.designCodePill}>
                          #{product.designCode || productId}
                        </span>
                      </div>

                      <h3 className={styles.productTitle}>
                        <Link to={`/shop/${productId}`}>{product.title}</Link>
                      </h3>

                      <div className={styles.specChipsRow}>
                        <span className={styles.specChip}>8x4 Ft Size</span>
                        <span className={styles.specChip}>Artcam Relief</span>
                      </div>

                      <div className={styles.priceRow}>
                        <div className={styles.priceContainer}>
                          <span className={styles.currencySymbol}>₹</span>
                          <span className={styles.salePrice}>{product.price}</span>
                          {product.originalPrice && (
                            <span className={styles.originalPrice}>₹{product.originalPrice}</span>
                          )}
                        </div>

                        <div className={styles.cardActionsGroup}>
                          <a 
                            href={whatsappOrderUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.whatsappDirectBtn}
                            title="Instant Order on WhatsApp"
                          >
                            Buy File
                          </a>

                          <Link 
                            to={`/shop/${productId}`} 
                            className={styles.cartIconBtn}
                            title="View Details"
                          >
                            <ShoppingBag size={15} />
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Shop;
