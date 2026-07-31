import { useContext } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { SiteContext } from '../context/SiteContext';
import { getFullMediaUrl } from '../config';
import styles from './About.module.css';

const About = () => {
  const { siteData } = useContext(SiteContext);

  const whatsappUrl = siteData?.whatsappUrl || 'https://wa.me/919001021857';

  return (
    <div className={styles.aboutWrapper}>
      <PageHeader title="About Us" breadcrumb="About Us" />
      
      {/* ================= PAGE HERO ================= */}
      <section className={`${styles.pageHero} styles.jaliBg`}>
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>About Jaipur Arts CNC</div>
          <h1>Crafting wood with precision &amp; heritage since 2019.</h1>
          <p className={styles.lede}>
            Founded by <strong>Shubham Jangid</strong>, Jaipur Arts CNC blends rich traditional woodworking artistry with state-of-the-art 2D and 3D CNC carving technology.
          </p>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className={styles.sectionPadding}>
        <div className={`${styles.wrap} ${styles.storyGrid}`}>
          <div className={styles.storyVisual}>
            <img 
              src={
                siteData?.ourStoryImage 
                  ? getFullMediaUrl(siteData.ourStoryImage)
                  : "/ganeshji.jpg"
              } 
              alt="Ganeshji Wood Carving - Jaipur Arts CNC by Shubham Jangid" 
            />
          </div>
          <div className={styles.storyCopy}>
            <div className={styles.eyebrow}>Our Heritage &amp; Story</div>
            <h2 style={{ marginBottom: '22px' }}>From traditional craft to a full CNC studio</h2>
            <p>
              Jaipur Arts CNC grew out of a rich wood-crafting heritage in Jaipur. Led by owner and lead designer <strong>Shubham Jangid</strong>, our workshop carries forward generations of woodworking craftsmanship into the digital era.
            </p>
            <p>
              Recognizing that customers required unprecedented detail for intricate jali screens, mandir backdrops, and architectural panels, <strong>Shubham Jangid</strong> brought high-precision CNC routers into the workshop in 2019 to complement traditional hand-finishing skills.
            </p>
            <p>
              Every single piece is personally inspected by <strong>Shubham Jangid</strong> and our master craftsmen — modern machinery gives us exact micro-millimeter precision, but traditional artisan finishing gives each piece its authentic soul.
            </p>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className={styles.sectionPadding}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>What We Stand For</div>
              <h2>How we work</h2>
            </div>
            <p>Three things that guide every piece that goes through our workshop.</p>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <h3>Precision First</h3>
              <p>Every design is checked against your measurements before cutting begins — no guesswork.</p>
            </div>
            <div className={styles.valueCard}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <h3>Right Wood for the Job</h3>
              <p>We advise honestly on MDF, HDHMR, Plywood, Solid Wood, Acrylic or PVC Foam based on your design and where it'll be used.</p>
            </div>
            <div className={styles.valueCard}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <h3>On-Time Delivery</h3>
              <p>We agree a timeline upfront and stick to it, from single pieces to bulk orders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WORKSHOP / MACHINE ================= */}
      <section className={`${styles.sectionPadding} ${styles.workshopSection}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>Our Workshop</div>
              <h2>The machine behind the work</h2>
            </div>
            <p>A quick look at what our workshop is equipped to handle.</p>
          </div>
          <div className={styles.specGrid}>
            <div className={styles.specCard}>
              <b>1300×2500mm</b>
              <span>Max Cutting Bed</span>
            </div>
            <div className={styles.specCard}>
              <b>0.2mm</b>
              <span>Cutting Accuracy</span>
            </div>
            <div className={styles.specCard}>
              <b>Wood &amp; MDF</b>
              <span>Materials Allowed</span>
            </div>
            <div className={styles.specCard}>
              <b>2D + 3D</b>
              <span>Toolpath Capability</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TIMELINE ================= */}
      <section className={styles.sectionPadding}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>Our Journey</div>
              <h2>Milestones so far</h2>
            </div>
          </div>
          <div className={styles.timeline}>
            <div className={styles.tItem}>
              <div className={styles.tYear}>2016</div>
              <h3>Woodworking heritage established</h3>
              <p>Rooted in traditional hand-carving and custom furniture craftsmanship in Jaipur.</p>
            </div>
            <div className={styles.tItem}>
              <div className={styles.tYear}>2019</div>
              <h3>Jaipur Arts CNC founded by Shubham Jangid</h3>
              <p>Brought in high-precision CNC router machines to blend traditional handcrafted artistry with modern speed.</p>
            </div>
            <div className={styles.tItem}>
              <div className={styles.tYear}>2021</div>
              <h3>Added 3D relief carving &amp; Artcam models</h3>
              <p>Expanded capability to sculpted, layered 3D designs, deity reliefs, and architectural mandir pillars.</p>
            </div>
            <div className={styles.tItem}>
              <div className={styles.tYear}>2024</div>
              <h3>500+ projects delivered pan-India</h3>
              <p>Crossed 500 completed orders — from single home décor pieces to large showroom and temple installations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOUNDER QUOTE ================= */}
      <section style={{ paddingTop: 0, paddingBottom: '90px' }}>
        <div className={styles.wrap}>
          <div className={styles.quoteBlock}>
            <div className={styles.quoteAvatar}>SJ</div>
            <div className={styles.quoteText}>
              <p>
                "Wood carving is our passion and lifelong craft. Every piece that leaves our workshop — whether a delicate home jali or a royal temple backdrop — carries our commitment to perfection."
              </p>
              <div className={styles.rName}>Shubham Jangid</div>
              <div className={styles.rRole}>Owner &amp; Lead Designer • Jaipur Arts CNC</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section style={{ paddingTop: 0, paddingBottom: '90px' }}>
        <div className={styles.wrap}>
          <div className={styles.ctaBanner}>
            <h2>Want to see more of our work before you order?</h2>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', zIndex: 2 }}>
              <Link to="/gallery" className="btn btn-primary" style={{ background: 'var(--paper)', color: 'var(--brick)' }}>
                View Gallery
              </Link>
              <Link to="/contact" className="btn btn-outline" style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
