import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, ArrowRight, ShieldCheck, Download, RefreshCw, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
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

      <section className="section py-8">
        <div className="container">

          {/* Unified Compact Search Bar + Category Pills */}
          <div className={styles.filterSection}>
            <div className={styles.searchPillsBar}>
              
              {/* Search Box */}
              <div className={styles.searchBoxInline}>
                <Search size={18} className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search design code or title (e.g. JAC-3D-3028, Door)..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInputInline}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className={styles.clearSearchBtn}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className={styles.categoryPillsInline}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`${styles.pillBtn} ${selectedCategory === cat ? styles.activePill : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Active Filter Count */}
          <div className={styles.resultsInfoRow}>
            <span className={styles.resultsCount}>
              Showing <strong>{filteredProducts.length}</strong> {selectedCategory !== "All" ? selectedCategory : ''} Design Files
            </span>
            {(selectedCategory !== "All" || searchTerm) && (
              <button 
                onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }}
                className={styles.resetFilterBtn}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className={styles.loadingState}>
              <RefreshCw className="animate-spin" size={28} />
              <p>Loading CNC Design Files catalog...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className={styles.emptyState}>
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
            <div className={styles.productGrid}>
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
