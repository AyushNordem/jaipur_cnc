import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ArrowRight, Users, CheckCircle2, Briefcase, MapPin, ShoppingBag, Eye } from 'lucide-react';
import styles from './Home.module.css';
import shopStyles from './Shop.module.css';
import { Link } from 'react-router-dom';
import { SiteContext } from '../context/SiteContext';
import { API_BASE_URL, getFullMediaUrl } from '../config';

// Standalone component defined outside Home to prevent component unmounting/remounting on parent state updates
const ShimmerCreationItem = ({ src, alt, label }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={styles.gItem}>
      {!loaded && <div className={styles.shimmerBox} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease'
        }}
      />
      <span className={styles.gLabel}>{label}</span>
    </div>
  );
};

const Home = () => {
  const { siteData } = useContext(SiteContext);

  // Fallback data for gallery items
  const defaultGalleryItems = [
    { title: 'Jali Panel • MDF', category: '2D', fill: '#6E4A2E', pattern: true },
    { title: 'Relief • Pine', category: '3D', fill: '#A83D2C', path: true },
    { title: 'Name Board • Plywood', category: 'Name Board', fill: '#B8892B', circle: true },
    { title: 'Wall Décor • MDF', category: 'Wall Décor', fill: '#2E2116', triangle: true },
    { title: 'Room Partition • Ply', category: 'Room Partition', fill: '#6E4A2E', rect: true },
    { title: 'Rangoli Panel • MDF', category: 'Rangoli Panel', fill: '#A83D2C', doubleCircle: true },
    { title: 'Mandir Pillar • Teak Wood', category: 'Mandir Pillar', fill: '#8C5A37', pattern: true },
    { title: 'Floral Grille • HDHMR', category: 'Floral Grille', fill: '#5C3820', path: true }
  ];

  // Fallback data for customer reviews
  const defaultReviews = [
    {
      clientName: 'Amit Sharma',
      clientLocation: 'Jaipur',
      workType: '3D Mandir Relief',
      rating: 5,
      quote: 'The 3D carving detail on HDHMR board was absolutely breathtaking. Delivered on time in Jaipur!'
    },
    {
      clientName: 'Priya Verma',
      clientLocation: 'Udaipur',
      workType: 'Custom Jali Screen',
      rating: 5,
      quote: 'Exact dimensions as requested. Their CNC cutting precision on MDF sheets is second to none.'
    },
    {
      clientName: 'Vikram Singh',
      clientLocation: 'Jodhpur',
      workType: 'Teak Wooden Gate',
      rating: 5,
      quote: 'Highly skilled craftsmanship and transparent pricing. Great communication throughout the project.'
    },
    {
      clientName: 'Ramesh Patel',
      clientLocation: 'Ahmedabad',
      workType: 'Name Board & Wall Art',
      rating: 5,
      quote: 'Superb quality and clean finish. Will definitely order all our future CNC cutting jobs from Jaipur CNC!'
    },
    {
      clientName: 'Neha Mehta',
      clientLocation: 'Delhi',
      workType: 'PVC Partition Screen',
      rating: 5,
      quote: 'Beautiful waterproof PVC foam board cutting. Perfect fit for our dining room partition!'
    },
    {
      clientName: 'Sanjay Gupta',
      clientLocation: 'Kota',
      workType: 'MDF Grill Work',
      rating: 5,
      quote: 'Flawless precision cutting and quick turnaround. Highly recommended for custom CNC jobs!'
    }
  ];

  const [reviewsList, setReviewsList] = useState([]);
  const [creationsList, setCreationsList] = useState([]);
  const [shopProducts, setShopProducts] = useState([]);
  const [loadingCreations, setLoadingCreations] = useState(true);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isHoveredReviews, setIsHoveredReviews] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/reviews`)
      .then(res => {
        const data = res.data.data || res.data || [];
        setReviewsList(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('Error fetching reviews:', err));

    axios.get(`${API_BASE_URL}/api/gallery`)
      .then(res => {
        const data = res.data.data || res.data || [];
        setCreationsList(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('Error fetching creation gallery:', err))
      .finally(() => setLoadingCreations(false));

    axios.get(`${API_BASE_URL}/api/products`)
      .then(res => {
        const data = res.data.data || res.data || [];
        setShopProducts(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('Error fetching shop products for home:', err));
  }, []);

  // Auto scroll effect for reviews carousel
  useEffect(() => {
    const reviewCount = reviewsList.length > 0 ? reviewsList.length : 6;
    if (reviewCount <= 1 || isHoveredReviews) return;

    const timer = setInterval(() => {
      setActiveReviewIndex(prev => (prev + 1) % reviewCount);
    }, 4500);

    return () => clearInterval(timer);
  }, [reviewsList, isHoveredReviews]);

  const getFullImageUrl = (url) => getFullMediaUrl(url);

  const testimonials = reviewsList;

  const whatsappUrl = siteData?.whatsappUrl || 'https://wa.me/919001021857';

  return (
    <div className={styles.homeWrapper}>
      
      {/* ================= HERO ================= */}
      <section className={styles.heroSection}>
        {/* Full-width Video Background */}
        <div className={styles.heroVideoBg}>
          <video
            src="/cnc_header_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles.heroVideo}
          />
          {/* Left Shadow Overlay covering video smoothly on left */}
          <div className={styles.heroShadowOverlay}></div>
        </div>

        <div className={styles.heroWrap}>
          <div className={styles.heroGrid}>
            <div className={styles.heroLeftContent}>
              <div className={styles.eyebrowLight}>Jaipur, Rajasthan · Custom CNC Wood Cutting</div>
              <h1 className={styles.heroTitleLight}>
                We cut wood<br />into <em>art</em>, precisely.
              </h1>
              <p className={styles.ledeLight}>
                From intricate 2D jali patterns to sculpted 3D reliefs — MDF, HDHMR, Plywood, Solid Wood, Acrylic or PVC Foam, cut to your exact design and size.
              </p>
              <div className={styles.heroCta}>
                <Link to="/contact" className="btn btn-primary">Get a Custom Quote</Link>
                <Link to="/gallery" className="btn btn-outline" style={{ color: '#F2EADC', borderColor: 'rgba(242, 234, 220, 0.4)' }}>View Gallery</Link>
              </div>
              <div className={styles.heroStatsLight}>
                <div className={styles.hstatLight}>
                  <b>{siteData?.completedProjectsCount || '500+'}</b>
                  <span>Projects Cut</span>
                </div>
                <div className={styles.hstatLight}>
                  <b>3</b>
                  <span>Wood Types</span>
                </div>
                <div className={styles.hstatLight}>
                  <b>2D / 3D</b>
                  <span>Both Handled</span>
                </div>
                <div className={styles.hstatLight}>
                  <b>
                    {siteData?.yearsExperienceCount 
                      ? (siteData.yearsExperienceCount.toLowerCase().includes('yr') || siteData.yearsExperienceCount.toLowerCase().includes('year')
                          ? siteData.yearsExperienceCount 
                          : `${siteData.yearsExperienceCount} Years`)
                      : '7+ Years'}
                  </b>
                  <span>Experience</span>
                </div>
              </div>
            </div>

            {/* Signature Cut Floating Badge */}
            <div className={styles.heroRightFloating}>
              <div className={styles.heroTagLight}>
                <div className={styles.eyebrowTag}>
                  <span className={styles.tagDot}></span>
                  <span>Signature Precision</span>
                </div>
                <h3>Master CNC Carving</h3>
                <p>Custom 2D Jali screens, 3D mandir reliefs &amp; luxury architectural woodwork.</p>
                <div className={styles.tagBadge}>
                  <span>100% Custom Fit</span>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <div className={styles.strip}>
        <div className={styles.wrapFlex}>
          <div className={styles.stripItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            Precision cut to size
          </div>
          <div className={styles.stripItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            2D &amp; 3D patterns
          </div>
          <div className={styles.stripItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            MDF · Plywood · Pine
          </div>
          <div className={styles.stripItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            Bulk &amp; single-piece
          </div>
          <div className={styles.stripItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            Pan-India delivery
          </div>
        </div>
      </div>

      {/* ================= SERVICES ================= */}
      <section id="services" className={styles.sectionPadding}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>What We Do</div>
              <h2>Three ways we cut for you</h2>
            </div>
            <p>Send us a design, a photo, or just an idea — we'll turn it into a precise CNC-cut piece in the wood of your choice.</p>
          </div>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceNum}>01</div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="3" />
              </svg>
              <h3>2D Pattern Cutting</h3>
              <p>Jali screens, name boards, rangoli panels, wall décor — flat patterns cut with fine detail.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceNum}>02</div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <h3>3D Relief Carving</h3>
              <p>Layered, sculpted designs with depth and shadow — deities, portraits, decorative reliefs.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceNum}>03</div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <h3>Custom Design Work</h3>
              <p>Have a sketch or a reference photo? We design and cut it exactly to your size and finish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SHOP FEATURED PRODUCTS ================= */}
      {shopProducts && shopProducts.length > 0 && (
        <section id="shop" className={styles.sectionPadding} style={{ backgroundColor: 'var(--paper)' }}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div>
                <div className={styles.eyebrow}>Instant Download Shop</div>
                <h2>Featured CNC Design Files</h2>
              </div>
              <p>Download high quality 3D Artcam RLF, STL relief models &amp; 2D Vector cut files ready for instant purchase.</p>
            </div>

            <div className={shopStyles.productsGrid}>
              {shopProducts.slice(0, 4).map((product) => {
                const productId = product._id || product.designCode;
                const imgUrl = (product.images && product.images.length > 0) 
                  ? getFullMediaUrl(product.images[0]) 
                  : 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80';
                
                const phoneNum = (siteData?.contactPhone || '9001021857').replace(/[^0-9]/g, '');
                const whatsappOrderUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(`Hi Jaipur Art CNC, I want to buy Design File: ${product.title} (${product.designCode || productId}) for ₹${product.price}`)}`;

                return (
                  <div key={productId} className={shopStyles.productCard}>
                    
                    <div className={shopStyles.imageBoxWrapper}>
                      {product.discountPercent && (
                        <span className={shopStyles.discountBadge}>
                          -{product.discountPercent}% OFF
                        </span>
                      )}

                      <Link to={`/shop/${productId}`} className={shopStyles.imageBox}>
                        <img src={imgUrl} alt={product.title} loading="lazy" />
                      </Link>

                      <div className={shopStyles.hoverOverlay}>
                        <Link to={`/shop/${productId}`} className={shopStyles.overlayQuickBtn}>
                          <Eye size={16} /> Quick Details
                        </Link>
                      </div>
                    </div>

                    <div className={shopStyles.productMeta}>
                      <div className={shopStyles.categoryCodeRow}>
                        <span className={shopStyles.categoryTag}>
                          {product.category || '3D Design'}
                        </span>
                        <span className={shopStyles.designCodePill}>
                          #{product.designCode || productId}
                        </span>
                      </div>

                      <h3 className={shopStyles.productTitle}>
                        <Link to={`/shop/${productId}`}>{product.title}</Link>
                      </h3>

                      <div className={shopStyles.specChipsRow}>
                        <span className={shopStyles.specChip}>8x4 Ft Size</span>
                        <span className={shopStyles.specChip}>Artcam Relief</span>
                      </div>

                      <div className={shopStyles.priceRow}>
                        <div className={shopStyles.priceContainer}>
                          <span className={shopStyles.currencySymbol}>₹</span>
                          <span className={shopStyles.salePrice}>{product.price}</span>
                          {product.originalPrice && (
                            <span className={shopStyles.originalPrice}>₹{product.originalPrice}</span>
                          )}
                        </div>

                        <div className={shopStyles.cardActionsGroup}>
                          <a 
                            href={whatsappOrderUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={shopStyles.whatsappDirectBtn}
                            title="Instant Order on WhatsApp"
                          >
                            Buy File
                          </a>

                          <Link 
                            to={`/shop/${productId}`} 
                            className={shopStyles.cartIconBtn}
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

            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <Link to="/shop" className="btn btn-primary">
                Explore All Shop Designs <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ================= WOOD TYPES ================= */}
      <section id="wood" className={`${styles.sectionPadding} ${styles.woodSection}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>Materials</div>
              <h2>Choose your wood</h2>
            </div>
            <p>Each material suits a different look and use — we'll help you pick the right one for your project.</p>
          </div>
          <div className={styles.woodGrid}>
            <div className={styles.woodCard}>
              <div className={styles.woodSwatch}>
                <img src="/MDF.png" alt="MDF Board" />
              </div>
              <div className={styles.woodBody}>
                <h3>MDF</h3>
                <p>Smooth, uniform surface — best for decorative jali, mandirs, and intricate wall panels.</p>
                <div className={styles.woodTags}>
                  <span>Smooth Finish</span>
                  <span>Affordable</span>
                </div>
              </div>
            </div>
            <div className={styles.woodCard}>
              <div className={styles.woodSwatch}>
                <img src="/HDHMR Board.png" alt="HDHMR Board" />
              </div>
              <div className={styles.woodBody}>
                <h3>HDHMR Board</h3>
                <p>High Density High Moisture Resistant — ideal for premium furniture and durable mandirs.</p>
                <div className={styles.woodTags}>
                  <span>Water Resistant</span>
                  <span>Extremely Strong</span>
                </div>
              </div>
            </div>
            <div className={styles.woodCard}>
              <div className={styles.woodSwatch}>
                <img src="/Plywood.png" alt="Plywood" />
              </div>
              <div className={styles.woodBody}>
                <h3>Plywood</h3>
                <p>Cross-layered veneer sheet — best for structural furniture, cabinets and sub-bases.</p>
                <div className={styles.woodTags}>
                  <span>High Strength</span>
                  <span>Lightweight</span>
                </div>
              </div>
            </div>
            <div className={styles.woodCard}>
              <div className={styles.woodSwatch}>
                <img src="/Solid Wood.png" alt="Solid Wood" />
              </div>
              <div className={styles.woodBody}>
                <h3>Solid Wood</h3>
                <p>Teak, Sheesham, Pine — premium natural logs suited to luxury temples and high-end furniture.</p>
                <div className={styles.woodTags}>
                  <span>Natural Look</span>
                  <span>Generational Life</span>
                </div>
              </div>
            </div>
            <div className={styles.woodCard}>
              <div className={styles.woodSwatch}>
                <img src="/Acrylic Sheet.png" alt="Acrylic Sheet" />
              </div>
              <div className={styles.woodBody}>
                <h3>Acrylic Sheet</h3>
                <p>Glossy polymer sheet — best for custom name plates, branding logos, and backlit inserts.</p>
                <div className={styles.woodTags}>
                  <span>Glossy Finish</span>
                  <span>Colour Varieties</span>
                </div>
              </div>
            </div>
            <div className={styles.woodCard}>
              <div className={styles.woodSwatch}>
                <img src="/PVC Foam Board.png" alt="PVC Foam Board" />
              </div>
              <div className={styles.woodBody}>
                <h3>PVC Foam Board</h3>
                <p>Lightweight polymer foam — waterproof sheets best for signs and damp-resistant items.</p>
                <div className={styles.woodTags}>
                  <span>100% Waterproof</span>
                  <span>Termite Proof</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section id="gallery" className={styles.sectionPadding}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>Recent Work</div>
              <h2>A few pieces we've cut</h2>
            </div>
            <p>A small sample from our portfolio of premium CNC carving and custom cutting.</p>
          </div>
          <div className={styles.galleryGrid}>
            {loadingCreations ? (
              Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className={styles.gItemShimmer}>
                  <div className={styles.shimmerBox} />
                </div>
              ))
            ) : (() => {
              // Combine creationsList with defaultGalleryItems up to 8 items so all 8 grid slots are filled with 0 blank spaces
              const combinedList = [...creationsList];
              let defaultIdx = 0;
              while (combinedList.length < 8 && defaultIdx < defaultGalleryItems.length) {
                combinedList.push(defaultGalleryItems[defaultIdx]);
                defaultIdx++;
              }
              const displayList = combinedList.slice(0, 8);

              return displayList.map((item, idx) => {
                if (item.imageUrl) {
                  return (
                    <ShimmerCreationItem
                      key={item._id || idx}
                      src={getFullImageUrl(item.imageUrl)}
                      alt={item.title || 'CNC Creation'}
                      label={`${item.title} ${item.category ? `• ${item.category}` : ''}`}
                    />
                  );
                }
                return (
                  <div key={idx} className={styles.gItem}>
                    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
                      <rect width="200" height="200" fill={item.fill || '#6E4A2E'} />
                      {item.pattern && (
                        <>
                          <defs>
                            <pattern id={`galleryPat_${idx}`} width="28" height="28" patternUnits="userSpaceOnUse">
                              <circle cx="14" cy="14" r="9" fill="none" stroke="#F2EADC" strokeWidth="1.2" opacity="0.6" />
                            </pattern>
                          </defs>
                          <rect width="200" height="200" fill={`url(#galleryPat_${idx})`} />
                        </>
                      )}
                      {item.path && <path d="M0 100 100 0 200 100 100 200Z" fill="#F2EADC" opacity="0.18" />}
                      {item.circle && <circle cx="100" cy="100" r="55" fill="none" stroke="#2E2116" strokeWidth="2" opacity="0.4" />}
                      {item.triangle && <path d="M20 180 L100 20 L180 180 Z" fill="none" stroke="#B8892B" strokeWidth="2" />}
                      {item.rect && <rect x="40" y="40" width="120" height="120" fill="none" stroke="#F2EADC" strokeWidth="1.4" opacity="0.5" />}
                      {item.doubleCircle && (
                        <>
                          <circle cx="60" cy="60" r="14" fill="#F2EADC" opacity="0.3" />
                          <circle cx="140" cy="140" r="14" fill="#F2EADC" opacity="0.3" />
                        </>
                      )}
                    </svg>
                    <span className={styles.gLabel}>{item.title}</span>
                  </div>
                );
              });
            })()}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/gallery" className="btn btn-outline">
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className={`${styles.sectionPadding} ${styles.process}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>How Ordering Works</div>
              <h2>From idea to finished cut</h2>
            </div>
          </div>
          <div className={styles.processGrid}>
            <div className={styles.pStep}>
              <div className={styles.pNum}>01</div>
              <h3>Share your design</h3>
              <p>Send a photo, sketch, or file — or tell us what you have in mind.</p>
            </div>
            <div className={styles.pStep}>
              <div className={styles.pNum}>02</div>
              <h3>Get a quote</h3>
              <p>We confirm wood type, size and finish, and give you a price and timeline.</p>
            </div>
            <div className={styles.pStep}>
              <div className={styles.pNum}>03</div>
              <h3>We cut it</h3>
              <p>Your piece is cut on our CNC machine and finished by hand where needed.</p>
            </div>
            <div className={styles.pStep}>
              <div className={styles.pNum}>04</div>
              <h3>Delivered to you</h3>
              <p>Packed carefully and shipped, or ready for pickup in Jaipur.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      {(() => {
        const baseReviews = (testimonials && testimonials.length > 0) ? testimonials : defaultReviews;
        if (!baseReviews || baseReviews.length === 0) return null;

        // Multiply array if length < 3, then clone first 3 items onto end to guarantee 0 blank slots
        const repeatCount = baseReviews.length < 3 ? 3 : 1;
        const normalizedList = Array(repeatCount).fill(baseReviews).flat();
        const displayReviews = [...normalizedList, ...normalizedList.slice(0, 3)];

        const currentIndex = activeReviewIndex % normalizedList.length;
        const cardsInView = windowWidth <= 600 ? 1 : (windowWidth <= 900 ? 2 : 3);
        const slideStep = 100 / cardsInView;

        return (
          <section id="reviews" className={styles.sectionPadding}>
            <div className={styles.wrap}>
              <div className={styles.sectionHead}>
                <div>
                  <div className={styles.eyebrow}>Customer Reviews</div>
                  <h2>What people say</h2>
                </div>
                <p>Real feedback from our clients across Rajasthan and India.</p>
              </div>

              {/* 3-Card Auto-Scrolling Carousel Container */}
              <div 
                className={styles.carouselWrapper3}
                onMouseEnter={() => setIsHoveredReviews(true)}
                onMouseLeave={() => setIsHoveredReviews(false)}
              >
                <div 
                  className={styles.carouselTrack3}
                  style={{ 
                    transform: `translateX(-${currentIndex * slideStep}%)`,
                    transition: 'transform 0.5s ease-in-out'
                  }}
                >
                  {displayReviews.map((item, idx) => {
                    const isCenter = cardsInView === 1 ? (idx === currentIndex) : (idx === currentIndex + 1);
                    return (
                      <div key={idx} className={styles.carouselSlide3}>
                        <div className={`${styles.reviewCard3} ${isCenter ? styles.centerCard : ''}`}>
                          <div>
                            <div className={styles.stars}>
                              {'★'.repeat(item.rating || 5)}
                            </div>
                            <p className={styles.reviewQuote3}>"{item.quote || item.text}"</p>
                          </div>

                          <div className={styles.reviewer}>
                            <div className={styles.rAvatar} style={{ overflow: 'hidden' }}>
                              {item.clientAvatar ? (
                                <img src={item.clientAvatar} alt={item.clientName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                (item.clientName || 'C').charAt(0)
                              )}
                            </div>
                            <div>
                              <div className={styles.rName}>{item.clientName}</div>
                              {item.clientLocation && <div className={styles.rLoc}>{item.clientLocation}</div>}
                              {item.workType && <div className={styles.rWork}>{item.workType}</div>}
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Dot Indicators */}
                {normalizedList.length > 1 && (
                  <div className={styles.indicatorContainer}>
                    {normalizedList.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveReviewIndex(idx)}
                        className={`${styles.dotIndicator} ${currentIndex === idx ? styles.activeDot : ''}`}
                        aria-label={`Go to review ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </section>
        );
      })()}

      {/* ================= COMPLETED CUSTOM PROJECTS METRICS BANNER ================= */}
      <section className={styles.darkMetricsSection}>
        <div className={styles.darkMetricsOverlay}></div>
        <div className={styles.wrap}>
          <div className={styles.darkMetricsContent}>
            <h2 className={styles.darkMetricsTitle}>Completed Custom Projects</h2>
            <div className={styles.darkMetricsGrid}>
              
              <div className={styles.darkMetricItem}>
                <div className={styles.darkMetricNumber}>
                  {siteData?.completedProjectsCount || '950+'}
                </div>
                <div className={styles.darkMetricLabel}>Projects</div>
              </div>

              <div className={styles.darkMetricItem}>
                <div className={styles.darkMetricNumber}>
                  {siteData?.happyCustomersCount || '350+'}
                </div>
                <div className={styles.darkMetricLabel}>Happy Customers</div>
              </div>

              <div className={styles.darkMetricItem}>
                <div className={styles.darkMetricNumber}>
                  {siteData?.yearsExperienceCount 
                    ? (siteData.yearsExperienceCount.toLowerCase().includes('yr') || siteData.yearsExperienceCount.toLowerCase().includes('year')
                        ? siteData.yearsExperienceCount 
                        : `${siteData.yearsExperienceCount}+`)
                    : '25+'}
                </div>
                <div className={styles.darkMetricLabel}>Years Experience</div>
              </div>

              <div className={styles.darkMetricItem}>
                <div className={styles.darkMetricNumber}>
                  {siteData?.totalBranchesCount || '3+'}
                </div>
                <div className={styles.darkMetricLabel}>Total Branches</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section style={{ paddingTop: '64px', paddingBottom: '96px' }}>
        <div className={styles.wrap}>
          <div className={styles.ctaBanner}>
            <h2>Have a design in mind? Let's cut it, precisely.</h2>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', zIndex: 2 }}>
              <Link to="/contact" className="btn btn-primary" style={{ background: 'var(--paper)', color: 'var(--brick)' }}>
                Get a Custom Quote
              </Link>
              <a href={whatsappUrl} className="btn btn-outline" style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHATSAPP FLOAT ================= */}
      <a className={styles.waFloat} href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.66 1.44 5.24L2 22l4.98-1.53a9.87 9.87 0 0 0 5.06 1.38h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.13.09-1.83-.11-.42-.13-.96-.3-1.65-.6-2.9-1.25-4.79-4.16-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.28.57-.35.76-.35h.55c.18 0 .42-.07.65.5.24.6.82 2.06.9 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.35 1.44.3.15.47.13.65-.08.17-.2.73-.85.93-1.15.2-.3.4-.24.65-.15.26.1 1.65.78 1.93.92.29.15.48.22.55.34.07.13.07.72-.17 1.4z"/></svg>
      </a>

    </div>
  );
};

export default Home;
