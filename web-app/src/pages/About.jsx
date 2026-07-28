import { useContext } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { SiteContext } from '../context/SiteContext';
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
          <div className={styles.eyebrow}>About Jaipur Art CNC</div>
          <h1>A small Jaipur workshop, cutting wood with precision since 2019.</h1>
          <p className={styles.lede}>
            We started with one CNC machine and a love for pattern work. Today we cut 2D and 3D designs for homes, showrooms and craftsmen across Rajasthan and beyond.
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
                  ? (siteData.ourStoryImage.startsWith('http') ? siteData.ourStoryImage : `http://localhost:5000${siteData.ourStoryImage}`)
                  : "/ganeshji.jpg"
              } 
              alt="Ganeshji Wood Carving - Jaipur Art CNC" 
            />
          </div>
          <div className={styles.storyCopy}>
            <div className={styles.eyebrow}>Our Story</div>
            <h2 style={{ marginBottom: '22px' }}>From a family carpentry shop to a full CNC studio</h2>
            <p>
              <strong>Jaipur Art CNC</strong> grew out of a family carpentry business in Jaipur. We saw customers asking for finer, more intricate pattern work than hand tools could reliably deliver — so we invested in our first CNC router in 2019.
            </p>
            <p>
              Since then, we've cut everything from delicate jali screens for home interiors to large 3D relief panels for showrooms and temples, working across MDF, Plywood and Pine to match whatever the design calls for.
            </p>
            <p>
              Every order is still checked by hand before it leaves our workshop — the machine gives us precision, but the finishing is where the craft happens.
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
              <b>Wood & MDF</b>
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
              <h3>Family carpentry workshop founded</h3>
              <p>Started as a small hand-tool carpentry business in Jaipur, taking on furniture and interior woodwork.</p>
            </div>
            <div className={styles.tItem}>
              <div className={styles.tYear}>2019</div>
              <h3>First CNC router installed</h3>
              <p>Brought in our first CNC machine to meet growing demand for detailed pattern and jali work.</p>
            </div>
            <div className={styles.tItem}>
              <div className={styles.tYear}>2021</div>
              <h3>Added 3D relief carving</h3>
              <p>Expanded capability to sculpted, layered 3D designs alongside our existing 2D pattern work.</p>
            </div>
            <div className={styles.tItem}>
              <div className={styles.tYear}>2024</div>
              <h3>500+ projects delivered</h3>
              <p>Crossed 500 completed orders — from single home décor pieces to large showroom installations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOUNDER QUOTE ================= */}
      <section style={{ paddingTop: 0, paddingBottom: '90px' }}>
        <div className={styles.wrap}>
          <div className={styles.quoteBlock}>
            <div className={styles.quoteAvatar}>J</div>
            <div className={styles.quoteText}>
              <p>
                "Every piece that leaves our workshop has to be something we'd be happy to put in our own home. That's the standard we cut to."
              </p>
              <div className={styles.rName}>Founder, Jaipur Art CNC</div>
              <div className={styles.rRole}>Workshop Lead &amp; Designer</div>
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

      {/* ================= WHATSAPP FLOAT ================= */}
      <a className={styles.waFloat} href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.66 1.44 5.24L2 22l4.98-1.53a9.87 9.87 0 0 0 5.06 1.38h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.13.09-1.83-.11-.42-.13-.96-.3-1.65-.6-2.9-1.25-4.79-4.16-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.28.57-.35.76-.35h.55c.18 0 .42-.07.65.5.24.6.82 2.06.9 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.35 1.44.3.15.47.13.65-.08.17-.2.73-.85.93-1.15.2-.3.4-.24.65-.15.26.1 1.65.78 1.93.92.29.15.48.22.55.34.07.13.07.72-.17 1.4z"/></svg>
      </a>

    </div>
  );
};

export default About;
