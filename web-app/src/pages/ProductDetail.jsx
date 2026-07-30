import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Eye, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { API_BASE_URL, getFullMediaUrl } from '../config';
import { SiteContext } from '../context/SiteContext';
import styles from './ProductDetail.module.css';

// Fallback details
const SAMPLE_DETAILS = {
  "3DWP-3028": {
    _id: "3DWP-3028",
    title: "3DWP-3028 3D Wall Panel 3D Model 8x4 Size CNC Design Artcam File RLF & STL 3D Model Download",
    designCode: "3DWP-3028",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    fileFormats: ["RLF", "STL"],
    software: ["Artcam 2009", "Artcam 2008", "Artcam 2007", "Artcam 2018", "3Ds Max", "JDPaint", "AutoCAD", "Maya"],
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"
    ],
    description: `Get design files on WhatsApp immediately after purchase.

Files - RLF File (Artcam Relief File For All Version Of Artcam)
Files - STL File

RLF Files Can Be open in - Artcam 2009, Artcam 2008 Artcam 2007 And Artcam 2018.
STL Files Can Be open in - 3Ds Max, JDPaint, AutoCAD, Maya And Other All 3D Modeling Software.

Size - Adjustable
Download Link Time - Get on WhatsApp after purchase.

If Any error in files, Please request on Whatsapp Helpline We will provide Files within 24 Hr.

This is a Computer Digital File not any actual product.
Return Of order is not Accepted Because product is Copy-able, Please Read all details before purchase.`,
    isDigital: true,
    inStock: true
  }
};

const FALLBACK_SIMILAR = [
  {
    _id: "3DWP-3027",
    title: "3DWP-3027 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3027",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"]
  },
  {
    _id: "3DWP-3026",
    title: "3DWP-3026 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3026",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    images: ["https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=80"]
  },
  {
    _id: "3DWP-3024",
    title: "3DWP-3024 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3024",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80"]
  },
  {
    _id: "3DWP-3023",
    title: "3DWP-3023 3D Wall Panel 3D Model 8x4",
    designCode: "3DWP-3023",
    category: "3D Wall Panel",
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    images: ["https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&q=80"]
  }
];

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
        } else if (SAMPLE_DETAILS[id]) {
          setProduct(SAMPLE_DETAILS[id]);
        } else {
          setProduct({
            _id: id,
            title: `${id} 3D Wall Panel 3D Model 8x4 Size CNC Design Artcam File RLF & STL`,
            designCode: id,
            category: "3D Wall Panel",
            price: 480,
            originalPrice: 500,
            discountPercent: 4,
            fileFormats: ["RLF", "STL"],
            images: [
              "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
            ],
            description: SAMPLE_DETAILS["3DWP-3028"].description,
            isDigital: true,
            inStock: true
          });
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setProduct(SAMPLE_DETAILS[id] || SAMPLE_DETAILS["3DWP-3028"]);
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
        console.error("Failed to load similar products:", err);
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
        Loading Model details...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>Product Not Found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '16px' }}>Back to Shop</Link>
      </div>
    );
  }

  const phoneNum = (siteData?.contactPhone || '9001021857').replace(/[^0-9]/g, '');
  const whatsappMessage = `Hi Jaipur Art CNC, I want to purchase / download the 3D Design File: ${product.title} (Code: ${product.designCode || product._id}) at ₹${product.price}`;
  const whatsappUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(whatsappMessage)}`;

  const imagesList = (product.images && product.images.length > 0) 
    ? product.images.map(img => getFullMediaUrl(img)) 
    : [
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80"
      ];

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMessage('');
    }, 4000);
  };

  const listSimilar = similarProducts.length > 0 ? similarProducts : FALLBACK_SIMILAR;

  return (
    <div className={styles.detailPage}>
      <PageHeader 
        title={product.title} 
        subtitle={`Design Code: ${product.designCode || product._id} | Artcam RLF & STL 3D Relief File`}
        breadcrumb={`Shop / Designs / ${product.designCode || 'Product'}`}
      />

      <section className="section py-8">
        <div className="container">
          
          <Link to="/shop" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Designs Shop
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
            </div>

            {/* Right Information Column */}
            <div className={styles.infoColumn}>
              <div className={styles.categoryBreadcrumb}>
                Designs, {product.category || '3D Wall Panel'}
              </div>

              <h1 className={styles.productTitle}>
                {product.title}
              </h1>

              {/* Product Specifications list */}
              <div className={styles.specList}>
                <p><strong>Product</strong> – Artcam 3D Model Relief &amp; STL File (Digital File Only)</p>
                <p><strong>Design Code</strong> – {product.designCode || product._id}</p>
                <p><strong>Under Category</strong> – {product.category || '3D Wall Panel Designs Model (3DWP)'}</p>
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
                      <p><strong>Files</strong> – RLF File (Artcam Relief File For All Version Of Artcam)</p>
                      <p><strong>Files</strong> – STL File</p>
                      <p><strong>Size</strong> – Adjustable</p>
                    </>
                  )}

                  <div className={styles.categoriesFooter}>
                    <strong>Categories:</strong> Designs, {product.category || '3D Wall Panel'}
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
              {listSimilar.map(item => {
                const itemCode = item._id || item.designCode;
                const itemImg = item.images && item.images.length > 0 
                  ? getFullMediaUrl(item.images[0]) 
                  : 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80';
                
                const itemWhatsappUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(`Hi Jaipur Art CNC, I want to order Design: ${item.title} (${item.designCode || itemCode}) for ₹${item.price}`)}`;

                return (
                  <div key={itemCode} className={styles.productCard}>
                    <div className={styles.imageBoxWrapper}>
                      {item.discountPercent && (
                        <span className={styles.discountBadge}>
                          -{item.discountPercent}% OFF
                        </span>
                      )}

                      <Link to={`/shop/${itemCode}`} className={styles.imageBox}>
                        <img src={itemImg} alt={item.title} loading="lazy" />
                      </Link>

                      <div className={styles.hoverOverlay}>
                        <Link to={`/shop/${itemCode}`} className={styles.overlayQuickBtn}>
                          <Eye size={16} /> Quick Details
                        </Link>
                      </div>
                    </div>

                    <div className={styles.productMeta}>
                      <div className={styles.categoryCodeRow}>
                        <span className={styles.categoryTag}>
                          {item.category || 'Design'}
                        </span>
                        <span className={styles.designCodePill}>
                          #{item.designCode || itemCode}
                        </span>
                      </div>

                      <h3 className={styles.productTitle}>
                        <Link to={`/shop/${itemCode}`}>{item.title}</Link>
                      </h3>

                      <div className={styles.specChipsRow}>
                        <span className={styles.specChip}>8x4 Ft Size</span>
                        <span className={styles.specChip}>Artcam Relief</span>
                      </div>

                      <div className={styles.priceRow}>
                        <div className={styles.priceContainer}>
                          <span className={styles.currencySymbol}>₹</span>
                          <span className={styles.salePrice}>{item.price}</span>
                          {item.originalPrice && (
                            <span className={styles.originalPrice}>₹{item.originalPrice}</span>
                          )}
                        </div>

                        <div className={styles.cardActionsGroup}>
                          <a 
                            href={itemWhatsappUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.whatsappDirectBtn}
                          >
                            Buy File
                          </a>

                          <Link 
                            to={`/shop/${itemCode}`} 
                            className={styles.cartIconBtn}
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

        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
