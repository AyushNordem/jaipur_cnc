import { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/content')
      .then(res => setContent(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const uploadRes = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setContent({ ...content, ourStoryImage: uploadRes.data.url });
    } catch (err) {
      alert('Error uploading image');
    }
    setUploadingImage(false);
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

  if (!content) return <div>Loading settings...</div>;

  const inputStyle = { width: '100%', padding: '10px', marginTop: '6px', border: '1px solid #ccc', borderRadius: '4px' };
  const labelStyle = { display: 'block', marginBottom: '16px', fontWeight: '600' };

  return (
    <div style={{ background: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', maxWidth: '800px' }}>
      <form onSubmit={handleSave}>
        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '24px' }}>Business Details</h3>
        
        <label style={labelStyle}>
          Site Name
          <input type="text" name="siteName" value={content.siteName || ''} onChange={handleChange} style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Contact Phone
          <input type="text" name="contactPhone" value={content.contactPhone || ''} onChange={handleChange} style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Contact Email
          <input type="email" name="contactEmail" value={content.contactEmail || ''} onChange={handleChange} style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Physical Address
          <input type="text" name="address" value={content.address || ''} onChange={handleChange} style={inputStyle} />
        </label>

        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '24px', marginTop: '40px' }}>About Page</h3>
        <label style={labelStyle}>
          Our Story Image
          {content.ourStoryImage && (
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
              <img src={`http://localhost:5000${content.ourStoryImage}`} alt="Our Story" style={{ maxWidth: '200px', display: 'block', borderRadius: '8px', border: '1px solid #eee' }} />
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} style={inputStyle} />
          {uploadingImage && <span style={{ color: '#666', fontSize: '0.9rem', display: 'block', marginTop: '4px' }}>Uploading image...</span>}
        </label>

        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '24px', marginTop: '40px' }}>Social Media Links</h3>
        <label style={labelStyle}>
          Facebook URL
          <input type="text" name="facebookUrl" value={content.facebookUrl || ''} onChange={handleChange} style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Instagram URL
          <input type="text" name="instagramUrl" value={content.instagramUrl || ''} onChange={handleChange} style={inputStyle} />
        </label>
        <label style={labelStyle}>
          WhatsApp URL (https://wa.me/...)
          <input type="text" name="whatsappUrl" value={content.whatsappUrl || ''} onChange={handleChange} style={inputStyle} />
        </label>

        <button type="submit" disabled={saving || uploadingImage} style={{ padding: '12px 24px', background: '#323232', color: 'white', border: 'none', borderRadius: '4px', cursor: (saving || uploadingImage) ? 'not-allowed' : 'pointer', marginTop: '24px', fontSize: '1rem' }}>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default Settings;
