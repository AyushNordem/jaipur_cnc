import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, ArrowRight, ShieldCheck, Download, RefreshCw, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { API_BASE_URL, getFullMediaUrl } from '../config';
import { SiteContext } from '../context/SiteContext';
import styles from './Shop.module.css';

// Fallback initial products if API takes time or offline
const INITIAL_PRODUCTS = [
  {
    _id: "3DWP-3028",
    title: "3DWP-3028 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3028",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    images: ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80"],
    inStock: true
  },
  {
    _id: "3DWP-3027",
    title: "3DWP-3027 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3027",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"],
    inStock: true
  },
  {
    _id: "3DWP-3026",
    title: "3DWP-3026 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3026",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    images: ["https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=80"],
    inStock: true
  },
  {
    _id: "3DWP-3024",
    title: "3DWP-3024 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3024",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80"],
    inStock: true
  },
  {
    _id: "3DWP-3023",
    title: "3DWP-3023 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3023",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    images: ["https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&q=80"],
    inStock: true
  },
  {
    _id: "3DWP-3022",
    title: "3DWP-3022 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3022",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    images: ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80"],
    inStock: true
  },
  {
    _id: "3DWP-3020",
    title: "3DWP-3020 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3020",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80"],
    inStock: true
  },
  {
    _id: "3DWP-3019",
    title: "3DWP-3019 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3019",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"],
    inStock: true
  },
  {
    _id: "3DWP-3018",
    title: "3DWP-3018 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3018",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    images: ["https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=80"],
    inStock: true
  }
];

const CATEGORIES = ["All", "3D Design", "2D Design", "Temple & Mandir", "Door Design"];

const Shop = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
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
          if (data && data.length > 0) {
            setProducts(data);
          }
        }
      } catch (err) {
        console.error("Failed to load live shop products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    let matchesCategory = true;
    if (selectedCategory === "3D Design") {
      matchesCategory = product.category?.includes("3D") || product.title?.includes("3D") || product.isDigital !== false;
    } else if (selectedCategory === "2D Design") {
      matchesCategory = product.category?.includes("2D") || product.title?.includes("2D") || product.category?.includes("Jali");
    } else if (selectedCategory === "Temple & Mandir") {
      matchesCategory = product.category?.includes("Temple") || product.category?.includes("Mandir") || product.title?.includes("Mandir") || product.title?.includes("Temple");
    } else if (selectedCategory === "Door Design") {
      matchesCategory = product.category?.includes("Door") || product.title?.includes("Door");
    }
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (product.designCode && product.designCode.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.shopPage}>
      <PageHeader
        title="CNC Design Files Shop"
        subtitle="Download premium 8x4 Relief & STL 3D Models for Artcam, JDPaint & 3ds Max CNC Routers"
        breadcrumb="Shop / 3D Designs"
      />

      <section className={styles.shopContentSection}>
        <div className="container">

          {/* Top Bar: Search & Categories */}
          <div className={styles.filterSection}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={18} />
              <input
                type="text"
                placeholder="Search design code e.g. 3DWP-3028..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.categoryPills}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.activeCategory : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Header Bar matching Screenshot 1 */}
          <div className={styles.sectionHeaderFlex}>
            <div className={styles.headerTitleGroup}>
              <h2 className={styles.sectionTitle}>Latest Designs</h2>
              <div className={styles.titleUnderline}></div>
            </div>
            <div className={styles.navControls}>
              <button className={styles.navArrowBtn} aria-label="Previous Page"><ChevronLeft size={18} /></button>
              <button className={styles.navArrowBtn} aria-label="Next Page"><ChevronRight size={18} /></button>
            </div>
          </div>

          {/* Product Grid - Redesigned Modern Cards */}
          <div className={styles.productsGrid}>
            {filteredProducts.map(product => {
              const productId = product._id || product.designCode;
              const imgUrl = product.images && product.images.length > 0
                ? getFullMediaUrl(product.images[0])
                : 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80';

              const phoneNum = (siteData?.contactPhone || '9001021857').replace(/[^0-9]/g, '');
              const whatsappOrderUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(`Hi Jaipur Art CNC, I would like to order/buy 3D Design File: ${product.title} (${product.designCode || productId}) for ₹${product.price}`)}`;
              const fileTypes = Array.isArray(product.fileFormats) ? product.fileFormats.join(' · ') : 'RLF · STL';

              return (
                <div key={productId} className={styles.productCard}>
                  {/* Image Container with Badges & Hover Overlay */}
                  <div className={styles.imageBoxWrapper}>
                    {product.discountPercent && (
                      <span className={styles.discountBadge}>
                        -{product.discountPercent}% OFF
                      </span>
                    )}

                    <Link to={`/shop/${productId}`} className={styles.imageBox}>
                      <img src={imgUrl} alt={product.title} loading="lazy" />
                    </Link>

                    {/* Quick View Hover Overlay */}
                    <div className={styles.hoverOverlay}>
                      <Link to={`/shop/${productId}`} className={styles.overlayQuickBtn}>
                        <Eye size={16} /> Quick Details
                      </Link>
                    </div>
                  </div>

                  {/* Card Meta Body */}
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

                    {/* File Format & Size Specs Tag */}
                    <div className={styles.specChipsRow}>
                      <span className={styles.specChip}>8x4 Ft Size</span>
                      <span className={styles.specChip}>Artcam Relief</span>
                    </div>

                    {/* Price & Action Row */}
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

          {filteredProducts.length === 0 && (
            <div className={styles.noResults}>
              <p>No 3D design files found matching "{searchTerm}".</p>
              <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="btn btn-secondary" style={{ marginTop: '12px' }}>
                Reset Filters
              </button>
            </div>
          )}

          {/* Help & Custom Request Banner */}
          <div className={styles.customBanner}>
            <div className={styles.bannerText}>
              <h3>Need a Custom 3D CNC Model or Material Carving?</h3>
              <p>We craft custom 2D & 3D vector patterns and Artcam RLF relief models to your exact dimensions in Jaipur.</p>
            </div>
            <a
              href={`https://wa.me/${(siteData?.contactPhone || '9001021857').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi Jaipur Art CNC, I need a custom 3D CNC model design/carving.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Custom Request on WhatsApp <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Shop;
