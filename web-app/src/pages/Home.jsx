import { ArrowRight, Play, CheckCircle2, Award, Zap, Ruler, Phone, Mail } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Home.module.css';
import { useContext, useState, useEffect } from 'react';
import { SiteContext } from '../context/SiteContext';

const Home = () => {
  const { siteData } = useContext(SiteContext);
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    if (!siteData?.testimonials || siteData.testimonials.length <= 1) return;
    const maxReviews = Math.min(siteData.testimonials.length, 5);
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % maxReviews);
    }, 5000);
    return () => clearInterval(interval);
  }, [siteData?.testimonials]);

  return (
    <div className={styles.homeContainer}>
      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.badge}>
            <span className={styles.pulseDot}></span>
            Premium CNC Craftsmanship
          </div>
          <h1 className="animate-fade-in" style={{ whiteSpace: 'pre-line' }}>
            {siteData?.heroTitle ? (
              <>
                {siteData.heroTitle.split('\n')[0]} <br />
                <span className="text-gradient">{siteData.heroTitle.split('\n').slice(1).join('\n')}</span>
              </>
            ) : (
              <>
                Premium CNC Cutting <br />
                & <span className="text-gradient">Carving</span>
              </>
            )}
          </h1>
          <p className="animate-fade-in" style={{ animationDelay: '0.2s', whiteSpace: 'pre-line' }}>
            {siteData?.heroSubtitle || 'Wood | Stone | Metal | Acrylic\nPrecision crafting with modern technology, fast delivery, and professional finishing.'}
          </p>
          <div className={`${styles.heroActions} animate-fade-in`} style={{ animationDelay: '0.4s' }}>
            <button className="btn btn-primary">
              Get Free Quote <ArrowRight size={18} />
            </button>
            <button className="btn btn-outline">
              <Play size={18} /> Watch Process
            </button>
          </div>
        </div>
      </section>

      <div style={{ height: '80px' }}></div>
      {/* 2. TRUST SECTION */}
      <section className={`container ${styles.trustSection}`}>
        <div className={`glass-card ${styles.trustCard}`}>
          <Award size={32} className="text-blue" />
          <div className={styles.trustInfo}>
            <h3 className="text-gold">500+</h3>
            <p>Projects Completed</p>
          </div>
        </div>
        <div className={`glass-card ${styles.trustCard}`}>
          <Ruler size={32} className="text-blue" />
          <div className={styles.trustInfo}>
            <h3 className="text-gold">0.1mm</h3>
            <p>High Precision Cutting</p>
          </div>
        </div>
        <div className={`glass-card ${styles.trustCard}`}>
          <Zap size={32} className="text-blue" />
          <div className={styles.trustInfo}>
            <h3 className="text-gold">On-Time</h3>
            <p>Delivery Guarantee</p>
          </div>
        </div>
        <div className={`glass-card ${styles.trustCard}`}>
          <CheckCircle2 size={32} className="text-blue" />
          <div className={styles.trustInfo}>
            <h3 className="text-gold">Premium</h3>
            <p>Finishing Quality</p>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="text-gradient">Our Premium Services</h2>
            <p>Transforming concepts into reality with state-of-the-art CNC technology.</p>
          </div>

          <div className={styles.servicesGrid}>
            {[
              { title: '2D CNC Cutting', desc: 'Precision cutting for MDF, Acrylic, and Plywood panels.' },
              { title: '3D CNC Carving', desc: 'Intricate 3D reliefs and artistic wood carving for luxury interiors.' },
              { title: 'Furniture Design', desc: 'Custom furniture components cut to exact specifications.' },
              { title: 'Interior Panels', desc: 'Decorative wall panels and room dividers with modern patterns.' },
              { title: 'Temple CNC Work', desc: 'Traditional and modern mandir designs with detailed craftsmanship.' },
              { title: 'Custom Crafting', desc: 'Bespoke wood projects tailored to your unique requirements.' }
            ].map((service, index) => (
              <div key={index} className={`glass-card ${styles.serviceCard}`}>
                <div className={styles.serviceIconWrapper}>
                  <div className={styles.serviceIconGlow}></div>
                  <CheckCircle2 size={24} className="text-blue" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <button className={styles.serviceLink} onClick={() => window.location.href='/services'}>
                  Learn more <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 4. HOW WE WORK SECTION */}
      <section id="process" className={`section ${styles.processSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="text-gradient">How We Work</h2>
            <p>A streamlined, professional process from concept to delivery.</p>
          </div>
          <div className={styles.processTimeline}>
            {[
              { title: 'Requirement Discussion', num: '01', desc: 'We analyze your specific design needs and project goals.' },
              { title: 'Planning & Estimation', num: '02', desc: 'Providing precise material selection and cost estimates.' },
              { title: 'Design Creation', num: '03', desc: 'Crafting the detailed 2D or 3D digital blueprints.' },
              { title: 'CNC Cutting Process', num: '04', desc: 'High-precision routing and cutting of the materials.' },
              { title: 'Finishing & Polish', num: '05', desc: 'Sanding, edge-banding, and polishing the final piece.' },
              { title: 'Packaging & Delivery', num: '06', desc: 'Secure packaging and safe transport to your site.' }
            ].map((step, index) => (
              <div key={index} className={styles.processStep}>
                <div className={styles.stepNumber}>{step.num}</div>
                <div className={styles.stepContentBlock}>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATS BANNER */}
      <section className={styles.statsBanner}>
        <div className={styles.statsOverlay}></div>
        <div className={`container ${styles.statsContent}`}>
          <h2>Completed Custom Projects</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <h3>150</h3>
              <p>Happy Customer</p>
            </div>
            <div className={styles.statItem}>
              <h3>180</h3>
              <p>Completed Projects</p>
            </div>
            <div className={styles.statItem}>
              <h3>1,800</h3>
              <p>Available Resources</p>
            </div>
            <div className={styles.statItem}>
              <h3>1,100</h3>
              <p>Subscribers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SACRED SPACE COLLECTION */}
      <section className="section bg-white">
        <div className={`container ${styles.sacredCollection}`}>
          <div className={styles.sacredImageWrapper}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', zIndex: 1 }}>
              <img src="/cnc_raw_wood.png" alt="Raw CNC Wood" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right' }} />
            </div>
            <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex: 1 }}>
              <img src="/cnc_finished_mandir.png" alt="Finished Mandir Design" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left' }} />
            </div>
            <div className={styles.sacredSliderLine}></div>
            <div className={styles.sacredSliderHandle}></div>
          </div>
          <div className={styles.sacredText}>
            <div className={styles.sacredSubtitle}>SACRED SPACE COLLECTION</div>
            <h2>Timeless craftsmanship<br/>for sacred spaces</h2>
            <p>At Jaipur Arts CNC, we showcase beautifully handcrafted mandirs through a virtual display.</p>
            <p>Explore custom designs, premium materials, and fine details from anywhere.</p>
            <p>See how our mandirs can create a peaceful, elegant, and sacred space in your home.</p>
            <button className={styles.sacredBtn} onClick={() => window.location.href='/services'}>
              VIEW MORE
            </button>
          </div>
        </div>
      </section>

      {/* 7. HOME PAGE GALLERY SECTION */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="text-gradient">Recent CNC Creations</h2>
            <p>A glimpse into our premium creations.</p>
          </div>
          <div className={styles.homeGalleryGrid}>
            {(siteData?.galleryImages?.slice(0, 6) || [1, 2, 3, 4, 5, 6]).map((item, index) => (
              <div key={index} className={`glass-card ${styles.homeGalleryCard}`}>
                <div className={styles.galleryImagePlaceholder} style={item.url ? { backgroundImage: `url(http://localhost:5000${item.url})`, backgroundSize: 'cover' } : {}}></div>
                <div className={styles.galleryContent}>
                  <h4>{item.title || `Premium Design ${item}`}</h4>
                  <p>{item.category || 'MDF Cutting • Interior'}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button className="btn btn-primary" onClick={() => window.location.href='/gallery'}>
              View Full Gallery <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIAL SECTION */}
      {siteData?.testimonials && siteData.testimonials.length > 0 && (
        <section className={styles.testimonialSection}>
          <div className="container">
            <div className={styles.stars}>
              {Array.from({ length: siteData.testimonials[currentReview]?.rating || 5 }).map((_, i) => (
                <svg key={`full-${i}`} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              ))}
              {Array.from({ length: 5 - (siteData.testimonials[currentReview]?.rating || 5) }).map((_, i) => (
                <svg key={`empty-${i}`} width="20" height="20" viewBox="0 0 24 24" fill="var(--color-border)" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              ))}
            </div>
            <p className={`${styles.quote} animate-fade-in`} key={`quote-${currentReview}`}>
              "{siteData.testimonials[currentReview]?.quote}"
            </p>
            <p className="animate-fade-in" key={`author-${currentReview}`} style={{ fontWeight: 'bold', marginTop: '20px' }}>
              - {siteData.testimonials[currentReview]?.clientName}
            </p>
            
            {siteData.testimonials.length > 1 && (
              <div className={styles.dots} style={{ marginTop: '30px' }}>
                {Array.from({ length: Math.min(siteData.testimonials.length, 5) }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`${styles.dot} ${idx === currentReview ? styles.active : ''}`}
                    onClick={() => setCurrentReview(idx)}
                    style={{ cursor: 'pointer' }}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 9. CONTACT SECTION */}
      <section id="contact" className={`section ${styles.contactSection}`}>
        <div className="container">
          <div className={styles.contactWrapper}>
            <div className={styles.contactInfo}>
              <h2 className="text-gradient">Let's Discuss Your Project</h2>
              <p>Ready to transform your space with premium CNC craftsmanship? Get in touch with us today.</p>
              <div className={styles.contactMethods}>
                <div className={styles.method}>
                  <div className={styles.methodIcon}><Phone size={24} className="text-blue" /></div>
                  <div>
                    <h4>Call Us Directly</h4>
                    <p>90010-21857</p>
                  </div>
                </div>
                <div className={styles.method}>
                  <div className={styles.methodIcon}><Mail size={24} className="text-blue" /></div>
                  <div>
                    <h4>Email Us</h4>
                    <p>jaipurartscnc@gmail.com</p>
                  </div>
                </div>
                <div className={styles.method}>
                  <div className={styles.methodIcon}><FaMapMarkerAlt size={24} className="text-blue" /></div>
                  <div>
                    <h4>Our Location</h4>
                    <p>Shop No. 2, Narayan Vihar Asarpura, Jaipur</p>
                  </div>
                </div>
                
                <div className={styles.socialFollowBlock}>
                  <h4>Follow Us</h4>
                  <div className={styles.socialButtonsRow}>
                    <a href="#" className={styles.socialBtn}><FaFacebookF size={20} /></a>
                    <a href="https://instagram.com/jaipurartscnc" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}><FaInstagram size={20} /></a>
                    <a href="https://wa.me/919001021857" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}><FaWhatsapp size={20} /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className={`glass-card ${styles.contactForm}`}>
              <h3>Request a Free Quote</h3>
              <form>
                <div className={styles.formGroup}>
                  <input type="text" placeholder="Your Name" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <input type="tel" placeholder="Mobile Number" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <select className={styles.formInput}>
                    <option value="">Select Project Type</option>
                    <option value="2d">2D Cutting</option>
                    <option value="3d">3D Carving</option>
                    <option value="furniture">Furniture</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <textarea placeholder="Project Details" rows="4" className={styles.formInput}></textarea>
                </div>
                <button type="button" className="btn btn-primary" style={{ width: '100%' }}>Send Request</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
