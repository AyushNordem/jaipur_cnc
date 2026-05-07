import { useState } from 'react';
import { Phone, Mail, ArrowRight, ChevronDown } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import styles from './Contact.module.css';

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "What materials do you cut and carve?",
      a: "We work with a wide range of materials including solid wood, MDF, acrylic, stone, and metals like aluminum and brass."
    },
    {
      q: "How do I request a custom design?",
      a: "You can send us your 2D/3D designs (AutoCAD, CorelDraw, etc.) via email, or contact us with your requirements and our design team will create the blueprints for you."
    },
    {
      q: "What is your typical turnaround time?",
      a: "For standard projects, our turnaround time is usually 3-5 business days. Custom or large-scale projects may take longer depending on complexity and material availability."
    },
    {
      q: "Do you offer delivery services?",
      a: "Yes, we offer secure packaging and delivery services across Jaipur and surrounding areas. We can also arrange shipping for out-of-station orders."
    }
  ];

  return (
    <div className="page-container" style={{ minHeight: '100vh', backgroundColor: 'var(--color-white)' }}>
      <PageHeader title="Contact Us" breadcrumb="Contact" />

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className={styles.contactWrapper}>
            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Let's Discuss Your Project</h2>
              <p style={{ color: 'var(--color-medium-gray)' }}>Ready to transform your space with premium CNC craftsmanship? Get in touch with us today.</p>
              
              <div className={styles.contactMethods}>
                <div className={styles.method}>
                  <div className={styles.methodIcon}><Phone size={24} className="text-blue" /></div>
                  <div>
                    <h4 style={{ color: 'var(--color-black)' }}>Call Us Directly</h4>
                    <p style={{ color: 'var(--color-dark)' }}>90010-21857</p>
                  </div>
                </div>
                <div className={styles.method}>
                  <div className={styles.methodIcon}><Mail size={24} className="text-blue" /></div>
                  <div>
                    <h4 style={{ color: 'var(--color-black)' }}>Email Us</h4>
                    <p style={{ color: 'var(--color-dark)' }}>jaipurartscnc@gmail.com</p>
                  </div>
                </div>
                <div className={styles.method}>
                  <div className={styles.methodIcon}><FaMapMarkerAlt size={24} className="text-blue" /></div>
                  <div>
                    <h4 style={{ color: 'var(--color-black)' }}>Our Location</h4>
                    <p style={{ color: 'var(--color-dark)' }}>Shop No. 2, Narayan Vihar Asarpura, Jaipur</p>
                  </div>
                </div>
                
                <div className={styles.socialFollowBlock}>
                  <h4 style={{ color: 'var(--color-black)', marginBottom: '16px' }}>Follow Us</h4>
                  <div className={styles.socialButtonsRow}>
                    <a href="#" className={styles.socialBtn}><FaFacebookF size={20} /></a>
                    <a href="https://instagram.com/jaipurartscnc" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}><FaInstagram size={20} /></a>
                    <a href="https://wa.me/919001021857" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}><FaWhatsapp size={20} /></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`glass-card ${styles.contactForm}`}>
              <h3 style={{ color: 'var(--color-black)' }}>Request a Free Quote</h3>
              <form>
                <div className={styles.formGroup}>
                  <input type="text" placeholder="Your Name" className={styles.formInput} required />
                </div>
                <div className={styles.formGroup}>
                  <input type="tel" placeholder="Mobile Number" className={styles.formInput} required />
                </div>
                <div className={styles.formGroup}>
                  <select className={styles.formInput} required defaultValue="">
                    <option value="" disabled>Select Project Type</option>
                    <option value="2d">2D Cutting</option>
                    <option value="3d">3D Carving</option>
                    <option value="furniture">Furniture Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <textarea placeholder="Project Details" rows="4" className={styles.formInput} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                  Send Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-light" style={{ backgroundColor: 'var(--color-light-gray)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px' }}>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Frequently Asked Questions</h2>
            <p style={{ color: 'var(--color-medium-gray)' }}>Find answers to common questions about our CNC services and processes.</p>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`${styles.faqItem} ${openFaq === index ? styles.faqOpen : ''}`}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              >
                <div className={styles.faqHeader}>
                  <h4 style={{ color: 'var(--color-black)' }}>{faq.q}</h4>
                  <ChevronDown className={styles.faqIcon} />
                </div>
                <div className={styles.faqBody}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
