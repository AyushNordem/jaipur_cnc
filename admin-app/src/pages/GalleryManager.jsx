import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Upload, Trash2, Edit2, Plus, Image as ImageIcon, Tag, Grid, AlertCircle, AlertTriangle, CheckCircle2, X, Filter } from 'lucide-react';

const CATEGORIES = [
  'General',
  'MDF Cutting',
  'Wood Carving',
  'Acrylic 3D',
  'Plywood Signage',
  'Solid Wood',
  'HDHMR Board'
];

const GalleryManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [formData, setFormData] = useState({
    title: '',
    category: 'MDF Cutting',
    imageUrl: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/gallery');
      const data = res.data.data || res.data || [];
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching gallery creations:', err);
      setNotification({
        type: 'error',
        title: 'Fetch Error',
        message: 'Failed to load creation gallery from server.'
      });
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name] && value.trim()) {
      setErrors(prev => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const uploadForm = new FormData();
    uploadForm.append('image', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', uploadForm, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const url = res.data.data?.url || res.data.url;
      setFormData(prev => ({ ...prev, imageUrl: url }));

      if (errors.imageUrl) {
        setErrors(prev => {
          const newErr = { ...prev };
          delete newErr.imageUrl;
          return newErr;
        });
      }

      setNotification({
        type: 'success',
        title: 'Image Uploaded',
        message: 'Creation photo successfully uploaded to Cloudinary!'
      });
    } catch (err) {
      setNotification({
        type: 'error',
        title: 'Upload Error',
        message: err.response?.data?.error || 'Failed to upload creation image. Please try again.'
      });
    }
    setUploadingImage(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();

    // Field-level validation
    const newErrors = {};
    if (!formData.title || !formData.title.trim()) {
      newErrors.title = 'Creation Title is required';
    }
    if (!formData.imageUrl || !formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Creation Image is required. Please upload an image.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstKey}"]`) || document.getElementById(`field-${firstKey}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (element.focus) element.focus();
      }
      return;
    }

    setErrors({});
    setSaving(true);

    try {
      if (editingId) {
        // Update item
        await axios.put(`http://localhost:5000/api/gallery/${editingId}`, formData);
        setNotification({
          type: 'success',
          title: 'Creation Updated',
          message: 'Gallery creation updated successfully!'
        });
      } else {
        // Create new item
        await axios.post('http://localhost:5000/api/gallery', formData);
        setNotification({
          type: 'success',
          title: 'Creation Added',
          message: 'New creation uploaded to gallery successfully!'
        });
      }

      resetForm();
      fetchGalleryItems();
    } catch (err) {
      setNotification({
        type: 'error',
        title: 'Save Failed',
        message: err.response?.data?.error || 'Failed to save creation to database.'
      });
    }
    setSaving(false);
  };

  const handleEditItem = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || '',
      category: item.category || 'General',
      imageUrl: item.imageUrl || '',
      description: item.description || ''
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteItem = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}" from gallery?`)) return;

    try {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`);
      setNotification({
        type: 'success',
        title: 'Creation Deleted',
        message: `"${title}" deleted from gallery successfully.`
      });
      if (editingId === id) resetForm();
      fetchGalleryItems();
    } catch (err) {
      setNotification({
        type: 'error',
        title: 'Delete Failed',
        message: 'Failed to delete creation item from database.'
      });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'MDF Cutting',
      imageUrl: '',
      description: ''
    });
    setErrors({});
  };

  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const cardStyle = {
    background: 'var(--paper)',
    padding: '32px',
    borderRadius: '8px',
    border: '1px solid var(--line)',
    boxShadow: 'var(--shadow)',
    marginBottom: '32px'
  };

  const labelStyle = { display: 'block', marginBottom: '16px', fontWeight: '600', color: 'var(--espresso)', fontSize: '14px' };

  const getInputStyle = (fieldName) => ({
    width: '100%',
    padding: '12px',
    marginTop: '8px',
    border: errors[fieldName] ? '2px solid var(--brick)' : '1px solid var(--line)',
    boxShadow: errors[fieldName] ? '0 0 0 3px rgba(168, 61, 44, 0.15)' : 'none',
    backgroundColor: errors[fieldName] ? '#FFF9F8' : '#ffffff',
    borderRadius: '4px',
    color: 'var(--espresso)',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none',
    boxSizing: 'border-box'
  });

  const renderError = (fieldName) => (
    errors[fieldName] ? (
      <span style={{ color: 'var(--brick)', fontSize: '0.81rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
        <AlertCircle size={14} /> {errors[fieldName]}
      </span>
    ) : null
  );

  return (
    <div style={{ maxWidth: '1200px', paddingBottom: '60px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#323232', margin: '0 0 8px 0' }}>Gallery Manager</h1>
          <p style={{ color: '#666', margin: 0 }}>Upload and manage your CNC creations, patterns, and finished projects.</p>
        </div>
      </div>

      {/* Creation Upload / Edit Form */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: 'var(--espresso)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {editingId ? <Edit2 color="var(--brick)" size={22} /> : <Plus color="var(--brass)" size={22} />}
            {editingId ? 'Edit Gallery Creation' : 'Upload New Creation'}
          </h3>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ background: 'transparent', border: 'none', color: 'var(--brick)', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <X size={18} /> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSaveItem}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            <label style={labelStyle}>
              Creation Title <span style={{ color: 'var(--brick)' }}>*</span>
              <input type="text" name="title" value={formData.title} onChange={handleChange} style={getInputStyle('title')} placeholder="e.g. Royal Temple MDF Jali Panel" />
              {renderError('title')}
            </label>

            <label style={labelStyle}>
              Material / Category
              <select name="category" value={formData.category} onChange={handleChange} style={getInputStyle('category')}>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </label>

            <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>
              Project Description (Optional)
              <input type="text" name="description" value={formData.description} onChange={handleChange} style={getInputStyle('description')} placeholder="e.g. 8x4 ft custom carved 3D wooden relief work (Optional)" />
            </label>

            {/* Cloudinary Image Upload Box */}
            <div id="field-imageUrl" style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>
                Creation Photo <span style={{ color: 'var(--brick)' }}>*</span>
              </label>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                background: errors.imageUrl ? '#FFF9F8' : 'var(--cream)',
                border: errors.imageUrl ? '2px solid var(--brick)' : '1px solid var(--line)',
                borderRadius: '6px',
                boxShadow: errors.imageUrl ? '0 0 0 3px rgba(168, 61, 44, 0.15)' : 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '6px',
                    background: 'var(--paper)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    border: '1px solid var(--line)',
                    flexShrink: 0
                  }}>
                    {formData.imageUrl ? (
                      <img src={formData.imageUrl} alt="Creation Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <ImageIcon size={32} color={errors.imageUrl ? 'var(--brick)' : 'var(--walnut)'} />
                    )}
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 6px 0', color: 'var(--espresso)', fontSize: '1rem', fontWeight: '600', fontFamily: 'var(--font-heading)' }}>
                      {formData.title || 'Upload Creation Photo'}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.84rem', color: formData.imageUrl ? 'var(--brass)' : (errors.imageUrl ? 'var(--brick)' : 'var(--walnut)'), wordBreak: 'break-all' }}>
                      {formData.imageUrl ? (
                        <span>
                          Image uploaded &bull;{' '}
                          <a href={formData.imageUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brass)', textDecoration: 'underline', fontWeight: '600' }}>
                            View Full Asset
                          </a>
                        </span>
                      ) : 'Select a photo of your CNC work to upload to Cloudinary'}
                    </p>
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                  />
                  <button type="button" style={{
                    pointerEvents: 'none',
                    background: 'var(--paper)',
                    color: 'var(--espresso)',
                    border: '1px solid var(--line)',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    <Upload size={18} />
                    {uploadingImage ? 'Uploading...' : 'Upload Photo'}
                  </button>
                </div>
              </div>
              {renderError('imageUrl')}
            </div>

          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '28px' }}>
            <button type="submit" disabled={saving || uploadingImage} style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #8b7355 0%, #6e5a42 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(139, 115, 85, 0.3)'
            }}>
              {saving ? 'Saving...' : (editingId ? 'Update Creation' : 'Publish Creation')}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} style={{ padding: '12px 20px', background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '6px', fontWeight: '600', color: 'var(--espresso)', cursor: 'pointer' }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Filter Tabs & Creation Gallery */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: 'var(--espresso)', margin: 0 }}>
            Creations Gallery ({filteredItems.length})
          </h3>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Filter size={16} color="var(--walnut)" />
            {['All', ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid var(--line)',
                  background: selectedCategory === cat ? 'var(--espresso)' : 'var(--paper)',
                  color: selectedCategory === cat ? 'var(--paper)' : 'var(--espresso)',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', color: 'var(--walnut)' }}>Loading creation gallery from database...</div>
        ) : filteredItems.length === 0 ? (
          <div style={{ padding: '40px', background: 'var(--paper)', borderRadius: '8px', border: '1px solid var(--line)', textAlign: 'center', color: 'var(--walnut)' }}>
            No creations found under "{selectedCategory}". Upload your first creation above!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {filteredItems.map((item) => (
              <div key={item._id} style={{ background: 'var(--paper)', borderRadius: '8px', border: '1px solid var(--line)', overflow: 'hidden', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ height: '180px', background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
                    <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(30, 20, 14, 0.8)', color: 'var(--paper)', fontSize: '0.75rem', fontWeight: '700', padding: '4px 10px', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>
                      {item.category || 'General'}
                    </span>
                  </div>

                  <div style={{ padding: '16px' }}>
                    <h4 style={{ margin: '0 0 6px 0', color: 'var(--espresso)', fontSize: '1.05rem', fontFamily: 'var(--font-heading)' }}>{item.title}</h4>
                    {item.description && (
                      <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--walnut)', lineHeight: 1.4 }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--line)', background: 'var(--cream)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--walnut)' }}>
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recent'}
                  </span>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEditItem(item)} style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '4px', padding: '6px', cursor: 'pointer', color: 'var(--espresso)' }} title="Edit Creation">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteItem(item._id, item.title)} style={{ background: 'rgba(168, 61, 44, 0.1)', border: '1px solid rgba(168, 61, 44, 0.3)', borderRadius: '4px', padding: '6px', cursor: 'pointer', color: 'var(--brick)' }} title="Delete Creation">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Theme Notification Popup Modal */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(30, 20, 14, 0.65)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--paper)',
            borderRadius: '10px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
            border: `2px solid ${notification.type === 'error' ? 'var(--brick)' : 'var(--brass)'}`,
            width: '100%',
            maxWidth: '420px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ height: '6px', backgroundColor: notification.type === 'error' ? 'var(--brick)' : 'var(--brass)' }} />
            
            <div style={{ padding: '28px 24px', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: notification.type === 'error' ? 'rgba(168, 61, 44, 0.12)' : 'rgba(184, 137, 43, 0.12)',
                color: notification.type === 'error' ? 'var(--brick)' : 'var(--brass)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                {notification.type === 'error' ? <AlertTriangle size={32} /> : <CheckCircle2 size={32} />}
              </div>

              <h3 style={{ margin: '0 0 10px 0', fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--espresso)', fontWeight: '700' }}>
                {notification.title}
              </h3>
              <p style={{ margin: '0 0 24px 0', color: 'var(--walnut)', fontSize: '0.98rem', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
                {notification.message}
              </p>

              <button
                type="button"
                onClick={() => setNotification(null)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  backgroundColor: notification.type === 'error' ? 'var(--brick)' : 'var(--espresso)',
                  color: 'var(--paper)',
                  border: 'none',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                Okay, Got it
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GalleryManager;
