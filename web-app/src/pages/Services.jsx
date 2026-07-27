import { ArrowRight, CheckCircle2, Box, Layers, Scissors, Settings, Zap, Gem, XCircle, Ruler, Armchair, Landmark, Hammer } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { SiteContext } from '../context/SiteContext';
import styles from './Services.module.css';

const Services = () => {
  const { siteData } = useContext(SiteContext);
  const whatsappUrl = siteData?.whatsappUrl || 'https://wa.me/919001021857';

  return (
    <div className={styles.servicesWrapper}>
      <PageHeader title="Our Services" breadcrumb="Our Services" />

      {/* ================= CORE SERVICES ================= */}
      <section className={styles.sectionPadding}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>Our Services</div>
              <h2>Premium Crafting Solutions</h2>
            </div>
            <p>
              We blend traditional craftsmanship with cutting-edge CNC technology to deliver architectural and interior wood-cutting solutions of unmatched quality.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {[
              { title: '2D CNC Cutting', desc: 'Precision 2D cutting for flat panels, jali designs, and intricate patterns perfect for interior partitions and facades.', icon: <Ruler size={38} /> },
              { title: '3D CNC Carving', desc: 'Detailed 3D reliefs, murals, and textured panels carved into solid wood to create breathtaking focal points.', icon: <Box size={38} /> },
              { title: 'Furniture Design', desc: 'Custom cut parts for modern modular furniture, luxury interior pieces, and bespoke cabinet doors.', icon: <Armchair size={38} /> },
              { title: 'Temple CNC Work', desc: 'Traditional and contemporary Mandir designs with intricate detailing inspired by classical Indian architecture.', icon: <Landmark size={38} /> },
              { title: 'Decorative Panels', desc: 'Wall cladding, room dividers, and ceiling panels crafted to perfection for residential and commercial spaces.', icon: <Layers size={38} /> },
              { title: 'Custom Wood Crafting', desc: 'Bespoke wooden artifacts, personalized signage, and luxury decor elements for homes and businesses.', icon: <Hammer size={38} /> }
            ].map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceNum}>0{index + 1}</div>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <ul className={styles.bulletList}>
                  <li><CheckCircle2 size={14} className={styles.checkBullet} /> Flawless Edges</li>
                  <li><CheckCircle2 size={14} className={styles.checkBullet} /> Custom Sizing</li>
                  <li><CheckCircle2 size={14} className={styles.checkBullet} /> Scalable Production</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MATERIALS (Dark Section) ================= */}
      <section className={`${styles.sectionPadding} ${styles.darkSection}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow} style={{ color: 'var(--brass)' }}>Materials</div>
              <h2 style={{ color: 'var(--cream)' }}>Materials We Master</h2>
            </div>
            <p style={{ color: '#C7B9A6' }}>
              Our state-of-the-art routing machines are calibrated to flawlessly cut and carve a wide variety of premium materials.
            </p>
          </div>

          <div className={styles.materialsGrid}>
            {[
              { title: 'Wood & MDF', desc: 'From solid Teak and Oak to high-density MDF and Plywood, we deliver pristine cuts without splintering.', icon: <Layers size={32} /> },
              { title: 'Acrylic & PVC', desc: 'Perfect for modern signage, backlit panels, and sleek contemporary interior partitions.', icon: <Box size={32} /> },
              { title: 'Soft Metals', desc: 'Precision routing for Aluminum, Brass, and Copper sheets for industrial and luxury accents.', icon: <Settings size={32} /> },
              { title: 'Corian & Stone', desc: 'Intricate carving and engraving on Corian solid surfaces and engineered stone materials.', icon: <Gem size={32} /> }
            ].map((material, index) => (
              <div key={index} className={styles.materialCard}>
                <div className={styles.materialIcon}>{material.icon}</div>
                <h3>{material.title}</h3>
                <p>{material.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className={styles.sectionPadding}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>Timeline</div>
              <h2>Our Crafting Process</h2>
            </div>
            <p>A streamlined, professional process from concept to delivery, ensuring precision at every step.</p>
          </div>

          <div className={styles.processGrid}>
            {[
              { title: 'Requirement Discussion', num: '01', desc: 'We analyze your specific design needs and project goals.' },
              { title: 'Planning & Estimation', num: '02', desc: 'Providing precise material selection and cost estimates.' },
              { title: 'Design Creation', num: '03', desc: 'Crafting the detailed 2D or 3D digital blueprints.' },
              { title: 'CNC Cutting Process', num: '04', desc: 'High-precision routing and cutting of the materials.' },
              { title: 'Finishing & Polish', num: '05', desc: 'Sanding, edge-banding, and polishing the final piece.' },
              { title: 'Packaging & Delivery', num: '06', desc: 'Secure packaging and safe transport to your site.' }
            ].map((step, index) => (
              <div key={index} className={styles.processCard}>
                <div className={styles.processNum}>{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PREPARATION BANNER ================= */}
      <section className={styles.sectionPadding} style={{ paddingTop: '0' }}>
        <div className={styles.wrap}>
          <div className={styles.prepBanner}>
            <div className={styles.prepContent}>
              <h2>All We Need Is Your Space Dimensions And Pictures</h2>
              <p>Before starting the session, we require you to have your site pictures and dimensions ready. This allows us to understand your space and craft a suitable solution, ensuring we make the most out of our concept discovery session.</p>
              <Link to="/contact" className="btn btn-primary">
                Get Free Consultation <ArrowRight size={16} />
              </Link>
            </div>
            <div className={styles.prepImage}>
              <video 
                src="/Jaipur_Arts_CNC_promotional_video_202605071220.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMPARISON TABLE ================= */}
      <section className={styles.sectionPadding} style={{ paddingTop: '0' }}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>Comparison</div>
              <h2>Why Choose Jaipur Arts CNC</h2>
            </div>
            <p>See how our premium services compare to standard local suppliers.</p>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th>Features</th>
                  <th className={styles.highlightHeader}>Jaipur Arts CNC</th>
                  <th>Local Suppliers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.featureName}>Design Customisation</td>
                  <td><CheckCircle2 size={16} className={styles.checkIcon} /> Trendy / Traditional or Any</td>
                  <td><XCircle size={16} className={styles.crossIcon} /> Limited options</td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Material Selection</td>
                  <td><CheckCircle2 size={16} className={styles.checkIcon} /> Premium</td>
                  <td><XCircle size={16} className={styles.crossIcon} /> May vary</td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Master Craftsmanship</td>
                  <td><CheckCircle2 size={16} className={styles.checkIcon} /> 25+ years' experience</td>
                  <td><XCircle size={16} className={styles.crossIcon} /> Inconsistent</td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Quality & Durability</td>
                  <td><CheckCircle2 size={16} className={styles.checkIcon} /> Assured</td>
                  <td><XCircle size={16} className={styles.crossIcon} /> Not sure</td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Assistance</td>
                  <td><CheckCircle2 size={16} className={styles.checkIcon} /> Project start to installation</td>
                  <td><XCircle size={16} className={styles.crossIcon} /> Limited</td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Working Expertise</td>
                  <td><CheckCircle2 size={16} className={styles.checkIcon} /> Specialised knowledge</td>
                  <td><XCircle size={16} className={styles.crossIcon} /> General knowledge</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= THE CNC ADVANTAGE (Dark Section) ================= */}
      <section className={`${styles.sectionPadding} ${styles.darkSection}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead} style={{ textAlign: 'center', justifyContent: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={styles.eyebrow} style={{ color: 'var(--brass)' }}>Advantage</div>
              <h2 style={{ color: 'var(--cream)', fontSize: '3rem', letterSpacing: '1px', textAlign: 'center' }}>The CNC Advantage</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', lineHeight: '1.6', marginTop: '14px', maxWidth: '600px', textAlign: 'center' }}>
                Why modern architects and designers choose CNC crafting over traditional carpentry.
              </p>
            </div>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureBlock}>
              <div className={styles.featureIconWrapper}>
                <Scissors size={32} className={styles.featureBlockIcon} />
              </div>
              <h4>Micron-Level Precision</h4>
              <p>Computer-controlled routing ensures every curve, angle, and joint is cut to exact digital specifications, eliminating human error.</p>
            </div>
            <div className={styles.featureBlock}>
              <div className={styles.featureIconWrapper}>
                <Zap size={32} className={styles.featureBlockIcon} />
              </div>
              <h4>Unmatched Speed</h4>
              <p>What takes a master carpenter weeks to carve by hand, our high-end machines can replicate flawlessly in a matter of hours.</p>
            </div>
            <div className={styles.featureBlock}>
              <div className={styles.featureIconWrapper}>
                <Box size={32} className={styles.featureBlockIcon} />
              </div>
              <h4>Infinite Complexity</h4>
              <p>If you can design it on a computer, we can cut it. There are no limitations to the intricacy of the patterns we can produce.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className={styles.sectionPadding}>
        <div className={styles.wrap}>
          <div className={styles.ctaBanner}>
            <h2>Ready to Start Your Project?</h2>
            <p>Send us your design files or dimensions, and our team will provide a comprehensive quote and consultation.</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', zIndex: 2 }}>
              <Link to="/contact" className="btn btn-primary" style={{ background: 'var(--paper)', color: 'var(--brick)' }}>
                Get a Free Quote <ArrowRight size={16} />
              </Link>
              <Link to="/gallery" className="btn btn-outline" style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}>
                View Creations
              </Link>
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

export default Services;
