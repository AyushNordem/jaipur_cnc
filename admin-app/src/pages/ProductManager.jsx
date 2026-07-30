import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit2, Trash2, Search, ShoppingBag } from 'lucide-react';
import { API_BASE_URL } from '../config';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product listing?')) return;
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
    <div style={{ width: '100%' }}>
      
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1.5rem' }}>
            Products &amp; Design Files Manager
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Add, update, or remove 3D/2D design file listings in your shop catalog.
          </p>
        </div>

        <Link 
          to="/products/new" 
          style={{ 
            backgroundColor: 'var(--brick, #a83d2c)', 
            color: 'var(--paper, #faf5ea)', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '4px', 
            fontWeight: '600', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            textDecoration: 'none',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(168, 61, 44, 0.2)'
          }}
        >
          <Plus size={18} /> Add New Product Model
        </Link>
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
          placeholder="Filter by code or category e.g. 3DWP-3028..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '4px', border: '1px solid var(--line, #cbd5e1)', background: 'var(--paper, #fff)', fontSize: '14px' }}
        />
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'var(--paper, #fff)', borderRadius: '6px', border: '1px solid var(--line, #e2e8f0)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(46, 33, 22, 0.04)', borderBottom: '1px solid var(--line)', color: 'var(--espresso)' }}>
              <th style={{ padding: '14px 16px', fontFamily: 'var(--font-heading)' }}>Code</th>
              <th style={{ padding: '14px 16px', fontFamily: 'var(--font-heading)' }}>Design Title</th>
              <th style={{ padding: '14px 16px', fontFamily: 'var(--font-heading)' }}>Category</th>
              <th style={{ padding: '14px 16px', fontFamily: 'var(--font-heading)' }}>Price</th>
              <th style={{ padding: '14px 16px', fontFamily: 'var(--font-heading)' }}>File Formats</th>
              <th style={{ padding: '14px 16px', textAlign: 'right', fontFamily: 'var(--font-heading)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>Loading products...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>No products found.</td></tr>
            ) : (
              filtered.map((prod) => (
                <tr key={prod._id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '700', color: 'var(--brick)', fontFamily: 'var(--font-mono)' }}>
                    #{prod.designCode || prod._id}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: 'var(--espresso)' }}>
                    {prod.title}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    <span style={{ background: 'rgba(184, 137, 43, 0.12)', color: 'var(--espresso)', padding: '4px 10px', borderRadius: '2px', fontSize: '12px', fontWeight: '600' }}>
                      {prod.category}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: '700', color: 'var(--brick)' }}>
                    ₹{prod.price} {prod.originalPrice && <span style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '4px' }}>₹{prod.originalPrice}</span>}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                    {Array.isArray(prod.fileFormats) ? prod.fileFormats.join(', ') : prod.fileFormats}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <Link to={`/products/edit/${prod._id}`} style={{ color: '#0284c7', textDecoration: 'none', marginRight: '16px', display: 'inline-flex', alignItems: 'center' }} title="Edit Product">
                      <Edit2 size={16} />
                    </Link>
                    <button onClick={() => handleDelete(prod._id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }} title="Delete Product">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ProductManager;
