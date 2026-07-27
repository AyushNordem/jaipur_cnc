import { useState, useEffect } from 'react';
import axios from 'axios';
import { Building2, Share2, Image as ImageIcon, Save, UploadCloud, BarChart2, Video } from 'lucide-react';

const Settings = () => {
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/settings')
      .then(res => {
        const data = res.data.settings || res.data || {};
        setContent(data);
      })
      .catch(err => {
        console.error('Error fetching settings content:', err);
        setContent({});
      });
  }, []);

  const handleChange = (e) => {
    setContent(prev => ({ ...(prev || {}), [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(fieldName);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const uploadRes = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setContent(prev => ({ ...(prev || {}), [fieldName]: uploadRes.data.url }));
    } catch (err) {
      alert('Error uploading image');
    }
    setUploadingImage(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put('http://localhost:5000/api/settings', content);
      if (res.data && res.data.settings) {
        setContent(res.data.settings);
      }
      alert('Global settings saved successfully to MongoDB!');
    } catch (err) {
      alert('Error saving settings to MongoDB.');
    }
    setSaving(false);
  };

  if (!content) return <div style={{ padding: '40px', color: 'var(--espresso)', fontFamily: 'var(--font-body)' }}>Loading settings...</div>;

  const cardStyle = {
    background: 'var(--paper)',
    padding: '32px',
    borderRadius: '6px',
    border: '1px solid var(--line)',
    boxShadow: 'var(--shadow)',
    marginBottom: '32px'
  };

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '1.4rem',
    fontFamily: 'var(--font-heading)',
    color: 'var(--espresso)',
    borderBottom: '1px solid var(--line)',
    paddingBottom: '16px',
    marginBottom: '24px'
  };

  const labelStyle = { display: 'block', marginBottom: '16px', fontWeight: '600', color: 'var(--espresso)', fontSize: '14px' };
  const inputStyle = { 
    width: '100%', 
    padding: '12px', 
    marginTop: '8px', 
    border: '1px solid var(--line)', 
    borderRadius: '4px',
    background: '#ffffff',
    color: 'var(--espresso)',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const MediaUploader = ({ label, fieldName }) => {
    const rawUrl = content ? content[fieldName] : '';
    const mediaUrl = typeof rawUrl === 'string' ? rawUrl : '';
    const isVideo = Boolean(mediaUrl && (mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm') || mediaUrl.includes('video')));

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '6px', transition: 'border-color 0.2s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '6px', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid var(--line)', flexShrink: 0 }}>
            {mediaUrl ? (
              isVideo ? (
                <video src={mediaUrl.startsWith('/') || mediaUrl.startsWith('http') ? mediaUrl : `http://localhost:5000${mediaUrl}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
              ) : (
                <img src={mediaUrl.startsWith('/') || mediaUrl.startsWith('http') ? mediaUrl : `http://localhost:5000${mediaUrl}`} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )
            ) : (
              <ImageIcon size={24} color="var(--walnut)" />
            )}
          </div>
          <div>
            <h4 style={{ margin: '0 0 6px 0', color: 'var(--espresso)', fontSize: '0.95rem', fontWeight: '600', fontFamily: 'var(--font-heading)' }}>{label}</h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: mediaUrl ? 'var(--brass)' : 'var(--walnut)' }}>
              {mediaUrl ? (isVideo ? 'Video active' : 'Image uploaded') : 'No media selected'}
            </p>
          </div>
        </div>
        
        <div style={{ position: 'relative' }}>
          <input 
            type="file" 
            accept="image/*,video/*" 
            onChange={(e) => handleImageUpload(e, fieldName)} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
          />
          <button type="button" style={{ pointerEvents: 'none', background: 'var(--cream)', color: 'var(--espresso)', border: '1px solid var(--line)', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '600' }}>
            <UploadCloud size={16} />
            {uploadingImage === fieldName ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1000px', paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#323232', margin: '0 0 8px 0' }}>Global Settings</h1>
          <p style={{ color: '#666', margin: 0 }}>Manage your core business information, social links, and website imagery.</p>
        </div>
        <button onClick={handleSave} disabled={saving || uploadingImage} style={{ 
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '12px 24px', background: 'linear-gradient(135deg, #8b7355 0%, #6e5a42 100%)', 
          color: 'white', border: 'none', borderRadius: '8px', 
          cursor: (saving || uploadingImage) ? 'not-allowed' : 'pointer', 
          fontSize: '1rem', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(139, 115, 85, 0.3)'
        }}>
          <Save size={20} />
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <form onSubmit={handleSave}>
        
        {/* Business Details */}
        <div style={cardStyle}>
          <h3 style={sectionHeaderStyle}><Building2 color="var(--brick)" /> Business Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ gridColumn: '1 / -1', marginBottom: '8px' }}>
              <MediaUploader label="Website Logo" fieldName="logoUrl" />
            </div>
            <label style={labelStyle}>
              Site/Business Name
              <input type="text" name="siteName" value={content.siteName || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. Jaipur Art CNC" />
            </label>
            <label style={labelStyle}>
              Contact Number
              <input type="text" name="contactPhone" value={content.contactPhone || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. +91 90010 21857" />
            </label>
            <label style={labelStyle}>
              Contact Email
              <input type="email" name="contactEmail" value={content.contactEmail || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. hello@jaipurartcnc.com" />
            </label>
            <label style={labelStyle}>
              WhatsApp Number (for direct messages)
              <input type="text" name="whatsappUrl" value={content.whatsappUrl || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. https://wa.me/919001021857" />
            </label>
            <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>
              Physical Address
              <input type="text" name="address" value={content.address || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. Shop No. 2, Asarpura, Narayan Vihar, Jaipur, Rajasthan 302020" />
            </label>
            <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>
              Location URL (Google Maps Link)
              <input type="text" name="locationUrl" value={content.locationUrl || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. https://maps.google.com/?cid=..." />
            </label>
          </div>
        </div>

        {/* Business Metrics */}
        <div style={cardStyle}>
          <h3 style={sectionHeaderStyle}><BarChart2 color="var(--brick)" /> Business Metrics</h3>
          <p style={{ color: 'var(--walnut)', marginBottom: '24px', fontSize: '0.95rem' }}>Update the statistics displayed on your dashboard and public website.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <label style={labelStyle}>
              Happy Customers Count
              <input type="text" name="happyCustomersCount" value={content.happyCustomersCount || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. 5,000+" />
            </label>
            <label style={labelStyle}>
              Completed Projects Count
              <input type="text" name="completedProjectsCount" value={content.completedProjectsCount || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. 500+" />
            </label>
            <label style={labelStyle}>
              Years Experience
              <input type="text" name="yearsExperienceCount" value={content.yearsExperienceCount || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. 7+ Yrs" />
            </label>
            <label style={labelStyle}>
              Total Branches Count
              <input type="text" name="totalBranchesCount" value={content.totalBranchesCount || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. 3" />
            </label>
          </div>
        </div>

        {/* Social Media Links */}
        <div style={cardStyle}>
          <h3 style={sectionHeaderStyle}><Share2 color="var(--brick)" /> Global Social Media Links</h3>
          <p style={{ color: 'var(--walnut)', marginBottom: '24px', fontSize: '0.95rem' }}>Configure all your public social media profiles and communication links.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <label style={labelStyle}>
              Facebook Page URL
              <input type="text" name="facebookUrl" value={content.facebookUrl || ''} onChange={handleChange} style={inputStyle} placeholder="https://facebook.com/jaipurartcnc" />
            </label>
            <label style={labelStyle}>
              Instagram Profile URL
              <input type="text" name="instagramUrl" value={content.instagramUrl || ''} onChange={handleChange} style={inputStyle} placeholder="https://instagram.com/jaipurartcnc" />
            </label>
            <label style={labelStyle}>
              YouTube Channel URL
              <input type="text" name="youtubeUrl" value={content.youtubeUrl || ''} onChange={handleChange} style={inputStyle} placeholder="https://youtube.com/@jaipurartcnc" />
            </label>
            <label style={labelStyle}>
              WhatsApp Direct Link / Number
              <input type="text" name="whatsappUrl" value={content.whatsappUrl || ''} onChange={handleChange} style={inputStyle} placeholder="https://wa.me/919001021857" />
            </label>
            <label style={labelStyle}>
              Google Business / Review URL
              <input type="text" name="googleBusinessUrl" value={content.googleBusinessUrl || ''} onChange={handleChange} style={inputStyle} placeholder="https://g.page/r/..." />
            </label>
            <label style={labelStyle}>
              LinkedIn Company Page
              <input type="text" name="linkedinUrl" value={content.linkedinUrl || ''} onChange={handleChange} style={inputStyle} placeholder="https://linkedin.com/company/jaipurartcnc" />
            </label>
            <label style={labelStyle}>
              X (Twitter) Profile URL
              <input type="text" name="twitterUrl" value={content.twitterUrl || ''} onChange={handleChange} style={inputStyle} placeholder="https://x.com/jaipurartcnc" />
            </label>
            <label style={labelStyle}>
              Pinterest Profile URL
              <input type="text" name="pinterestUrl" value={content.pinterestUrl || ''} onChange={handleChange} style={inputStyle} placeholder="https://pinterest.com/jaipurartcnc" />
            </label>
            <label style={labelStyle}>
              Telegram Channel / Contact
              <input type="text" name="telegramUrl" value={content.telegramUrl || ''} onChange={handleChange} style={inputStyle} placeholder="https://t.me/jaipurartcnc" />
            </label>
            <label style={labelStyle}>
              Threads Profile URL
              <input type="text" name="threadsUrl" value={content.threadsUrl || ''} onChange={handleChange} style={inputStyle} placeholder="https://threads.net/@jaipurartcnc" />
            </label>
          </div>
        </div>

        {/* Page Header Background Images */}
        <div style={cardStyle}>
          <h3 style={sectionHeaderStyle}><ImageIcon color="var(--brick)" /> Page Header Background Images</h3>
          <p style={{ color: 'var(--walnut)', marginBottom: '24px', fontSize: '0.95rem' }}>Upload the wood header background images displayed at the top of subpages.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
            <MediaUploader label="Services Header" fieldName="servicesHeroImage" />
            <MediaUploader label="Creations Header" fieldName="creationsHeroImage" />
            <MediaUploader label="About Us Header" fieldName="aboutHeroImage" />
            <MediaUploader label="Contact Us Header" fieldName="contactHeroImage" />
          </div>
        </div>

        {/* Website Content Media & Videos */}
        <div style={cardStyle}>
          <h3 style={sectionHeaderStyle}><Video color="var(--brick)" /> Website Content Media & Videos</h3>
          <p style={{ color: 'var(--walnut)', marginBottom: '24px', fontSize: '0.95rem' }}>Upload specific videos and images used within the Services and About Us content sections.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
            <MediaUploader label="Services: All We Need Video" fieldName="servicesVideoUrl" />
            <MediaUploader label="About Us: Family Carpentry Image" fieldName="ourStoryImage" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
