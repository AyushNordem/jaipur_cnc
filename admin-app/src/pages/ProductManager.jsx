import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Image, Save, X, Search, Check, AlertCircle, ShoppingBag } from 'lucide-react';
import { API_BASE_URL } from '../config';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    designCode: '',
    category: '3D Wall Panel',
    price: 480,
    originalPrice: 500,
    discountPercent: 4,
    size: '8x4 Size (Adjustable)',
    fileFormats: 'RLF, STL',
    software: 'Artcam, JDPaint, 3ds Max',
    imageUrl: '',
    description: '',
    inStock: true,
    featured: false
  });

  const [notification, setNotification] = useState(null);

  const showNotify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(res.data || []);
    } catch (err) {
      showNotify('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (prod = null) => {
    if (prod) {
      setEditingId(prod._id);
      setFormData({
        title: prod.title || '',
        designCode: prod.designCode || '',
        category: prod.category || '3D Wall Panel',
        price: prod.price || 480,
        originalPrice: prod.originalPrice || 500,
        discountPercent: prod.discountPercent || 4,
        size: prod.size || '8x4 Size (Adjustable)',
        fileFormats: Array.isArray(prod.fileFormats) ? prod.fileFormats.join(', ') : (prod.fileFormats || 'RLF, STL'),
        software: Array.isArray(prod.software) ? prod.software.join(', ') : (prod.software || 'Artcam, JDPaint'),
        imageUrl: (prod.images && prod.images[0]) || '',
        description: prod.description || '',
        inStock: prod.inStock !== false,
        featured: Boolean(prod.featured)
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        designCode: '',
        category: '3D Wall Panel',
        price: 480,
        originalPrice: 500,
        discountPercent: 4,
        size: '8x4 Size (Adjustable)',
        fileFormats: 'RLF, STL',
        software: 'Artcam, JDPaint, 3ds Max',
        imageUrl: '',
        description: 'Instant Download Link Automatically appear after Purchase.\nFiles - RLF File (Artcam Relief File)\nFiles - STL File',
        inStock: true,
        featured: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        discountPercent: Number(formData.discountPercent),
        fileFormats: formData.fileFormats.split(',').map(s => s.trim()).filter(Boolean),
        software: formData.software.split(',').map(s => s.trim()).filter(Boolean),
        images: formData.imageUrl ? [formData.imageUrl] : []
      };

      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/products/${editingId}`, payload);
        showNotify('3D Model Product updated successfully!');
      } else {
        await axios.post(`${API_BASE_URL}/api/products`, payload);
        showNotify('New 3D Model Product created successfully!');
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      showNotify(err.response?.data?.message || 'Error saving product', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this 3D product model?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${id}`);
      showNotify('Product deleted');
      fetchProducts();
    } catch (err) {
      showNotify('Failed to delete product', 'error');
    }
  };

  const filtered = products.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.designCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1.5rem' }}>
            3D CNC Products & Models Manager
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Add, update, or remove 3D Artcam RLF/STL model listings in your shop catalog.
          </p>
        </div>

        <button 
          onClick={() => handleOpenModal()} 
          style={{ 
            backgroundColor: 'var(--brick, #a83d2c)', 
            color: '#fff', 
            border: 'none', 
            padding: '10px 18px', 
            borderRadius: '6px', 
            fontWeight: '600', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer' 
          }}
        >
          <Plus size={18} /> Add 3D Design File
        </button>
      </div>

      {notification && (
        <div style={{ 
          padding: '12px 16px', 
          borderRadius: '6px', 
          marginBottom: '20px', 
          backgroundColor: notification.type === 'error' ? '#fef2f2' : '#ecfdf5', 
          color: notification.type === 'error' ? '#991b1b' : '#065f46',
          border: `1px solid ${notification.type === 'error' ? '#fecaca' : '#a7f3d0'}`
        }}>
          {notification.msg}
        </div>
      )}

      {/* Search Input */}
      <div style={{ marginBottom: '20px', position: 'relative', maxWidth: '400px' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        <input 
          type="text" 
          placeholder="Filter by design code e.g. 3DWP-3028..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
        />
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>Code</th>
              <th style={{ padding: '12px 16px' }}>Design Title</th>
              <th style={{ padding: '12px 16px' }}>Category</th>
              <th style={{ padding: '12px 16px' }}>Price</th>
              <th style={{ padding: '12px 16px' }}>File Formats</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>Loading products...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>No products found.</td></tr>
            ) : (
              filtered.map((prod) => (
                <tr key={prod._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '700', color: '#00a8b5' }}>
                    {prod.designCode || prod._id}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: '500' }}>
                    {prod.title}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>
                    {prod.category}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: '700', color: '#d9381e' }}>
                    ₹{prod.price} <span style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through' }}>₹{prod.originalPrice}</span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>
                    {Array.isArray(prod.fileFormats) ? prod.fileFormats.join(', ') : prod.fileFormats}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button onClick={() => handleOpenModal(prod)} style={{ background: 'none', border: 'none', color: '#0284c7', cursor: 'pointer', marginRight: '12px' }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(prod._id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', maxWidth: '600px', width: '100%', padding: '24px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>{editingId ? 'Edit 3D Model' : 'Add New 3D Model'}</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Design Title</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Design Code</label>
                  <input type="text" required value={formData.designCode} onChange={e => setFormData({...formData, designCode: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                    <option value="3D Wall Panel">3D Wall Panel</option>
                    <option value="3D Door Design">3D Door Design</option>
                    <option value="Temple & Mandir">Temple & Mandir</option>
                    <option value="Pillars & Carvings">Pillars & Carvings</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Sale Price (₹)</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Original Price (₹)</label>
                  <input type="number" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Discount %</label>
                  <input type="number" value={formData.discountPercent} onChange={e => setFormData({...formData, discountPercent: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Image URL</label>
                <input type="text" placeholder="https://..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>File Formats (comma separated)</label>
                <input type="text" value={formData.fileFormats} onChange={e => setFormData({...formData, fileFormats: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Description</label>
                <textarea rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1' }}></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#00a8b5', color: '#fff', fontWeight: '600' }}>Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
