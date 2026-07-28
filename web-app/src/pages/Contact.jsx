import { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { Phone, Mail, ArrowRight, ChevronDown, MapPin, CheckCircle2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import { SiteContext } from '../context/SiteContext';
import styles from './Contact.module.css';

const Contact = () => {
  const { siteData } = useContext(SiteContext);
  const [openFaq, setOpenFaq] = useState(-1);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    material: 'MDF (Medium Density Fibreboard)',
    patternType: '2D Pattern',
    sizeQuantity: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactPhone = siteData?.contactPhone || '+91 90010 21857';
  const contactEmail = siteData?.contactEmail || 'hello@jaipurartcnc.com';
  const address = siteData?.address || 'Workshop No. 12, Vishwakarma Industrial Area, Jaipur, Rajasthan 302013';
  const whatsappUrl = siteData?.whatsappUrl || 'https://wa.me/919001021857';

  const widgetRef = useRef(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;

    container.innerHTML = '';
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'trustindex-widget';
    container.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?ce9b02377a8479580466988f31c';
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return alert('Name and Phone Number are required.');

    setSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/inquiries', formData);
      setSubmitted(true);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        material: 'MDF (Medium Density Fibreboard)',
        patternType: '2D Pattern',
        sizeQuantity: '',
        message: ''
      });
    } catch (err) {
      alert('Failed to submit quote request. Please try again.');
    }
    setSubmitting(false);
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

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--cream)', borderRadius: '8px', border: '1px solid var(--brass)' }}>
                <CheckCircle2 size={48} color="var(--brass)" style={{ margin: '0 auto 16px auto', display: 'block' }} />
                <h3 style={{ margin: '0 0 8px 0', color: 'var(--espresso)', fontFamily: 'var(--font-heading)' }}>Inquiry Received!</h3>
                <p style={{ margin: '0 0 20px 0', color: 'var(--walnut)' }}>Thank you for reaching out. Our team will review your inquiry and get back to you shortly.</p>
                <button type="button" onClick={() => setSubmitted(false)} className="btn btn-primary">
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry}>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label>Full Name *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div className={styles.field}>
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 " required />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label>Wood Type / Material</label>
                    <select name="material" value={formData.material} onChange={handleChange}>
                      <option value="MDF (Medium Density Fibreboard)">MDF (Medium Density Fibreboard)</option>
                      <option value="HDHMR Board (High Density High Moisture Resistant)">HDHMR Board (High Density High Moisture Resistant)</option>
                      <option value="Plywood">Plywood</option>
                      <option value="Solid Wood (Teak, Sheesham, Pine)">Solid Wood (Teak, Sheesham, Pine)</option>
                      <option value="Acrylic Sheet">Acrylic Sheet</option>
                      <option value="PVC Foam Board">PVC Foam Board</option>
                      <option value="Not sure — need advice">Not sure — need advice</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label>Pattern Type</label>
                    <select name="patternType" value={formData.patternType} onChange={handleChange}>
                      <option value="2D Pattern">2D Pattern</option>
                      <option value="3D Relief">3D Relief</option>
                      <option value="Custom / Not sure">Custom / Not sure</option>
                    </select>
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Size / Quantity (if known)</label>
                  <input type="text" name="sizeQuantity" value={formData.sizeQuantity} onChange={handleChange} placeholder="e.g. 3ft x 2ft, 1 piece" />
                </div>
                <div className={styles.field}>
                  <label>Tell us about your design</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Describe what you'd like cut, or mention that you'll share a photo/file over WhatsApp"></textarea>
                </div>
                <button className="btn btn-primary" type="submit" disabled={submitting} style={{ width: '100%' }}>
                  {submitting ? 'Submitting Request...' : 'Send Request'}
                </button>
                <p className={styles.formNote}>Prefer WhatsApp? Tap the green button in the corner and send your design directly.</p>
              </form>
            )}
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

      {/* ================= TRUSTINDEX GOOGLE REVIEWS ================= */}
      <section className={`${styles.sectionPadding} ${styles.reviewsSection}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow} style={{ color: 'var(--brick)' }}>Reviews</div>
              <h2>What our clients say</h2>
            </div>
            <p>Real reviews from our Google Business Profile, updated automatically.</p>
          </div>
          <div className={styles.trustindexWrapper} ref={widgetRef}></div>
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
