import { useState, useEffect, useRef } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import axios from 'axios';

const GalleryManager = () => {
  const [content, setContent] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = () => {
    axios.get('http://localhost:5000/api/content')
      .then(res => setContent(res.data))
      .catch(err => console.error(err));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      // 1. Upload image to get URL
      const uploadRes = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const imageUrl = uploadRes.data.url;

      // 2. Add to SiteContent
      const updatedContent = { ...content };
      if (!updatedContent.galleryImages) updatedContent.galleryImages = [];
      
      const category = window.prompt("Enter category (e.g., MDF, Acrylic, Stone):", "Wood");
      const title = window.prompt("Enter project title:", "New CNC Creation");

      updatedContent.galleryImages.push({
        url: imageUrl,
        title: title || 'Untitled',
        category: category || 'General'
      });

      await axios.put('http://localhost:5000/api/content', updatedContent);
      setContent(updatedContent);
      alert('Image uploaded successfully!');
    } catch (err) {
      alert('Error uploading image');
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteImage = async (index) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    const updatedContent = { ...content };
    updatedContent.galleryImages.splice(index, 1);

    try {
      await axios.put('http://localhost:5000/api/content', updatedContent);
      setContent(updatedContent);
    } catch (err) {
      alert('Error deleting image.');
    }
  };

  if (!content) return <div>Loading gallery...</div>;
  const images = content.galleryImages || [];

  return (
    <div style={{ background: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>Gallery Uploads</h2>
        <div>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            style={{ display: 'none' }} 
          />
          <button 
            disabled={uploading}
            onClick={() => fileInputRef.current.click()} 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#323232', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            <Upload size={18} /> {uploading ? 'Uploading...' : 'Upload New Image'}
          </button>
        </div>
      </div>

      {images.length === 0 ? (
        <p>No images in gallery yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {images.map((img, idx) => (
            <div key={idx} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ height: '150px', background: '#f5f2f0' }}>
                <img src={`http://localhost:5000${img.url}`} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => {e.target.src = "https://via.placeholder.com/200"}} />
              </div>
              <div style={{ padding: '12px' }}>
                <h4 style={{ margin: '0 0 4px 0' }}>{img.title}</h4>
                <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#666' }}>{img.category}</p>
                <button onClick={() => handleDeleteImage(idx)} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#d32f2f', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '0.9rem' }}>
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
