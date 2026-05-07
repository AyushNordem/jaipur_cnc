import { useContext } from 'react';
import { SiteContext } from '../context/SiteContext';
import PageHeader from '../components/PageHeader';
import { Star, User } from 'lucide-react';
import styles from './About.module.css';

const About = () => {
  const { siteData } = useContext(SiteContext);

  return (
    <div className="page-container" style={{ minHeight: '100vh', backgroundColor: 'var(--color-white)', paddingBottom: '0' }}>
      <PageHeader title="About Us" breadcrumb="About" />

      {/* Purpose Section */}
      <section className="section bg-white" style={{ paddingTop: '60px' }}>
        <div className={`container ${styles.purposeSection}`}>
          <h2>Precision Craftsmanship. Built with Excellence.</h2>
          <h3>Legacy of Premium CNC Artistry – Since 1980</h3>

          <h4>Our Purpose:</h4>
          <p>
            At Jaipur Arts CNC, we are dedicated to bringing your design visions to reality through state-of-the-art CNC technology. We collaborate with architects, interior designers, and homeowners to create highly detailed, custom-cut panels, furniture components, and intricate 2D/3D carvings in MDF, Wood, Acrylic, and Stone.
          </p>
          <p>
            Every piece we craft is a testament to precision engineering, traditional craftsmanship, and our commitment to elevating the aesthetic of modern and classic spaces alike.
          </p>

          <div className={styles.purposeImageWrapper}>
            <img src="/cnc_about_hero.png" alt="Industrial CNC Routing Machine" />
          </div>

          <h4>From Our Family to Yours</h4>
          <p>
            We're not just a manufacturing plant — we're a passionate, committed team that cares deeply about the art of creation. Every project, from a single decorative jali to large-scale interior paneling, is engineered with exactness, finished with care, and delivered to exceed your expectations.
          </p>
          <p>
            Whether you're seeking functional architectural elements, custom home temples, or bespoke luxury decor — we're here to help bring your vision to life.
          </p>
          <p style={{ marginBottom: '8px' }}>With gratitude,</p>
          <p style={{ fontWeight: '600' }}>The Jaipur Arts CNC Team</p>

          <a href="/contact" className={styles.connectBtn}>
            Connect With Us
          </a>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section">
        <div className="container">
          <div className={styles.storySection}>
            <div className={styles.storyImage}>
              {siteData?.ourStoryImage ? (
                <img src={`http://localhost:5000${siteData.ourStoryImage}`} alt="Our Story" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
              ) : (
                <div style={{ backgroundColor: 'var(--color-light-gray)', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--color-medium-gray)' }}>Image Space</span>
                </div>
              )}
            </div>
            <div className={styles.storyContent}>
              <h2 className="text-gradient">Our Story</h2>
              <h3>The origin of a legacy</h3>
              <p>
                Jaipur Arts CNC began its journey in 1980 with Furniture Making under a different name, by Mr. Om Prakash Jangid's vision to transform Furniture & Mandir-making into an art form. He started this journey by creating furniture — a creation that set new benchmarks in design, precision, and spiritual elegance.
              </p>
              <p>
                What started as passion-driven craftsmanship has today become a respected legacy, seamlessly blending heritage with innovation to craft spaces that elevate every home and heart.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialSection}>
        <div className="container">
          <div className={styles.stars}>
            <Star size={20} fill="var(--color-accent)" color="var(--color-accent)" />
            <Star size={20} fill="var(--color-accent)" color="var(--color-accent)" />
            <Star size={20} fill="var(--color-accent)" color="var(--color-accent)" />
            <Star size={20} fill="var(--color-accent)" color="var(--color-accent)" />
            <Star size={20} fill="var(--color-accent)" color="var(--color-accent)" />
          </div>
          
          <p className={styles.quote}>
            "Beautifully crafted wood temple—perfectly designed to fit my compact, custom space. A bit on the pricier side but a true blessing to have this sacred piece anchoring my daily prayers."
          </p>
          
          <div className={styles.dots}>
            <div className={`${styles.dot} ${styles.active}`}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>

          <div className={styles.testimonialGallery}>
            {/* Gallery Images Placeholder */}
            {[1, 2, 3, 4, 5, 6].map((img, idx) => (
              <div key={idx} className={styles.galleryImage}>
                <div style={{ backgroundColor: 'var(--color-border)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--color-medium-gray)', fontSize: '0.9rem' }}>Project {img}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Team Section */}
      <section className="section bg-white">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem' }}>The Team</h2>
          </div>

          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.avatarWrapper}>
                <User size={48} color="var(--color-dark)" />
              </div>
              <h4>The Design Lead</h4>
              <p>Understands spatial needs and creates customized modern and traditional designs accordingly.</p>
            </div>
            
            <div className={styles.teamMember}>
              <div className={styles.avatarWrapper}>
                <User size={48} color="var(--color-dark)" />
              </div>
              <h4>Project Manager</h4>
              <p>Manages timelines, coordination, and ensures smooth execution until final delivery.</p>
            </div>
            
            <div className={styles.teamMember}>
              <div className={styles.avatarWrapper}>
                <User size={48} color="var(--color-dark)" />
              </div>
              <h4>Account Manager</h4>
              <p>Handles communication, updates, and ensures a hassle-free customer experience.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
