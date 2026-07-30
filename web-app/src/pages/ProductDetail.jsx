import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Eye, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { API_BASE_URL, getFullMediaUrl } from '../config';
import { SiteContext } from '../context/SiteContext';
import styles from './ProductDetail.module.css';
import shopStyles from './Shop.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [similarProducts, setSimilarProducts] = useState([]);
  const scrollRef = useRef(null);
  const { siteData } = useContext(SiteContext);

  // Form state for inquiry tab
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImgIndex(0);

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Error fetching product details from MongoDB API:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilar = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setSimilarProducts(data.filter(p => p._id !== id && p.designCode !== id));
          }
        }
      } catch (err) {
        console.error("Failed to load similar products from API:", err);
      }
    };

    fetchProduct();
    fetchSimilar();
  }, [id]);

  const scrollSimilar = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
        Loading product details from database...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: '#64748b', marginTop: '8px' }}>The requested design model could not be found in our database.</p>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '16px' }}>Back to Shop Catalog</Link>
      </div>
    );
  }

  const phoneNum = (siteData?.contactPhone || '9001021857').replace(/[^0-9]/g, '');
  const whatsappMessage = `Hi Jaipur Art CNC, I want to purchase / download the Design File: ${product.title} (Code: ${product.designCode || product._id}) at ₹${product.price}`;
  const whatsappUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(whatsappMessage)}`;

  const imagesList = (product.images && product.images.length > 0) 
    ? product.images.map(img => getFullMediaUrl(img)) 
    : [
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
      ];

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    try {
      await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: inquiryName,
          phone: inquiryPhone,
          patternType: product.category || '3D Design',
          message: `[Product Enquiry for: ${product.title} (Code: ${product.designCode || product._id})] ${inquiryMessage}`
        })
      });
      setInquirySubmitted(true);
      setTimeout(() => {
        setInquirySubmitted(false);
        setInquiryName('');
        setInquiryPhone('');
        setInquiryMessage('');
      }, 4000);
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
      setInquirySubmitted(true);
    }
  };

  return (
    <div className={styles.detailPage}>
      <PageHeader 
        title={product.title} 
        subtitle={`Design Code: ${product.designCode || product._id} | Artcam RLF & STL 3D Relief File`}
        breadcrumb={`Shop / Designs / ${product.designCode || 'Product'}`}
      />

      <section className={styles.detailSection}>
        <div className="container">
          
          <Link to="/shop" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Design Shop
          </Link>

          {/* Product View */}
          <div className={styles.productGrid}>

            {/* Left Image Column */}
            <div className={styles.imageColumn}>
              <div className={styles.mainImageWrapper}>
                {product.discountPercent && (
                  <span className={styles.discountBadge}>-{product.discountPercent}% OFF</span>
                )}
                <img 
                  src={imagesList[activeImgIndex] || imagesList[0]} 
                  alt={product.title} 
                  className={styles.mainImg}
                />
              </div>

              {/* Thumbnails below main image */}
              {imagesList.length > 1 && (
                <div className={styles.thumbnailRow}>
                  {imagesList.map((img, idx) => (
                    <button 
                      key={idx} 
                      className={`${styles.thumbBtn} ${activeImgIndex === idx ? styles.activeThumb : ''}`}
                      onClick={() => setActiveImgIndex(idx)}
                    >
                      <img src={img} alt={`View ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Information Column */}
            <div className={styles.infoColumn}>
              <div className={styles.categoryBreadcrumb}>
                Designs, {product.category || '3D Design'}
              </div>

              <h1 className={styles.productTitle}>
                {product.title}
              </h1>

              {/* Product Specifications list */}
              <div className={styles.specList}>
                <p><strong>Product</strong> – Artcam 3D Model Relief &amp; STL File (Digital File Only)</p>
                <p><strong>Design Code</strong> – {product.designCode || product._id}</p>
                <p><strong>Under Category</strong> – {product.category || '3D Design'}</p>
                <p><strong>File Delivery</strong> – Get on WhatsApp after purchase.</p>
                <p className={styles.disclaimerText}>
                  (Always refer for Model Screenshot Image. Rendered Image are for Illustration Purpose Only)
                </p>
              </div>

              {/* Price section */}
              <div className={styles.priceRow}>
                <span className={styles.currencySymbol}>₹</span>
                <span className={styles.salePrice}>{product.price}</span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>₹{product.originalPrice}</span>
                )}
              </div>

              {/* Actions */}
              <div className={styles.actionRow}>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.addToCartBtn}
                >
                  <ShoppingCart size={18} /> Buy on WhatsApp
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Tabs - Only Description & Product Enquiry */}
          <div className={styles.tabSection}>
            <div className={styles.tabBar}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'description' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'enquiry' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('enquiry')}
              >
                Product Enquiry
              </button>
            </div>

            {/* Tab Content Box */}
            <div className={styles.tabContentBox}>
              {activeTab === 'description' && (
                <div className={styles.descriptionContent}>
                  {product.description ? (
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: product.description.includes('<') 
                          ? product.description 
                          : product.description.replace(/\n/g, '<br/>') 
                      }} 
                    />
                  ) : (
                    <>
                      <p>Get design files on WhatsApp immediately after purchase.</p>
                      <p><strong>Files</strong> – RLF File (Artcam Relief File For All Versions of Artcam)</p>
                      <p><strong>Files</strong> – STL File</p>
                      <p><strong>Size</strong> – Adjustable</p>
                    </>
                  )}

                  <div className={styles.categoriesFooter}>
                    <strong>Categories:</strong> Designs, {product.category || '3D Design'}
                  </div>
                </div>
              )}

              {activeTab === 'enquiry' && (
                <div className={styles.enquiryContent}>
                  <h3>Enquire about {product.designCode || product.title}</h3>
                  <p>Have a question or need file conversion? Send us a quick inquiry:</p>

                  {inquirySubmitted ? (
                    <div style={{ color: '#059669', background: '#ecfdf5', padding: '12px 16px', borderRadius: '6px', marginTop: '12px' }}>
                      ✓ Thank you! Your inquiry has been sent. We will get back to you shortly.
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className={styles.enquiryForm}>
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        required 
                        value={inquiryName} 
                        onChange={(e) => setInquiryName(e.target.value)} 
                      />
                      <input 
                        type="tel" 
                        placeholder="WhatsApp / Phone Number" 
                        required 
                        value={inquiryPhone} 
                        onChange={(e) => setInquiryPhone(e.target.value)} 
                      />
                      <textarea 
                        rows="3" 
                        placeholder="Your Message / File inquiry..." 
                        required 
                        value={inquiryMessage} 
                        onChange={(e) => setInquiryMessage(e.target.value)}
                      ></textarea>
                      <button type="submit" className="btn btn-primary">Submit Product Enquiry</button>
                    </form>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Similar Products Section with horizontal left-to-right scrolling */}
          {similarProducts.length > 0 && (
            <div className={styles.similarProductsSection}>
              <div className={styles.similarHeaderFlex}>
                <h2 className={styles.similarTitle}>Similar Products</h2>
                <div className={styles.scrollControls}>
                  <button onClick={() => scrollSimilar('left')} className={styles.scrollArrowBtn} aria-label="Scroll Left">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => scrollSimilar('right')} className={styles.scrollArrowBtn} aria-label="Scroll Right">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className={styles.similarScrollRow} ref={scrollRef}>
                {similarProducts.map(item => {
                  const itemCode = item._id || item.designCode;
                  const itemImg = item.images && item.images.length > 0 
                    ? getFullMediaUrl(item.images[0]) 
                    : 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80';
                  
                  const itemWhatsappUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(`Hi Jaipur Art CNC, I want to order Design: ${item.title} (${item.designCode || itemCode}) for ₹${item.price}`)}`;

                  return (
                    <div key={itemCode} className={`${shopStyles.productCard} ${styles.productCard}`}>
                      <div className={shopStyles.imageBoxWrapper}>
                        {item.discountPercent && (
                          <span className={shopStyles.discountBadge}>
                            -{item.discountPercent}% OFF
                          </span>
                        )}

                        <Link to={`/shop/${itemCode}`} className={shopStyles.imageBox}>
                          <img src={itemImg} alt={item.title} loading="lazy" />
                        </Link>

                        <div className={shopStyles.hoverOverlay}>
                          <Link to={`/shop/${itemCode}`} className={shopStyles.overlayQuickBtn}>
                            <Eye size={16} /> Quick Details
                          </Link>
                        </div>
                      </div>

                      <div className={shopStyles.productMeta}>
                        <div className={shopStyles.categoryCodeRow}>
                          <span className={shopStyles.categoryTag}>
                            {item.category || 'Design'}
                          </span>
                          <span className={shopStyles.designCodePill}>
                            #{item.designCode || itemCode}
                          </span>
                        </div>

                        <h3 className={shopStyles.productTitle}>
                          <Link to={`/shop/${itemCode}`}>{item.title}</Link>
                        </h3>

                        <div className={shopStyles.specChipsRow}>
                          <span className={shopStyles.specChip}>8x4 Ft Size</span>
                          <span className={shopStyles.specChip}>Artcam Relief</span>
                        </div>

                        <div className={shopStyles.priceRow}>
                          <div className={shopStyles.priceContainer}>
                            <span className={shopStyles.currencySymbol}>₹</span>
                            <span className={shopStyles.salePrice}>{item.price}</span>
                            {item.originalPrice && (
                              <span className={shopStyles.originalPrice}>₹{item.originalPrice}</span>
                            )}
                          </div>

                          <div className={shopStyles.cardActionsGroup}>
                            <a 
                              href={itemWhatsappUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className={shopStyles.whatsappDirectBtn}
                            >
                              Buy File
                            </a>

                            <Link 
                              to={`/shop/${itemCode}`} 
                              className={shopStyles.cartIconBtn}
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
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
