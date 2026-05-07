import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus } from 'lucide-react';

const ReviewManager = () => {
  const [content, setContent] = useState(null);
  const [newReview, setNewReview] = useState({ clientName: '', quote: '', rating: 5 });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = () => {
    axios.get('http://localhost:5000/api/content')
      .then(res => setContent(res.data))
      .catch(err => console.error(err));
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReview.clientName || !newReview.quote) return alert('Name and Quote are required.');

    const updatedContent = { ...content };
    if (!updatedContent.testimonials) updatedContent.testimonials = [];
    updatedContent.testimonials.push(newReview);

    try {
      await axios.put('http://localhost:5000/api/content', updatedContent);
      setContent(updatedContent);
      setNewReview({ clientName: '', quote: '', rating: 5 });
      alert('Review added successfully!');
    } catch (err) {
      alert('Error adding review.');
    }
  };

  const handleDeleteReview = async (index) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    const updatedContent = { ...content };
    updatedContent.testimonials.splice(index, 1);

    try {
      await axios.put('http://localhost:5000/api/content', updatedContent);
      setContent(updatedContent);
    } catch (err) {
      alert('Error deleting review.');
    }
  };

  if (!content) return <div>Loading reviews...</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
      
      {/* Existing Reviews List */}
      <div style={{ background: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: '0 0 24px 0', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>Manage Reviews</h2>
        
        {(!content.testimonials || content.testimonials.length === 0) ? (
          <p>No reviews added yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {content.testimonials.map((review, idx) => (
              <div key={idx} style={{ padding: '16px', border: '1px solid #eee', borderRadius: '8px', position: 'relative' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{review.clientName}</h4>
                <div style={{ color: '#323232', marginBottom: '12px' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div>
                <p style={{ margin: 0, color: '#666', fontStyle: 'italic', fontSize: '0.95rem' }}>"{review.quote}"</p>
                <button 
                  onClick={() => handleDeleteReview(idx)}
                  style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add New Review Form */}
      <div style={{ background: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: '0 0 24px 0', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>Add New Review</h2>
        <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label>
            Client Name
            <input 
              type="text" 
              value={newReview.clientName} 
              onChange={e => setNewReview({...newReview, clientName: e.target.value})} 
              style={{ width: '100%', padding: '10px', marginTop: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
          </label>
          
          <label>
            Rating (1-5)
            <input 
              type="number" 
              min="1" max="5" 
              value={newReview.rating} 
              onChange={e => setNewReview({...newReview, rating: parseInt(e.target.value)})} 
              style={{ width: '100%', padding: '10px', marginTop: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
          </label>

          <label>
            Quote
            <textarea 
              value={newReview.quote} 
              onChange={e => setNewReview({...newReview, quote: e.target.value})} 
              rows="4"
              style={{ width: '100%', padding: '10px', marginTop: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
          </label>

          <button type="submit" style={{ padding: '12px', background: '#323232', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
            <Plus size={18} /> Add Review
          </button>
        </form>
      </div>

    </div>
  );
};

export default ReviewManager;
