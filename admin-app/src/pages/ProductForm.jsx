import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save, Upload, Image as ImageIcon, Trash2, Plus, Bold, List, Code, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { API_BASE_URL, getFullMediaUrl } from '../config';

const CATEGORY_OPTIONS = [
  "3D Design",
  "2D Design",
  "Temple & Mandir",
  "Door Design"
];

const DEFAULT_DESCRIPTION = `<p><strong>Get design files on WhatsApp immediately after purchase.</strong></p>
<ul>
  <li><strong>Files:</strong> RLF File (Artcam Relief File For All Versions of Artcam)</li>
  <li><strong>Files:</strong> STL File (3Ds Max, JDPaint, AutoCAD, Maya, Aspire)</li>
  <li><strong>Size:</strong> Adjustable (8x4 Ft)</li>
  <li><strong>Delivery Time:</strong> Instant delivery on WhatsApp</li>
</ul>
<p><em>If any error in files, please request on WhatsApp Helpline. We will provide updated files within 24 hours.</em></p>`;

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id) && id !== 'new';

  const [loading, setLoading] = useState(isEditing);
  const [uploadingMaster, setUploadingMaster] = useState(false);
  const [uploadingSub, setUploadingSub] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form State
  const [masterImage, setMasterImage] = useState('');
  const [subImages, setSubImages] = useState([]);
  const [newSubUrl, setNewSubUrl] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    designCode: '',
    category: '3D Design',
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    size: '8x4 Size (Adjustable)',
    fileFormats: 'RLF, STL',
    software: 'Artcam, JDPaint, 3ds Max',
    description: DEFAULT_DESCRIPTION,
    inStock: true,
    featured: false
  });

  const showNotify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const generateDesignCode = (categoryName) => {
    const bizPrefix = "JAC"; // Jaipur Art CNC
    let catCode = "3D";
    
    if (categoryName === "2D Design") catCode = "2D";
    else if (categoryName === "Temple & Mandir") catCode = "TM";
    else if (categoryName === "Door Design") catCode = "DR";
    else if (categoryName === "3D Design") catCode = "3D";

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `${bizPrefix}-${catCode}-${randomSuffix}`;
  };

  const handleAutoGenerateCode = () => {
    const newCode = generateDesignCode(formData.category);
    setFormData(prev => ({ ...prev, designCode: newCode }));
    showNotify(`Generated new design code: ${newCode}`);
  };

  useEffect(() => {
    if (isEditing) {
      axios.get(`${API_BASE_URL}/api/products/${id}`)
        .then(res => {
          const prod = res.data;
          if (prod) {
            const imgs = prod.images || [];
            setMasterImage(imgs[0] || '');
            setSubImages(imgs.slice(1));
            setFormData({
              title: prod.title || '',
              designCode: prod.designCode || '',
              category: prod.category || '3D Design',
              price: prod.price || 480,
              originalPrice: prod.originalPrice || 500,
              discountPercent: prod.discountPercent || 4,
              size: prod.size || '8x4 Size (Adjustable)',
              fileFormats: Array.isArray(prod.fileFormats) ? prod.fileFormats.join(', ') : (prod.fileFormats || 'RLF, STL'),
              software: Array.isArray(prod.software) ? prod.software.join(', ') : (prod.software || 'Artcam, JDPaint'),
              description: prod.description || DEFAULT_DESCRIPTION,
              inStock: prod.inStock !== false,
              featured: Boolean(prod.featured)
            });
          }
        })
        .catch(err => {
          showNotify('Failed to fetch product details', 'error');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Auto-generate unique design code for new product
      setFormData(prev => ({
        ...prev,
        designCode: generateDesignCode(prev.category)
      }));
    }
  }, [id, isEditing]);

  // Master Image File Upload
  const handleMasterUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    setUploadingMaster(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/upload`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const uploadedUrl = res.data?.data?.url || res.data?.url || res.data?.secure_url || (typeof res.data === 'string' ? res.data : '');
      
      if (uploadedUrl && typeof uploadedUrl === 'string') {
        setMasterImage(uploadedUrl);
        showNotify('Master image uploaded successfully!');
      } else {
        showNotify('Failed to retrieve image URL after upload', 'error');
      }
    } catch (err) {
      console.error('Master upload error:', err);
      showNotify('Upload failed. You can paste direct image URL below.', 'error');
    } finally {
      setUploadingMaster(false);
      e.target.value = '';
    }
  };

  // Sub Image File Upload
  const handleSubUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    setUploadingSub(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/upload`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const uploadedUrl = res.data?.data?.url || res.data?.url || res.data?.secure_url || (typeof res.data === 'string' ? res.data : '');

      if (uploadedUrl && typeof uploadedUrl === 'string') {
        setSubImages(prev => [...prev, uploadedUrl]);
        showNotify('Sub image added to product gallery!');
      } else {
        showNotify('Failed to retrieve sub image URL', 'error');
      }
    } catch (err) {
      console.error('Sub upload error:', err);
      showNotify('Upload failed. Paste direct URL below.', 'error');
    } finally {
      setUploadingSub(false);
      e.target.value = '';
    }
  };

  const addSubUrl = () => {
    if (!newSubUrl.trim()) return;
    setSubImages(prev => [...prev, newSubUrl.trim()]);
    setNewSubUrl('');
    showNotify('Sub image added!');
  };

  const removeSubImage = (index) => {
    setSubImages(prev => prev.filter((_, i) => i !== index));
  };

  // HTML Toolbar Quick Formatting Helpers
  const insertHtml = (snippet) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description + snippet
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const allImages = [masterImage, ...subImages].filter(Boolean);

      const fileFormatsArr = Array.isArray(formData.fileFormats)
        ? formData.fileFormats
        : (typeof formData.fileFormats === 'string' ? formData.fileFormats.split(',').map(s => s.trim()).filter(Boolean) : ['RLF', 'STL']);

      const softwareArr = Array.isArray(formData.software)
        ? formData.software
        : (typeof formData.software === 'string' ? formData.software.split(',').map(s => s.trim()).filter(Boolean) : ['Artcam']);

      const payload = {
        ...formData,
        price: Number(formData.price) || 0,
        originalPrice: Number(formData.originalPrice) || 0,
        discountPercent: Number(formData.discountPercent) || 0,
        fileFormats: fileFormatsArr,
        software: softwareArr,
        images: allImages
      };

      if (isEditing) {
        await axios.put(`${API_BASE_URL}/api/products/${id}`, payload);
        showNotify('Product updated successfully!');
      } else {
        await axios.post(`${API_BASE_URL}/api/products`, payload);
        showNotify('New product created successfully!');
      }

      setTimeout(() => {
        navigate('/products');
      }, 1200);

    } catch (err) {
      console.error('Error saving product:', err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to save product';
      showNotify(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--walnut)' }}>
        Loading product information...
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      
      {/* Top Header */}
      <div style={{ marginBottom: '24px' }}>
        <Link 
          to="/products" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: 'var(--brick, #a83d2c)', 
            textDecoration: 'none', 
            fontSize: '14px', 
            fontWeight: '600', 
            marginBottom: '12px' 
          }}
        >
          <ArrowLeft size={16} /> Back to Products List
        </Link>

        <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1.75rem' }}>
          {isEditing ? `Edit Product: ${formData.designCode || 'Item'}` : 'Add New Product Model'}
        </h2>
        <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
          Manage Master image, product gallery photos, and HTML description.
        </p>
      </div>

      {notification && (
        <div style={{ 
          padding: '12px 16px', 
          borderRadius: '6px', 
          marginBottom: '20px', 
          backgroundColor: notification.type === 'error' ? '#fef2f2' : '#ecfdf5', 
          color: notification.type === 'error' ? '#991b1b' : '#065f46',
          border: `1px solid ${notification.type === 'error' ? '#fecaca' : '#a7f3d0'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {notification.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
          {notification.msg}
        </div>
      )}

      {/* Main Form Container */}
      <div style={{ 
        backgroundColor: 'var(--paper, #faf5ea)', 
        borderRadius: '8px', 
        border: '1px solid var(--line, rgba(46,33,22,0.14))', 
        padding: '32px',
        boxShadow: 'var(--shadow-soft, 0 18px 40px -22px rgba(46,33,22,0.35))'
      }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Section 1: Title & Code */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--espresso)', marginBottom: '6px' }}>
                Design Title *
              </label>
              <input 
                type="text" 
                required 
                placeholder="e.g. 3DWP-3028 3D Wall Panel 3D Model 8x4" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--espresso)', fontSize: '14px' }} 
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--espresso)' }}>
                  Design Code *
                </label>
                <button 
                  type="button" 
                  onClick={handleAutoGenerateCode}
                  style={{ background: 'none', border: 'none', color: 'var(--brick)', fontSize: '12px', fontWeight: '700', cursor: 'pointer', padding: 0 }}
                  title="Auto Generate Unique Design Code"
                >
                  ⚡ Auto Generate Code
                </button>
              </div>
              <input 
                type="text" 
                required 
                placeholder="e.g. JAC-3D-3028" 
                value={formData.designCode} 
                onChange={e => setFormData({...formData, designCode: e.target.value})} 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--brick)', fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: '700' }} 
              />
            </div>
          </div>

          {/* Section 2: Category & Pricing */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--espresso)', marginBottom: '6px' }}>
                Category
              </label>
              <select 
                value={formData.category} 
                onChange={e => {
                  const newCat = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    category: newCat,
                    designCode: !isEditing ? generateDesignCode(newCat) : prev.designCode
                  }));
                }} 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--espresso)', fontSize: '14px' }}
              >
                {CATEGORY_OPTIONS.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--espresso)', marginBottom: '6px' }}>
                Sale Price (₹) *
              </label>
              <input 
                type="number" 
                required 
                value={formData.price} 
                onChange={e => setFormData({...formData, price: e.target.value})} 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--brick)', fontWeight: '700', fontSize: '15px' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--espresso)', marginBottom: '6px' }}>
                Original Price (₹)
              </label>
              <input 
                type="number" 
                value={formData.originalPrice} 
                onChange={e => setFormData({...formData, originalPrice: e.target.value})} 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--espresso)', fontSize: '14px' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--espresso)', marginBottom: '6px' }}>
                Discount %
              </label>
              <input 
                type="number" 
                value={formData.discountPercent} 
                onChange={e => setFormData({...formData, discountPercent: e.target.value})} 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--espresso)', fontSize: '14px' }} 
              />
            </div>
          </div>

          {/* Section 3: Master Image vs Sub Images Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {/* 3A: Master Image (Main Listing Image) */}
            <div style={{ padding: '20px', background: 'var(--cream)', borderRadius: '6px', border: '1.5px solid var(--brass)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--espresso)' }}>
                  ★ Master Product Image (Main Image)
                </label>
                <span style={{ fontSize: '11px', background: 'var(--brass)', color: '#fff', padding: '2px 6px', borderRadius: '2px', fontWeight: '700' }}>1st Image</span>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>
                This is the primary image shown in the shop list and main detail view.
              </p>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ padding: '8px 14px', background: 'var(--paper)', border: '1px solid var(--brass)', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600', color: 'var(--espresso)' }}>
                  <Upload size={14} /> Upload Master Image File
                  <input type="file" accept="image/*" onChange={handleMasterUpload} style={{ display: 'none' }} />
                </label>
                {uploadingMaster && <span style={{ fontSize: '12px', color: 'var(--walnut)' }}>Uploading...</span>}
              </div>

              <input 
                type="text" 
                placeholder="Or paste direct Master Image URL (https://...)" 
                value={masterImage} 
                onChange={e => setMasterImage(e.target.value)} 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--paper)', fontSize: '13px' }} 
              />

              {masterImage && (
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '90px', height: '90px', borderRadius: '4px', overflow: 'hidden', border: '2px solid var(--brass)' }}>
                    <img src={getFullMediaUrl(masterImage)} alt="Master Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--brick)' }}>Primary Master Listing Photo</span>
                </div>
              )}
            </div>

            {/* 3B: Sub Images (Product Gallery Images) */}
            <div style={{ padding: '20px', background: 'var(--cream)', borderRadius: '6px', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--espresso)' }}>
                  🖼️ Sub Images (Product Gallery Images)
                </label>
                <span style={{ fontSize: '11px', color: 'var(--walnut)', fontWeight: '600' }}>{subImages.length} Sub Images</span>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>
                Add extra angle views, relief renders, or material texture photos.
              </p>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ padding: '8px 14px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600', color: 'var(--espresso)' }}>
                  <Upload size={14} /> Upload Sub Image File
                  <input type="file" accept="image/*" onChange={handleSubUpload} style={{ display: 'none' }} />
                </label>
                {uploadingSub && <span style={{ fontSize: '12px', color: 'var(--walnut)' }}>Uploading...</span>}
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input 
                  type="text" 
                  placeholder="Or paste Sub Image URL..." 
                  value={newSubUrl} 
                  onChange={e => setNewSubUrl(e.target.value)} 
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--paper)', fontSize: '13px' }} 
                />
                <button type="button" onClick={addSubUrl} style={{ padding: '8px 14px', background: 'var(--espresso)', color: 'var(--paper)', border: 'none', borderRadius: '4px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                  Add Sub URL
                </button>
              </div>

              {/* Sub Images Gallery Grid */}
              {subImages.length > 0 && (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                  {subImages.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--line)' }}>
                      <img src={getFullMediaUrl(img)} alt={`Sub ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button 
                        type="button" 
                        onClick={() => removeSubImage(idx)} 
                        style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(220, 38, 38, 0.85)', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Delete sub image"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Section 4: File Formats & Software */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--espresso)', marginBottom: '6px' }}>
                File Formats (comma separated)
              </label>
              <input 
                type="text" 
                value={formData.fileFormats} 
                onChange={e => setFormData({...formData, fileFormats: e.target.value})} 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--cream)', fontSize: '14px' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--espresso)', marginBottom: '6px' }}>
                Compatible Software (comma separated)
              </label>
              <input 
                type="text" 
                value={formData.software} 
                onChange={e => setFormData({...formData, software: e.target.value})} 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--cream)', fontSize: '14px' }} 
              />
            </div>
          </div>

          {/* Section 5: HTML Description & Delivery Instructions Input */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--espresso)' }}>
                📝 Description &amp; Delivery Instructions (HTML Input)
              </label>
              <span style={{ fontSize: '12px', color: 'var(--walnut)' }}>Supports HTML Tags (&lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;br&gt;)</span>
            </div>

            {/* Quick HTML Formatting Toolbar */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                onClick={() => insertHtml('<strong>Bold Text</strong>')} 
                style={{ padding: '5px 10px', background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}
              >
                <Bold size={13} /> Bold
              </button>
              <button 
                type="button" 
                onClick={() => insertHtml('\n<ul>\n  <li>List Item 1</li>\n  <li>List Item 2</li>\n</ul>')} 
                style={{ padding: '5px 10px', background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}
              >
                <List size={13} /> Bullet List
              </button>
              <button 
                type="button" 
                onClick={() => insertHtml('<br/>\n')} 
                style={{ padding: '5px 10px', background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}
              >
                Line Break
              </button>
              <button 
                type="button" 
                onClick={() => insertHtml('<p><strong>WhatsApp Note:</strong> Get design files on WhatsApp immediately after purchase.</p>')} 
                style={{ padding: '5px 10px', background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600', color: 'var(--brick)' }}
              >
                + WhatsApp Delivery Note
              </button>
            </div>

            <textarea 
              rows="6" 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              style={{ width: '100%', padding: '12px 14px', borderRadius: '4px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--espresso)', fontSize: '14px', fontFamily: 'monospace', lineHeight: '1.5' }}
            ></textarea>

            {/* Formatted HTML Live Preview */}
            <div style={{ marginTop: '14px', padding: '16px', background: '#fff', border: '1px solid var(--line)', borderRadius: '6px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--walnut)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Eye size={14} /> HTML Formatted Live Preview:
              </div>
              <div 
                style={{ fontSize: '14px', color: 'var(--espresso)', lineHeight: '1.6' }} 
                dangerouslySetInnerHTML={{ __html: formData.description }} 
              />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
            <Link 
              to="/products" 
              style={{ 
                padding: '10px 20px', 
                borderRadius: '4px', 
                border: '1px solid var(--line)', 
                background: 'var(--cream)', 
                color: 'var(--espresso)', 
                textDecoration: 'none', 
                fontWeight: '600', 
                fontSize: '14px' 
              }}
            >
              Cancel
            </Link>

            <button 
              type="submit" 
              disabled={saving}
              style={{ 
                padding: '10px 24px', 
                borderRadius: '4px', 
                border: 'none', 
                background: 'var(--brick, #a83d2c)', 
                color: 'var(--paper)', 
                fontWeight: '600', 
                fontSize: '14px', 
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Save size={16} /> {saving ? 'Saving...' : (isEditing ? 'Update Product' : 'Save New Product')}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default ProductForm;
