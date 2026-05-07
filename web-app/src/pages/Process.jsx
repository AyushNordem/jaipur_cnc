import { ArrowRight, CheckCircle2, XCircle, MapPin, MonitorPlay, Building, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import styles from './Process.module.css';

const Process = () => {
  return (
    <div className="page-container" style={{ minHeight: '100vh', backgroundColor: 'var(--color-light-gray)', paddingBottom: '80px' }}>
      <PageHeader title="How We Work" breadcrumb="Process" />

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


    </div>
  );
};

export default Process;
