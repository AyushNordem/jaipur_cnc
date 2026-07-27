import { useState, useContext } from 'react';
import { Phone, Mail, ArrowRight, ArrowLeft, ChevronDown, MapPin, Star } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import { SiteContext } from '../context/SiteContext';
import styles from './Contact.module.css';

const Contact = () => {
  const { siteData } = useContext(SiteContext);
  const [openFaq, setOpenFaq] = useState(-1);
  const [activeReview, setActiveReview] = useState(0);

  const contactPhone = siteData?.contactPhone || '+91 90010 21857';
  const contactEmail = siteData?.contactEmail || 'hello@jaipurartcnc.com';
  const address = siteData?.address || 'Workshop No. 12, Vishwakarma Industrial Area, Jaipur, Rajasthan 302013';
  const whatsappUrl = siteData?.whatsappUrl || 'https://wa.me/919001021857';

  const reviews = [
    {
      name: "Amit Sharma",
      avatarColor: "#4285F4",
      badge: "Local Guide",
      stars: 5,
      date: "3 weeks ago",
      text: "Best CNC cutting service in Jaipur! They did a perfect 18mm HDHMR Mandir carving with intricate jali back panels. Very professional work and fair pricing."
    },
    {
      name: "Rajesh K. Meena",
      avatarColor: "#0F9D58",
      badge: "Local Guide",
      stars: 5,
      date: "1 month ago",
      text: "Excellent quality MDF jali work for my modular kitchen. The cut lines were sharp with no chipping at all. Fast delivery too!"
    },
    {
      name: "Pooja Jangid",
      avatarColor: "#DB4437",
      badge: "Local Guide",
      stars: 5,
      date: "2 months ago",
      text: "Visited their workshop in Vishwakarma Industrial Area. The machines are top-notch and the team is very helpful in designing custom wood relief work. Highly recommend!"
    },
    {
      name: "Vikram Aditya",
      avatarColor: "#F4B400",
      badge: "Local Guide",
      stars: 5,
      date: "5 days ago",
      text: "They cut some acrylic nameplates and pine wood signages for our resort. The finish is fantastic. Very reliable and supportive team."
    },
    {
      name: "Sanjay Chaudhary",
      avatarColor: "#ab47bc",
      badge: "Local Guide",
      stars: 5,
      date: "2 months ago",
      text: "Superb experience! Shared a photo of a temple over WhatsApp and they manufactured the exact same design. The PU paint finish is amazing."
    }
  ];

  const handleNextReview = () => {
    setActiveReview((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const faqs = [
    {
      q: "What materials do you work with?",
      a: "MDF, HDHMR Board, Plywood, Solid Wood (Teak, Sheesham, Pine), Acrylic Sheet, and PVC Foam Board. We'll recommend the right one based on your design and where it'll be used."
    },
    {
      q: "Can you cut both 2D and 3D designs?",
      a: "Yes — flat 2D patterns (jali screens, name boards, rangoli panels, signage) as well as sculpted 3D relief carving."
    },
    {
      q: "How do I send you my design?",
      a: "Share a photo, hand sketch, or file (CDR, AI, PDF, DXF) over WhatsApp — most clients just send a picture and describe what they want, in Hindi or English."
    },
    {
      q: "What size pieces can you cut?",
      a: "Up to 1300×2500mm on our machine bed, material thickness up to 40mm. Bigger designs can be cut in joined panels."
    },
    {
      q: "How much will my order cost, and is GST included?",
      a: "Cost depends on material, size, design detail, and quantity. We'll send a clear quote in ₹ over WhatsApp, and can provide a GST bill if needed for your business."
    },
    {
      q: "What payment methods do you accept?",
      a: "UPI (GPay/PhonePe/Paytm), bank transfer, and cash. For custom orders, we usually ask for 50% advance and the balance on delivery/pickup."
    },
    {
      q: "How long does an order take?",
      a: "3–5 working days for single pieces. Bulk orders depend on quantity — we'll confirm the timeline when we quote, and flag if festival-season demand affects it."
    },
    {
      q: "Do you deliver outside Jaipur?",
      a: "Yes, pan-India via courier/transport. Delivery charges depend on size, weight, and your pin code — included in your quote."
    },
    {
      q: "Do you take bulk/wholesale orders for shops or events?",
      a: "Yes — for showrooms, interior designers, and retailers, with consistent quality across every piece. Special pricing available for bulk quantities."
    },
    {
      q: "Can I see samples or visit your workshop before ordering?",
      a: "Yes, you're welcome to visit our Jaipur workshop by appointment, or we can share photos/videos of similar past work over WhatsApp before you confirm your order."
    }
  ];

  return (
    <div className={styles.contactWrapper}>
      <PageHeader title="Contact Us" breadcrumb="Contact" />

      {/* ================= PAGE HERO ================= */}
      <div className={`${styles.pageHero} styles.jaliBg`}>
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>Get In Touch</div>
          <h1>Tell us what you'd like cut — we'll take it from there.</h1>
          <p className={styles.lede}>Send a design, ask about a wood type, or just say hello. We usually reply within a few hours.</p>
        </div>
      </div>

      {/* ================= QUICK CONTACT ================= */}
      <section className={styles.sectionPadding}>
        <div className={styles.wrap}>
          <div className={styles.quickGrid}>
            <div className={styles.quickCard}>
              <Phone size={26} className={styles.quickIcon} />
              <div>
                <h3>Call Us</h3>
                <p>Mon–Sat, 9am–7pm</p>
                <a className={styles.quickLink} href={`tel:${contactPhone}`}>{contactPhone}</a>
              </div>
            </div>
            <div className={styles.quickCard}>
              <FaWhatsapp size={26} className={styles.quickIcon} />
              <div>
                <h3>WhatsApp</h3>
                <p>Fastest way to share a design</p>
                <a className={styles.quickLink} href={whatsappUrl} target="_blank" rel="noopener noreferrer">Chat with us →</a>
              </div>
            </div>
            <div className={styles.quickCard}>
              <Mail size={26} className={styles.quickIcon} />
              <div>
                <h3>Email</h3>
                <p>For detailed orders and files</p>
                <a className={styles.quickLink} href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FORM + INFO ================= */}
      <section id="form" className={styles.sectionPadding} style={{ paddingTop: 0 }}>
        <div className={`${styles.wrap} ${styles.contactGrid}`}>
          <div className={styles.formCard}>
            <h2>Request a quote</h2>
            <p>Fill in a few details and attach a design if you have one — we'll get back with pricing and timeline.</p>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label>Full Name</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div className={styles.field}>
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+91 " required />
                </div>
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <input type="email" placeholder="you@example.com" />
              </div>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label>Wood Type / Material</label>
                  <select>
                    <option>MDF (Medium Density Fibreboard)</option>
                    <option>HDHMR Board (High Density High Moisture Resistant)</option>
                    <option>Plywood</option>
                    <option>Solid Wood (Teak, Sheesham, Pine)</option>
                    <option>Acrylic Sheet</option>
                    <option>PVC Foam Board</option>
                    <option>Not sure — need advice</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Pattern Type</label>
                  <select>
                    <option>2D Pattern</option>
                    <option>3D Relief</option>
                    <option>Custom / Not sure</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label>Size / Quantity (if known)</label>
                <input type="text" placeholder="e.g. 3ft x 2ft, 1 piece" />
              </div>
              <div className={styles.field}>
                <label>Tell us about your design</label>
                <textarea placeholder="Describe what you'd like cut, or mention that you'll share a photo/file over WhatsApp"></textarea>
              </div>
              <button className="btn btn-primary styles.submitBtn" type="submit" style={{ width: '100%' }}>Send Request</button>
              <p className={styles.formNote}>Prefer WhatsApp? Tap the green button in the corner and send your design directly.</p>
            </form>
          </div>

          <div>
            <div className={styles.infoCard}>
              <div className={styles.eyebrow} style={{ color: 'var(--brass)' }}>Workshop</div>
              <div className={styles.infoRow}>
                <MapPin size={20} className={styles.infoIcon} />
                <div>
                  <b>Address</b>
                  <span>{address}</span>
                </div>
              </div>
              <div className={styles.infoRow}>
                <Phone size={20} className={styles.infoIcon} />
                <div>
                  <b>Phone</b>
                  <span>{contactPhone}</span>
                </div>
              </div>
              <div className={styles.infoRow}>
                <Mail size={20} className={styles.infoIcon} />
                <div>
                  <b>Email</b>
                  <span>{contactEmail}</span>
                </div>
              </div>
            </div>

            <div className={styles.hoursCard}>
              <h3>Working Hours</h3>
              <div className={styles.hoursRow}>
                <span>Monday – Sunday</span>
                <span>10:00 – 21:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className={styles.mapSection}>
        <div className={styles.wrap}>
          <div className={styles.mapFrame}>
            <iframe
              title="Jaipur Art CNC Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.512630095818!2d75.76735117628892!3d26.91974717664273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db57f496c274d%3A0x69e65de890e2b706!2sJaipur%20Art%20CNC!5e0!3m2!1sen!2sin!4v1722000000000!5m2!1sen!2sin"
              style={{ border: 0, display: 'block', width: '100%', height: '100%' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ================= GOOGLE REVIEWS SLIDER ================= */}
      <section className={`${styles.sectionPadding} ${styles.reviewsSection}`}>
        <div className={styles.wrap}>
          <div className={styles.googleHeader}>
            <div>
              <div className={styles.eyebrow} style={{ color: 'var(--brick)' }}>Reviews</div>
              <h2>What our clients say</h2>
            </div>
            
            <div className={styles.googleBadge}>
              <svg className={styles.googleLogo} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className={styles.googleStats}>
                <div className={styles.googleScore}>
                  <span>5.0</span>
                  <div className={styles.googleStars}>
                    <Star size={14} fill="#F4B400" stroke="none" />
                    <Star size={14} fill="#F4B400" stroke="none" />
                    <Star size={14} fill="#F4B400" stroke="none" />
                    <Star size={14} fill="#F4B400" stroke="none" />
                    <Star size={14} fill="#F4B400" stroke="none" />
                  </div>
                </div>
                <div className={styles.googleCount}>Based on 48 Google reviews</div>
              </div>
            </div>
          </div>

          <div className={styles.sliderContainer}>
            <div className={styles.reviewCard}>
              <div className={styles.cardTop}>
                <div className={styles.userInfo}>
                  <div className={styles.avatar} style={{ backgroundColor: reviews[activeReview].avatarColor }}>
                    {reviews[activeReview].name.charAt(0)}
                  </div>
                  <div className={styles.userMeta}>
                    <h4>{reviews[activeReview].name}</h4>
                    <span>{reviews[activeReview].badge}</span>
                  </div>
                </div>
                <svg className={styles.googleGIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>

              <div className={styles.reviewBody}>
                <div className={styles.reviewStars}>
                  <Star size={16} fill="#F4B400" stroke="none" />
                  <Star size={16} fill="#F4B400" stroke="none" />
                  <Star size={16} fill="#F4B400" stroke="none" />
                  <Star size={16} fill="#F4B400" stroke="none" />
                  <Star size={16} fill="#F4B400" stroke="none" />
                  <span className={styles.reviewDate}>{reviews[activeReview].date}</span>
                </div>
                <p className={styles.reviewText}>"{reviews[activeReview].text}"</p>
              </div>
            </div>

            <div className={styles.sliderNav}>
              <button onClick={handlePrevReview} className={styles.navBtn} aria-label="Previous Review">
                <ArrowLeft size={18} />
              </button>
              <button onClick={handleNextReview} className={styles.navBtn} aria-label="Next Review">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className={styles.sectionPadding}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>Before You Ask</div>
              <h2>Common questions</h2>
            </div>
            <p>A few things people usually want to know before placing an order.</p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={styles.faqItem}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                style={{ cursor: 'pointer' }}
              >
                <h3>
                  {faq.q}
                  <span className={styles.qMark}>
                    {openFaq === index ? '−' : '?'}
                  </span>
                </h3>
                <div className={`${styles.faqBody} ${openFaq === index ? styles.faqOpen : ''}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
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

export default Contact;
