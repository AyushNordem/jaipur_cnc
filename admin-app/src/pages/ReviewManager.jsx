import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2, Plus, Star, MessageSquare, TrendingUp, Calendar, User, MapPin, UploadCloud, AlertCircle, AlertTriangle, CheckCircle2, X } from 'lucide-react';

const ReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    clientName: '',
    clientLocation: '',
    clientAvatar: '',
    quote: '',
    rating: 5,
    workType: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/reviews');
      const data = res.data.data || res.data || [];
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setNotification({
        type: 'error',
        title: 'Fetch Error',
        message: 'Failed to fetch reviews from server.'
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

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingAvatar(true);
    const uploadForm = new FormData();
    uploadForm.append('image', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', uploadForm, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const url = res.data.data?.url || res.data.url;
      setFormData(prev => ({ ...prev, clientAvatar: url }));
      setNotification({
        type: 'success',
        title: 'Avatar Uploaded',
        message: 'Client photo successfully uploaded to Cloudinary!'
      });
    } catch (err) {
      setNotification({
        type: 'error',
        title: 'Upload Failed',
        message: 'Failed to upload avatar photo. Please try again.'
      });
    }
    setUploadingAvatar(false);
  };

  const handleSaveReview = async (e) => {
    e.preventDefault();

    // Field-level validation
    const newErrors = {};
    if (!formData.clientName || !formData.clientName.trim()) {
      newErrors.clientName = 'Client Name is required';
    }
    if (!formData.quote || !formData.quote.trim()) {
      newErrors.quote = 'Review Message/Quote is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstKey}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    setErrors({});
    setSaving(true);

    try {
      if (editingId) {
        // Update API call
        const res = await axios.put(`http://localhost:5000/api/reviews/${editingId}`, formData);
        setNotification({
          type: 'success',
          title: 'Review Updated',
          message: 'Customer review updated successfully!'
        });
      } else {
        // Add API call
        const res = await axios.post('http://localhost:5000/api/reviews', formData);
        setNotification({
          type: 'success',
          title: 'Review Added',
          message: 'New customer review added successfully!'
        });
      }

      resetForm();
      fetchReviews();
    } catch (err) {
      setNotification({
        type: 'error',
        title: 'Save Failed',
        message: err.response?.data?.error || 'Failed to save review to database.'
      });
    }
    setSaving(false);
  };

  const handleEditReview = (review) => {
    setEditingId(review._id);
    setFormData({
      clientName: review.clientName || '',
      clientLocation: review.clientLocation || '',
      clientAvatar: review.clientAvatar || '',
      quote: review.quote || '',
      rating: review.rating || 5,
      workType: review.workType || '',
      date: review.date ? new Date(review.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteReview = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the review by "${name}"?`)) return;

    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      setNotification({
        type: 'success',
        title: 'Review Deleted',
        message: `Review by "${name}" deleted successfully.`
      });
      if (editingId === id) resetForm();
      fetchReviews();
    } catch (err) {
      setNotification({
        type: 'error',
        title: 'Delete Failed',
        message: 'Failed to delete review from database.'
      });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      clientName: '',
      clientLocation: '',
      clientAvatar: '',
      quote: '',
      rating: 5,
      workType: '',
      date: new Date().toISOString().split('T')[0]
    });
    setErrors({});
  };

  // Overview Stats
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 ? (reviews.reduce((acc, rev) => acc + (Number(rev.rating) || 5), 0) / totalReviews).toFixed(1) : '5.0';
  const fiveStarCount = reviews.filter(r => Number(r.rating) === 5).length;

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
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#323232', margin: '0 0 8px 0' }}>Review Manager</h1>
          <p style={{ color: '#666', margin: 0 }}>Monitor customer feedback, add google reviews, and manage public testimonials.</p>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: 'var(--paper)', padding: '24px', borderRadius: '8px', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(184, 137, 43, 0.12)', color: 'var(--brass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--walnut)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Total Reviews</span>
            <h2 style={{ margin: '4px 0 0 0', fontSize: '1.8rem', color: 'var(--espresso)', fontFamily: 'var(--font-heading)' }}>{totalReviews}</h2>
          </div>
        </div>

        <div style={{ background: 'var(--paper)', padding: '24px', borderRadius: '8px', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(184, 137, 43, 0.12)', color: 'var(--brass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={28} fill="var(--brass)" />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--walnut)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Average Rating</span>
            <h2 style={{ margin: '4px 0 0 0', fontSize: '1.8rem', color: 'var(--espresso)', fontFamily: 'var(--font-heading)' }}>{averageRating} / 5.0</h2>
          </div>
        </div>

        <div style={{ background: 'var(--paper)', padding: '24px', borderRadius: '8px', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(168, 61, 44, 0.12)', color: 'var(--brick)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--walnut)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>5-Star Satisfaction</span>
            <h2 style={{ margin: '4px 0 0 0', fontSize: '1.8rem', color: 'var(--espresso)', fontFamily: 'var(--font-heading)' }}>
              {totalReviews > 0 ? Math.round((fiveStarCount / totalReviews) * 100) : 100}%
            </h2>
          </div>
        </div>
      </div>

      {/* Add / Edit Review Form */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: 'var(--espresso)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {editingId ? <Edit2 color="var(--brick)" size={22} /> : <Plus color="var(--brass)" size={22} />}
            {editingId ? 'Edit Customer Review' : 'Add New Customer Review'}
          </h3>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ background: 'transparent', border: 'none', color: 'var(--brick)', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <X size={18} /> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSaveReview}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <label style={labelStyle}>
              Client Name <span style={{ color: 'var(--brick)' }}>*</span>
              <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} style={getInputStyle('clientName')} placeholder="e.g. Amit Sharma" />
              {renderError('clientName')}
            </label>

            <label style={labelStyle}>
              Location / City (Optional)
              <input type="text" name="clientLocation" value={formData.clientLocation} onChange={handleChange} style={getInputStyle('clientLocation')} placeholder="e.g. Vaishali Nagar, Jaipur (Optional)" />
            </label>

            <label style={labelStyle}>
              Work / Service Type (Optional)
              <input type="text" name="workType" value={formData.workType} onChange={handleChange} style={getInputStyle('workType')} placeholder="e.g. Temple Wood Jali, MDF Carving (Optional)" />
            </label>

            <label style={labelStyle}>
              Rating (1 - 5 Stars)
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <Star size={26} fill={star <= formData.rating ? 'var(--brass)' : 'none'} color={star <= formData.rating ? 'var(--brass)' : 'var(--line)'} />
                  </button>
                ))}
                <span style={{ marginLeft: '10px', fontWeight: 'bold', color: 'var(--espresso)', fontSize: '1rem' }}>{formData.rating}.0 / 5</span>
              </div>
            </label>

            <label style={labelStyle}>
              Review Date
              <input type="date" name="date" value={formData.date} onChange={handleChange} style={getInputStyle('date')} />
            </label>

            {/* Client Avatar Upload */}
            <div style={{ gridColumn: '1 / -1', marginBottom: '8px' }}>
              <label style={labelStyle}>Client Photo / Avatar (Optional)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--cream)', padding: '16px', borderRadius: '6px', border: '1px solid var(--line)' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--paper)', border: '1px solid var(--line)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {formData.clientAvatar ? (
                    <img src={formData.clientAvatar} alt="Client Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <User size={24} color="var(--walnut)" />
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                  <button type="button" style={{ pointerEvents: 'none', background: 'var(--paper)', border: '1px solid var(--line)', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--espresso)' }}>
                    <UploadCloud size={16} />
                    {uploadingAvatar ? 'Uploading Avatar...' : 'Upload Client Photo'}
                  </button>
                </div>
              </div>
            </div>

            <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>
              Review Message / Testimonial Quote <span style={{ color: 'var(--brick)' }}>*</span>
              <textarea name="quote" rows={4} value={formData.quote} onChange={handleChange} style={{ ...getInputStyle('quote'), resize: 'vertical' }} placeholder="e.g. Exceptional CNC carving quality for our temple wooden jali design!" />
              {renderError('quote')}
            </label>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <button type="submit" disabled={saving || uploadingAvatar} style={{
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
              {saving ? 'Saving...' : (editingId ? 'Update Review' : 'Add Review')}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} style={{ padding: '12px 20px', background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '6px', fontWeight: '600', color: 'var(--espresso)', cursor: 'pointer' }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Review List */}
      <div>
        <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: 'var(--espresso)', marginBottom: '20px' }}>
          Customer Reviews ({reviews.length})
        </h3>

        {loading ? (
          <div style={{ padding: '40px', color: 'var(--walnut)' }}>Loading reviews from database...</div>
        ) : reviews.length === 0 ? (
          <div style={{ padding: '40px', background: 'var(--paper)', borderRadius: '8px', border: '1px solid var(--line)', textAlign: 'center', color: 'var(--walnut)' }}>
            No customer reviews found. Add your first review above!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {reviews.map((rev) => (
              <div key={rev._id} style={{ background: 'var(--paper)', padding: '24px', borderRadius: '8px', border: '1px solid var(--line)', boxShadow: 'var(--shadow)', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--cream)', border: '1px solid var(--line)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {rev.clientAvatar ? (
                          <img src={rev.clientAvatar} alt={rev.clientName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <User size={20} color="var(--walnut)" />
                        )}
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--espresso)', fontFamily: 'var(--font-heading)' }}>{rev.clientName}</h4>
                        {rev.clientLocation && (
                          <span style={{ fontSize: '0.8rem', color: 'var(--walnut)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                            <MapPin size={12} /> {rev.clientLocation}
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleEditReview(rev)} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '4px', padding: '6px', cursor: 'pointer', color: 'var(--espresso)' }} title="Edit Review">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteReview(rev._id, rev.clientName)} style={{ background: 'rgba(168, 61, 44, 0.1)', border: '1px solid rgba(168, 61, 44, 0.3)', borderRadius: '4px', padding: '6px', cursor: 'pointer', color: 'var(--brick)' }} title="Delete Review">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < (rev.rating || 5) ? 'var(--brass)' : 'none'} color={i < (rev.rating || 5) ? 'var(--brass)' : 'var(--line)'} />
                    ))}
                    {rev.workType && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--walnut)', marginLeft: '8px', fontWeight: '600' }}>{rev.workType}</span>
                    )}
                  </div>

                  <p style={{ color: 'var(--espresso)', fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic', margin: '0 0 16px 0' }}>
                    "{rev.quote}"
                  </p>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--walnut)', borderTop: '1px dashed var(--line)', paddingTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} />
                  {rev.date ? new Date(rev.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recent'}
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

export default ReviewManager;
