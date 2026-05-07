import { useState, useEffect } from 'react';
import axios from 'axios';
import { Building2, Share2, Image as ImageIcon, Save, UploadCloud, BarChart2 } from 'lucide-react';

const Settings = () => {
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/content')
      .then(res => setContent(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
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
      setContent({ ...content, [fieldName]: uploadRes.data.url });
    } catch (err) {
      alert('Error uploading image');
    }
    setUploadingImage(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put('http://localhost:5000/api/content', content);
      alert('Settings saved successfully!');
    } catch (err) {
      alert('Error saving settings.');
    }
    setSaving(false);
  };

  if (!content) return <div style={{ padding: '40px', color: '#666' }}>Loading settings...</div>;

  const cardStyle = {
    background: 'white',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    marginBottom: '32px'
  };

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '1.4rem',
    color: '#323232',
    borderBottom: '1px solid #eee',
    paddingBottom: '16px',
    marginBottom: '24px'
  };

  const labelStyle = { display: 'block', marginBottom: '16px', fontWeight: '600', color: '#444' };
  const inputStyle = { 
    width: '100%', 
    padding: '12px', 
    marginTop: '8px', 
    border: '1px solid #ddd', 
    borderRadius: '6px',
    background: '#fafafa',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const ImageUploader = ({ label, fieldName }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#fafafa', border: '1px solid #eaeaea', borderRadius: '8px', transition: 'border-color 0.2s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '8px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid #eee', flexShrink: 0 }}>
          {content[fieldName] ? (
            <img src={`http://localhost:5000${content[fieldName]}`} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <ImageIcon size={24} color="#ccc" />
          )}
        </div>
        <div>
          <h4 style={{ margin: '0 0 6px 0', color: '#333', fontSize: '1rem', fontWeight: '600' }}>{label}</h4>
          <p style={{ margin: 0, fontSize: '0.85rem', color: content[fieldName] ? '#4caf50' : '#888' }}>
            {content[fieldName] ? 'Image uploaded' : 'No image selected'}
          </p>
        </div>
      </div>
      
      <div style={{ position: 'relative' }}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => handleImageUpload(e, fieldName)} 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
        />
        <button type="button" style={{ pointerEvents: 'none', background: 'white', color: '#323232', border: '1px solid #ddd', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '500', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <UploadCloud size={16} />
          {uploadingImage === fieldName ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );

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
          <h3 style={sectionHeaderStyle}><Building2 color="#8b7355" /> Business Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <label style={labelStyle}>
              Site/Business Name
              <input type="text" name="siteName" value={content.siteName || ''} onChange={handleChange} style={inputStyle} />
            </label>
            <label style={labelStyle}>
              Contact Number
              <input type="text" name="contactPhone" value={content.contactPhone || ''} onChange={handleChange} style={inputStyle} />
            </label>
            <label style={labelStyle}>
              Contact Email
              <input type="email" name="contactEmail" value={content.contactEmail || ''} onChange={handleChange} style={inputStyle} />
            </label>
            <label style={labelStyle}>
              WhatsApp Number (for direct messages)
              <input type="text" name="whatsappUrl" value={content.whatsappUrl || ''} onChange={handleChange} style={inputStyle} placeholder="https://wa.me/919001021857" />
            </label>
            <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>
              Physical Address
              <input type="text" name="address" value={content.address || ''} onChange={handleChange} style={inputStyle} />
            </label>
            <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>
              Location URL (Google Maps Link)
              <input type="text" name="locationUrl" value={content.locationUrl || ''} onChange={handleChange} style={inputStyle} />
            </label>
          </div>
        </div>

        {/* Business Metrics */}
        <div style={cardStyle}>
          <h3 style={sectionHeaderStyle}><BarChart2 color="#8b7355" /> Business Metrics</h3>
          <p style={{ color: '#666', marginBottom: '24px', fontSize: '0.95rem' }}>Update the statistics displayed on your dashboard and public site.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <label style={labelStyle}>
              Happy Customers Count
              <input type="text" name="happyCustomersCount" value={content.happyCustomersCount || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. 5,000+" />
            </label>
            <label style={labelStyle}>
              Completed Projects Count
              <input type="text" name="completedProjectsCount" value={content.completedProjectsCount || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. 12,500" />
            </label>
            <label style={labelStyle}>
              Active Resources Count
              <input type="text" name="activeResourcesCount" value={content.activeResourcesCount || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. 45" />
            </label>
            <label style={labelStyle}>
              Total Branches Count
              <input type="text" name="totalBranchesCount" value={content.totalBranchesCount || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. 3" />
            </label>
          </div>
        </div>

        {/* Social Media Links */}
        <div style={cardStyle}>
          <h3 style={sectionHeaderStyle}><Share2 color="#8b7355" /> Social Media Links</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <label style={labelStyle}>
              Facebook URL
              <input type="text" name="facebookUrl" value={content.facebookUrl || ''} onChange={handleChange} style={inputStyle} />
            </label>
            <label style={labelStyle}>
              Instagram URL
              <input type="text" name="instagramUrl" value={content.instagramUrl || ''} onChange={handleChange} style={inputStyle} />
            </label>
            <label style={labelStyle}>
              YouTube URL
              <input type="text" name="youtubeUrl" value={content.youtubeUrl || ''} onChange={handleChange} style={inputStyle} />
            </label>
          </div>
        </div>

        {/* Page Hero Images */}
        <div style={cardStyle}>
          <h3 style={sectionHeaderStyle}><ImageIcon color="#8b7355" /> Page Hero Images</h3>
          <p style={{ color: '#666', marginBottom: '24px', fontSize: '0.95rem' }}>Upload the main background images that appear at the top of each page.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
            <ImageUploader label="Home Page Hero" fieldName="homeHeroImage" />
            <ImageUploader label="Our Services Hero" fieldName="servicesHeroImage" />
            <ImageUploader label="Creations Hero" fieldName="creationsHeroImage" />
            <ImageUploader label="About Us Hero" fieldName="aboutHeroImage" />
            <ImageUploader label="Contact Hero" fieldName="contactHeroImage" />
          </div>
        </div>

        {/* Branding & Content Images */}
        <div style={cardStyle}>
          <h3 style={sectionHeaderStyle}><ImageIcon color="#8b7355" /> Branding & Content Images</h3>
          <p style={{ color: '#666', marginBottom: '24px', fontSize: '0.95rem' }}>Upload your logo and specific images used within the About Us content blocks.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
            <ImageUploader label="Website Logo" fieldName="logoUrl" />
            <ImageUploader label="Our Story Image" fieldName="ourStoryImage" />
            <ImageUploader label="About Us Content Image" fieldName="aboutContentImage" />
            <ImageUploader label="Timeless Craftsmanship Image" fieldName="craftsmanshipImage" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
