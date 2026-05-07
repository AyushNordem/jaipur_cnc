import { ArrowRight, CheckCircle2, Box, Layers, Scissors, Settings, Zap, Gem, XCircle, MapPin, MonitorPlay, Building, Globe2, Ruler, Armchair, Landmark, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import styles from './Services.module.css';

const Services = () => {
  return (
    <div className="page-container" style={{ minHeight: '100vh', paddingBottom: '0' }}>
      <PageHeader title="Our Services" breadcrumb="Our Services" />

      {/* Core Services Grid */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Premium Crafting Solutions</h2>
            <p style={{ color: 'var(--color-medium-gray)' }}>
              We blend traditional craftsmanship with cutting-edge CNC technology to deliver architectural and interior solutions of unmatched quality.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {[
              { title: '2D CNC Cutting', desc: 'Precision 2D cutting for flat panels, jali designs, and intricate patterns perfect for interior partitions and facades.', icon: <Ruler size={48} color="var(--color-accent)" strokeWidth={1.5} /> },
              { title: '3D CNC Carving', desc: 'Detailed 3D reliefs, murals, and textured panels carved into solid wood to create breathtaking focal points.', icon: <Box size={48} color="var(--color-accent)" strokeWidth={1.5} /> },
              { title: 'Furniture Design', desc: 'Custom cut parts for modern modular furniture, luxury interior pieces, and bespoke cabinet doors.', icon: <Armchair size={48} color="var(--color-accent)" strokeWidth={1.5} /> },
              { title: 'Temple CNC Work', desc: 'Traditional and contemporary Mandir designs with intricate detailing inspired by classical Indian architecture.', icon: <Landmark size={48} color="var(--color-accent)" strokeWidth={1.5} /> },
              { title: 'Decorative Panels', desc: 'Wall cladding, room dividers, and ceiling panels crafted to perfection for residential and commercial spaces.', icon: <Layers size={48} color="var(--color-accent)" strokeWidth={1.5} /> },
              { title: 'Custom Wood Crafting', desc: 'Bespoke wooden artifacts, personalized signage, and luxury decor elements for homes and businesses.', icon: <Hammer size={48} color="var(--color-accent)" strokeWidth={1.5} /> }
            ].map((service, index) => (
              <div key={index} className="glass-card" style={{ padding: '40px 32px' }}>
                <div style={{ marginBottom: '24px' }}>{service.icon}</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--color-black)' }}>{service.title}</h3>
                <p style={{ color: 'var(--color-medium-gray)', marginBottom: '24px', fontSize: '0.95rem', lineHeight: '1.6' }}>{service.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px', color: 'var(--color-dark)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><CheckCircle2 size={16} color="var(--color-accent)"/> Flawless Edges</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><CheckCircle2 size={16} color="var(--color-accent)"/> Custom Sizing</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--color-accent)"/> Scalable Production</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="section bg-light" style={{ backgroundColor: 'var(--color-light-gray)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Materials We Master</h2>
            <p style={{ color: 'var(--color-medium-gray)' }}>
              Our state-of-the-art routing machines are calibrated to flawlessly cut and carve a wide variety of premium materials.
            </p>
          </div>

          <div className={styles.materialsGrid}>
            <div className={styles.materialCard}>
              <div className={styles.materialIcon}><Layers size={32} color="var(--color-accent)" /></div>
              <h3>Wood & MDF</h3>
              <p>From solid Teak and Oak to high-density MDF and Plywood, we deliver pristine cuts without splintering.</p>
            </div>
            <div className={styles.materialCard}>
              <div className={styles.materialIcon}><Box size={32} color="var(--color-accent)" /></div>
              <h3>Acrylic & PVC</h3>
              <p>Perfect for modern signage, backlit panels, and sleek contemporary interior partitions.</p>
            </div>
            <div className={styles.materialCard}>
              <div className={styles.materialIcon}><Settings size={32} color="var(--color-accent)" /></div>
              <h3>Soft Metals</h3>
              <p>Precision routing for Aluminum, Brass, and Copper sheets for industrial and luxury accents.</p>
            </div>
            <div className={styles.materialCard}>
              <div className={styles.materialIcon}><Gem size={32} color="var(--color-accent)" /></div>
              <h3>Corian & Stone</h3>
              <p>Intricate carving and engraving on Corian solid surfaces and engineered stone materials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Grid */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Our Crafting Process</h2>
            <p style={{ color: 'var(--color-medium-gray)' }}>A streamlined, professional process from concept to delivery, ensuring precision at every step.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { title: 'Requirement Discussion', num: '01', desc: 'We analyze your specific design needs and project goals.' },
              { title: 'Planning & Estimation', num: '02', desc: 'Providing precise material selection and cost estimates.' },
              { title: 'Design Creation', num: '03', desc: 'Crafting the detailed 2D or 3D digital blueprints.' },
              { title: 'CNC Cutting Process', num: '04', desc: 'High-precision routing and cutting of the materials.' },
              { title: 'Finishing & Polish', num: '05', desc: 'Sanding, edge-banding, and polishing the final piece.' },
              { title: 'Packaging & Delivery', num: '06', desc: 'Secure packaging and safe transport to your site.' }
            ].map((step, index) => (
              <div key={index} className="glass-card" style={{ padding: '40px', position: 'relative', overflow: 'hidden', minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ position: 'absolute', top: '10px', right: '20px', fontFamily: 'var(--font-heading)', fontSize: '6rem', fontWeight: '700', color: 'rgba(0,0,0,0.03)', lineHeight: '1', zIndex: '1' }}>
                  {step.num}
                </div>
                <div style={{ position: 'relative', zIndex: '3' }}>
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '12px', color: 'var(--color-black)' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-medium-gray)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Banner */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className={styles.prepBanner}>
            <div className={styles.prepContent}>
              <h2>All We Need Is Your Space Dimensions And Pictures</h2>
              <p>Before starting the session, we require you to have your site pictures and dimensions ready. This allows us to understand your space and craft a suitable solution, ensuring we make the most out of our concept discovery session.</p>
              <Link to="/contact" className="btn btn-primary">
                Get Free Consultation <ArrowRight size={18} />
              </Link>
            </div>
            <div className={styles.prepImage} style={{ padding: 0, overflow: 'hidden' }}>
              <video 
                src="/Jaipur_Arts_CNC_promotional_video_202605071220.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section bg-white" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 20px' }}>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Why Choose Jaipur Arts CNC</h2>
            <p style={{ color: 'var(--color-medium-gray)' }}>See how our premium services compare to standard local suppliers.</p>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th>Features</th>
                  <th className={styles.highlight}>Jaipur Arts CNC</th>
                  <th>Local Suppliers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.featureName}>Design Customisation</td>
                  <td><CheckCircle2 size={18} className={styles.checkIcon} /> Trendy / Traditional or Any</td>
                  <td><XCircle size={18} className={styles.crossIcon} /> Limited options</td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Material Selection</td>
                  <td><CheckCircle2 size={18} className={styles.checkIcon} /> Premium</td>
                  <td><XCircle size={18} className={styles.crossIcon} /> May vary</td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Master Craftsmanship</td>
                  <td><CheckCircle2 size={18} className={styles.checkIcon} /> 25+ years' experience</td>
                  <td><XCircle size={18} className={styles.crossIcon} /> Inconsistent</td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Quality & Durability</td>
                  <td><CheckCircle2 size={18} className={styles.checkIcon} /> Assured</td>
                  <td><XCircle size={18} className={styles.crossIcon} /> Not sure</td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Assistance</td>
                  <td><CheckCircle2 size={18} className={styles.checkIcon} /> Project start to installation</td>
                  <td><XCircle size={18} className={styles.crossIcon} /> Limited</td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Working Expertise</td>
                  <td><CheckCircle2 size={18} className={styles.checkIcon} /> Specialised knowledge</td>
                  <td><XCircle size={18} className={styles.crossIcon} /> General knowledge</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>



      {/* The CNC Advantage (Dark Section) */}
      <section className={styles.featureSection}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: '1' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '20px', fontFamily: 'var(--font-heading)', color: 'var(--color-white)', letterSpacing: '1px' }}>The CNC Advantage</h2>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-white)', margin: '0 auto 24px', opacity: '0.3' }}></div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', lineHeight: '1.6' }}>
              Why modern architects and designers choose CNC crafting over traditional carpentry.
            </p>
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

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className={styles.ctaBanner}>
            <h2>Ready to Start Your Project?</h2>
            <p>Send us your design files or dimensions, and our team will provide a comprehensive quote and consultation.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-primary">
                Get a Free Quote <ArrowRight size={18} />
              </Link>
              <Link to="/gallery" className="btn btn-outline">
                View Creations
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
