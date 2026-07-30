import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit2, Trash2, Search, Image as ImageIcon, Eye, RefreshCw, X } from 'lucide-react';
import { API_BASE_URL, getFullMediaUrl } from '../config';

const CATEGORIES = ["All", "3D Design", "2D Design", "Temple & Mandir", "Door Design"];

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  const filtered = products.filter(p => {
    const matchesCategory = selectedCategory === "All" || 
      (p.category && p.category.toLowerCase() === selectedCategory.toLowerCase());

    const query = searchTerm.toLowerCase().trim();
    const matchesSearch = !query || 
      p.title?.toLowerCase().includes(query) || 
      p.designCode?.toLowerCase().includes(query) ||
      p.category?.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ width: '100%' }}>
      
      {/* Top Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1.6rem', fontWeight: '700' }}>
            Products &amp; Design Files Catalog
          </h2>
          <p style={{ margin: '4px 0 0 0', color: 'var(--walnut)', fontSize: '0.9rem' }}>
            Manage master product photos, codes, categories, pricing, and file formats.
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
            boxShadow: '0 4px 12px rgba(168, 61, 44, 0.25)',
            transition: 'transform 0.2s ease'
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

      {/* Filter Bar: Code/Title Search + Category Pills */}
      <div style={{ 
        backgroundColor: 'var(--paper, #faf5ea)', 
        padding: '16px 20px', 
        borderRadius: '6px', 
        border: '1px solid var(--line)', 
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Search by Code or Title Input */}
        <div style={{ position: 'relative', minWidth: '320px', flex: '1', maxWidth: '480px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--walnut)' }} />
          <input 
            type="text" 
            placeholder="Search by code (e.g. JAC-3D-6218, 3028) or title..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ 
              width: '100%', 
              padding: '9px 36px 9px 38px', 
              borderRadius: '4px', 
              border: '1px solid var(--line)', 
              background: 'var(--cream)', 
              color: 'var(--espresso)', 
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--walnut)', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '4px',
                border: '1px solid var(--line)',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: selectedCategory === cat ? 'var(--brick)' : 'var(--cream)',
                color: selectedCategory === cat ? 'var(--paper)' : 'var(--espresso)',
                borderColor: selectedCategory === cat ? 'var(--brick)' : 'var(--line)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', color: 'var(--walnut)', fontWeight: '600' }}>
          Showing <strong>{filtered.length}</strong> {selectedCategory !== 'All' ? selectedCategory : ''} Product Models
        </span>
        {(searchTerm || selectedCategory !== 'All') && (
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            style={{ background: 'none', border: 'none', color: 'var(--brick)', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Main Table */}
      <div style={{ backgroundColor: 'var(--paper, #fff)', borderRadius: '6px', border: '1px solid var(--line)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(46, 33, 22, 0.05)', borderBottom: '1px solid var(--line)', color: 'var(--espresso)' }}>
              <th style={{ padding: '14px 16px', fontFamily: 'var(--font-heading)', width: '80px' }}>Master Img</th>
              <th style={{ padding: '14px 16px', fontFamily: 'var(--font-heading)', width: '150px' }}>Design Code</th>
              <th style={{ padding: '14px 16px', fontFamily: 'var(--font-heading)' }}>Product Details &amp; Formats</th>
              <th style={{ padding: '14px 16px', fontFamily: 'var(--font-heading)', width: '130px' }}>Category</th>
              <th style={{ padding: '14px 16px', fontFamily: 'var(--font-heading)', width: '120px' }}>Price</th>
              <th style={{ padding: '14px 16px', textAlign: 'right', fontFamily: 'var(--font-heading)', width: '100px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--walnut)' }}>
                  <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 8px auto', display: 'block' }} />
                  Loading products catalog...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--walnut)' }}>
                  No products found matching your search.
                </td>
              </tr>
            ) : (
              filtered.map((prod) => {
                const masterImg = (prod.images && prod.images.length > 0) ? getFullMediaUrl(prod.images[0]) : null;

                return (
                  <tr key={prod._id} style={{ borderBottom: '1px solid var(--line)', transition: 'background 0.2s ease' }}>
                    
                    {/* Master Image Thumbnail */}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '4px', overflow: 'hidden', background: 'var(--espresso)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {masterImg ? (
                          <img src={masterImg} alt={prod.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <ImageIcon size={22} color="var(--brass)" />
                        )}
                      </div>
                    </td>

                    {/* Design Code Badge */}
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '13px', 
                        fontWeight: '700', 
                        color: 'var(--brick)', 
                        background: 'rgba(168, 61, 44, 0.08)', 
                        padding: '4px 8px', 
                        borderRadius: '3px', 
                        border: '1px solid rgba(168, 61, 44, 0.2)',
                        display: 'inline-block'
                      }}>
                        #{prod.designCode || prod._id}
                      </span>
                    </td>

                    {/* Product Title & Details */}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: '600', color: 'var(--espresso)', fontSize: '14px', marginBottom: '6px', lineHeight: '1.4' }}>
                        {prod.title}
                      </div>

                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                        {prod.size && (
                          <span style={{ fontSize: '11px', background: 'rgba(46, 33, 22, 0.06)', color: 'var(--espresso)', padding: '2px 6px', borderRadius: '2px' }}>
                            {prod.size}
                          </span>
                        )}
                        <span style={{ fontSize: '11px', background: 'rgba(184, 137, 43, 0.12)', color: 'var(--espresso)', padding: '2px 6px', borderRadius: '2px', fontFamily: 'var(--font-mono)' }}>
                          Formats: {Array.isArray(prod.fileFormats) ? prod.fileFormats.join(', ') : prod.fileFormats}
                        </span>
                      </div>
                    </td>

                    {/* Category Pill */}
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: 'rgba(184, 137, 43, 0.14)', color: 'var(--espresso)', padding: '4px 10px', borderRadius: '3px', fontSize: '12px', fontWeight: '600' }}>
                        {prod.category}
                      </span>
                    </td>

                    {/* Price & Discount */}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: '700', color: 'var(--brick)', fontSize: '15px' }}>
                        ₹{prod.price}
                      </div>
                      {prod.originalPrice && (
                        <div style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through' }}>
                          ₹{prod.originalPrice}
                        </div>
                      )}
                    </td>

                    {/* Action Buttons */}
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <Link 
                          to={`/products/edit/${prod._id}`} 
                          style={{ padding: '6px 10px', background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '4px', color: '#0284c7', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }} 
                          title="Edit Product Details"
                        >
                          <Edit2 size={15} />
                        </Link>

                        <button 
                          onClick={() => handleDelete(prod._id)} 
                          style={{ padding: '6px 10px', background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '4px', color: '#dc2626', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }} 
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ProductManager;
