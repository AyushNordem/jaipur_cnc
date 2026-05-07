import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2, Plus, Star, MessageSquare, TrendingUp, Calendar } from 'lucide-react';

const ReviewManager = () => {
  const [content, setContent] = useState(null);
  const [formData, setFormData] = useState({ clientName: '', quote: '', rating: 5, date: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = () => {
    axios.get('http://localhost:5000/api/content')
      .then(res => setContent(res.data))
      .catch(err => console.error(err));
  };

  const handleSaveReview = async (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.quote) return alert('Name and Message are required.');

    const updatedContent = { ...content };
    if (!updatedContent.testimonials) updatedContent.testimonials = [];

    const reviewToSave = { ...formData, date: formData.date || new Date().toISOString() };

    if (editingIndex !== null) {
      updatedContent.testimonials[editingIndex] = reviewToSave;
    } else {
      updatedContent.testimonials.unshift(reviewToSave);
    }

    try {
      await axios.put('http://localhost:5000/api/content', updatedContent);
      setContent(updatedContent);
      setFormData({ clientName: '', quote: '', rating: 5, date: '' });
      setEditingIndex(null);
    } catch (err) {
      alert('Error saving review.');
    }
  };

  const handleEditReview = (index) => {
    setEditingIndex(index);
    const review = content.testimonials[index];
    setFormData({
      clientName: review.clientName,
      quote: review.quote,
      rating: review.rating,
      date: review.date ? new Date(review.date).toISOString().split('T')[0] : ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteReview = async (index) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    const updatedContent = { ...content };
    updatedContent.testimonials.splice(index, 1);

    try {
      await axios.put('http://localhost:5000/api/content', updatedContent);
      setContent(updatedContent);
      if (editingIndex === index) {
        setEditingIndex(null);
        setFormData({ clientName: '', quote: '', rating: 5, date: '' });
      }
    } catch (err) {
      alert('Error deleting review.');
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setFormData({ clientName: '', quote: '', rating: 5, date: '' });
  };

  if (!content) return <div style={{ padding: '40px', color: '#666' }}>Loading reviews...</div>;

  const testimonials = content.testimonials || [];
  const totalReviews = testimonials.length;
  const averageRating = totalReviews > 0 ? (testimonials.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1) : 0;
  const fiveStarCount = testimonials.filter(r => r.rating === 5).length;

  const inputStyle = { width: '100%', padding: '12px', marginTop: '8px', border: '1px solid #ddd', borderRadius: '6px', background: '#fafafa', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', marginBottom: '16px', fontWeight: '600', color: '#444' };

  return (
    <div style={{ maxWidth: '1200px', paddingBottom: '60px' }}>
      
      {/* Top Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', color: '#323232', margin: '0 0 8px 0' }}>Review Manager</h1>
        <p style={{ color: '#666', margin: 0 }}>Monitor your reputation and manage what customers say about you.</p>
      </div>

      {/* Overview Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: 'linear-gradient(135deg, #1c1c1c 0%, #0a0a0a 100%)', color: 'white', padding: '32px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#d4af37', lineHeight: '1' }}>{averageRating}</div>
          <div>
            <div style={{ display: 'flex', gap: '4px', color: '#d4af37', marginBottom: '8px' }}>
              {[1,2,3,4,5].map(star => <Star key={star} size={20} fill={star <= Math.round(averageRating) ? '#d4af37' : 'none'} />)}
            </div>
            <p style={{ margin: 0, color: '#A09D9A', fontSize: '1rem' }}>Overall Average Rating</p>
          </div>
        </div>

        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{ background: '#e3f2fd', color: '#1565c0', padding: '12px', borderRadius: '50%' }}><MessageSquare size={24} /></div>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#323232' }}>{totalReviews}</span>
          </div>
          <p style={{ margin: 0, color: '#666', fontWeight: '500' }}>Total Reviews Published</p>
        </div>

        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '12px', borderRadius: '50%' }}><TrendingUp size={24} /></div>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#323232' }}>{fiveStarCount}</span>
          </div>
          <p style={{ margin: 0, color: '#666', fontWeight: '500' }}>Five-Star Ratings Received</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Form Section */}
        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', position: 'sticky', top: '24px' }}>
          <h2 style={{ margin: '0 0 24px 0', borderBottom: '1px solid #eee', paddingBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {editingIndex !== null ? <><Edit2 size={24} color="#8b7355" /> Edit Review</> : <><Plus size={24} color="#8b7355" /> Add New Review</>}
          </h2>
          <form onSubmit={handleSaveReview}>
            <label style={labelStyle}>
              Customer Name
              <input type="text" value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} style={inputStyle} placeholder="e.g. John Doe" />
            </label>
            
            <label style={labelStyle}>
              Review Date
              <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={inputStyle} />
            </label>
            
            <label style={labelStyle}>
              Rating (1 to 5 Stars)
              <select value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} style={inputStyle}>
                {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
              </select>
            </label>

            <label style={labelStyle}>
              Customer Message
              <textarea value={formData.quote} onChange={e => setFormData({...formData, quote: e.target.value})} rows="5" style={{...inputStyle, resize: 'vertical'}} placeholder="What did the customer say..." />
            </label>

            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <button type="submit" style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #8b7355 0%, #6e5a42 100%)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                {editingIndex !== null ? 'Update Review' : 'Publish Review'}
              </button>
              {editingIndex !== null && (
                <button type="button" onClick={cancelEdit} style={{ flex: 1, padding: '14px', background: '#f5f5f5', color: '#333', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List Section */}
        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: '0 0 24px 0', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>Published Reviews</h2>
          
          {totalReviews === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
              <p>No reviews have been published yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {testimonials.map((review, idx) => (
                <div key={idx} style={{ padding: '24px', border: '1px solid #eee', borderRadius: '12px', position: 'relative', background: editingIndex === idx ? '#fdfbf7' : 'white', transition: 'background 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#323232', fontSize: '1.1rem' }}>{review.clientName}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '0.85rem' }}>
                        <Calendar size={14} />
                        {review.date ? new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Date not set'}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', color: '#d4af37' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < review.rating ? '#d4af37' : 'none'} />)}
                    </div>
                  </div>
                  
                  <p style={{ margin: 0, color: '#555', fontStyle: 'italic', lineHeight: '1.6' }}>"{review.quote}"</p>
                  
                  <div style={{ display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
                    <button onClick={() => handleEditReview(idx)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#1565c0', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>
                      <Edit2 size={16} /> Edit
                    </button>
                    <button onClick={() => handleDeleteReview(idx)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ReviewManager;
