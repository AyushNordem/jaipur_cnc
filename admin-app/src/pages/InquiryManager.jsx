import { useState, useEffect } from 'react';
import axios from 'axios';
import { Phone, Mail, MessageSquare, Trash2, CheckCircle2, Clock, Filter, AlertTriangle, AlertCircle, Calendar, Tag, User, Layers, Box, Check, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../config';

const WhatsAppIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.66 1.44 5.24L2 22l4.98-1.53a9.87 9.87 0 0 0 5.06 1.38h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.13.09-1.83-.11-.42-.13-.96-.3-1.65-.6-2.9-1.25-4.79-4.16-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.28.57-.35.76-.35h.55c.18 0 .42-.07.65.5.24.6.82 2.06.9 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.35 1.44.3.15.47.13.65-.08.17-.2.73-.85.93-1.15.2-.3.4-.24.65-.15.26.1 1.65.78 1.93.92.29.15.48.22.55.34.07.13.07.72-.17 1.4z"/>
  </svg>
);

const STATUS_OPTIONS = ['New', 'Contacted', 'In Progress', 'Completed', 'Cancelled'];

const InquiryManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/inquiries`);
      const data = res.data.data || res.data || [];
      setInquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setNotification({
        type: 'error',
        title: 'Fetch Error',
        message: 'Failed to load inquiries from server.'
      });
    }
    setLoading(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/api/inquiries/${id}`, { status: newStatus });
      setInquiries(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
      setNotification({
        type: 'success',
        title: 'Status Updated',
        message: `Inquiry status changed to "${newStatus}".`
      });
    } catch (err) {
      setNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to update status in database.'
      });
    }
  };

  const handleDeleteInquiry = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete inquiry from "${name}"?`)) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/inquiries/${id}`);
      setInquiries(prev => prev.filter(item => item._id !== id));
      setNotification({
        type: 'success',
        title: 'Inquiry Deleted',
        message: `Inquiry from "${name}" deleted successfully.`
      });
    } catch (err) {
      setNotification({
        type: 'error',
        title: 'Delete Failed',
        message: 'Failed to delete inquiry from database.'
      });
    }
  };

  const filteredInquiries = selectedStatus === 'All'
    ? inquiries
    : inquiries.filter(item => item.status === selectedStatus);

  // Overview Stats
  const totalCount = inquiries.length;
  const newCount = inquiries.filter(i => i.status === 'New').length;
  const inProgressCount = inquiries.filter(i => i.status === 'In Progress' || i.status === 'Contacted').length;
  const completedCount = inquiries.filter(i => i.status === 'Completed').length;

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'New':
        return { background: 'rgba(168, 61, 44, 0.12)', color: 'var(--brick)', border: '1px solid rgba(168, 61, 44, 0.3)' };
      case 'Contacted':
        return { background: 'rgba(184, 137, 43, 0.12)', color: 'var(--brass)', border: '1px solid rgba(184, 137, 43, 0.3)' };
      case 'In Progress':
        return { background: 'rgba(43, 114, 184, 0.12)', color: '#2B72B8', border: '1px solid rgba(43, 114, 184, 0.3)' };
      case 'Completed':
        return { background: 'rgba(46, 125, 50, 0.12)', color: '#2E7D32', border: '1px solid rgba(46, 125, 50, 0.3)' };
      case 'Cancelled':
      default:
        return { background: 'rgba(100, 100, 100, 0.12)', color: '#646464', border: '1px solid rgba(100, 100, 100, 0.3)' };
    }
  };

  const sanitizePhone = (phone) => {
    if (!phone) return '';
    return phone.replace(/[^0-9]/g, '');
  };

  return (
    <div style={{ maxWidth: '1200px', paddingBottom: '60px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#323232', margin: '0 0 8px 0' }}>Inquiry Manager</h1>
          <p style={{ color: '#666', margin: 0 }}>View and manage customer quote requests submitted via website contact form.</p>
        </div>
        <button
          onClick={fetchInquiries}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            borderRadius: '6px',
            color: 'var(--espresso)',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Overview Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: 'var(--paper)', padding: '24px', borderRadius: '8px', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(184, 137, 43, 0.12)', color: 'var(--brass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--walnut)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Total Inquiries</span>
            <h2 style={{ margin: '4px 0 0 0', fontSize: '1.8rem', color: 'var(--espresso)', fontFamily: 'var(--font-heading)' }}>{totalCount}</h2>
          </div>
        </div>

        <div style={{ background: 'var(--paper)', padding: '24px', borderRadius: '8px', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(168, 61, 44, 0.12)', color: 'var(--brick)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--walnut)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>New Requests</span>
            <h2 style={{ margin: '4px 0 0 0', fontSize: '1.8rem', color: 'var(--espresso)', fontFamily: 'var(--font-heading)' }}>{newCount}</h2>
          </div>
        </div>

        <div style={{ background: 'var(--paper)', padding: '24px', borderRadius: '8px', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(46, 125, 50, 0.12)', color: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--walnut)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Completed</span>
            <h2 style={{ margin: '4px 0 0 0', fontSize: '1.8rem', color: 'var(--espresso)', fontFamily: 'var(--font-heading)' }}>{completedCount}</h2>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Inquiries List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: 'var(--espresso)', margin: 0 }}>
            Customer Quote Inquiries ({filteredInquiries.length})
          </h3>

          {/* Status Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Filter size={16} color="var(--walnut)" />
            {['All', ...STATUS_OPTIONS].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid var(--line)',
                  background: selectedStatus === st ? 'var(--espresso)' : 'var(--paper)',
                  color: selectedStatus === st ? 'var(--paper)' : 'var(--espresso)',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {st} {st === 'New' && newCount > 0 ? `(${newCount})` : ''}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', color: 'var(--walnut)' }}>Loading inquiries from database...</div>
        ) : filteredInquiries.length === 0 ? (
          <div style={{ padding: '40px', background: 'var(--paper)', borderRadius: '8px', border: '1px solid var(--line)', textAlign: 'center', color: 'var(--walnut)' }}>
            No inquiries found under status "{selectedStatus}".
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredInquiries.map((inquiry) => {
              const badgeStyle = getStatusBadgeStyle(inquiry.status);
              const cleanPhone = sanitizePhone(inquiry.phone);

              return (
                <div key={inquiry._id} style={{
                  background: 'var(--paper)',
                  padding: '24px',
                  borderRadius: '8px',
                  border: inquiry.status === 'New' ? '2px solid var(--brick)' : '1px solid var(--line)',
                  boxShadow: 'var(--shadow)',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                    
                    {/* Left: Customer Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--cream)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--espresso)', fontSize: '1.2rem', flexShrink: 0 }}>
                        {inquiry.fullName ? inquiry.fullName.charAt(0).toUpperCase() : 'C'}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--espresso)', fontFamily: 'var(--font-heading)' }}>{inquiry.fullName}</h4>
                          <span style={{ fontSize: '0.78rem', padding: '3px 10px', borderRadius: '12px', fontWeight: '700', ...badgeStyle }}>
                            {inquiry.status || 'New'}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '0.86rem', color: 'var(--walnut)', flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Phone size={14} color="var(--brass)" /> {inquiry.phone}
                          </span>
                          {inquiry.email && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Mail size={14} color="var(--brass)" /> {inquiry.email}
                            </span>
                          )}
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={14} />
                            {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Status Change & Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      
                      {/* Quick Contact Buttons */}
                      <a
                        href={`tel:${cleanPhone}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '4px', color: 'var(--espresso)', fontSize: '0.84rem', fontWeight: '600', textDecoration: 'none' }}
                        title="Call Customer"
                      >
                        <Phone size={14} /> Call
                      </a>

                      <a
                        href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(inquiry.fullName)},%20thank%20you%20for%20your%20inquiry%20at%20Jaipur%20Art%20CNC!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#25D366', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.84rem', fontWeight: '600', textDecoration: 'none' }}
                        title="Chat on WhatsApp"
                      >
                        <WhatsAppIcon size={14} /> WhatsApp
                      </a>

                      {/* Status Selector Dropdown */}
                      <select
                        value={inquiry.status || 'New'}
                        onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '4px',
                          border: '1px solid var(--line)',
                          background: 'var(--paper)',
                          color: 'var(--espresso)',
                          fontSize: '0.84rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        {STATUS_OPTIONS.map(st => (
                          <option key={st} value={st}>Status: {st}</option>
                        ))}
                      </select>

                      <button
                        onClick={() => handleDeleteInquiry(inquiry._id, inquiry.fullName)}
                        style={{ background: 'rgba(168, 61, 44, 0.1)', border: '1px solid rgba(168, 61, 44, 0.3)', borderRadius: '4px', padding: '8px', cursor: 'pointer', color: 'var(--brick)' }}
                        title="Delete Inquiry"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </div>

                  {/* Inquiry Details Badges & Message */}
                  <div style={{ background: 'var(--cream)', padding: '16px', borderRadius: '6px', border: '1px solid var(--line)', marginTop: '12px' }}>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: inquiry.message ? '12px' : 0, fontSize: '0.85rem' }}>
                      {inquiry.material && (
                        <div style={{ background: 'var(--paper)', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--line)', color: 'var(--espresso)' }}>
                          <b>Material:</b> {inquiry.material}
                        </div>
                      )}
                      {inquiry.patternType && (
                        <div style={{ background: 'var(--paper)', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--line)', color: 'var(--espresso)' }}>
                          <b>Pattern:</b> {inquiry.patternType}
                        </div>
                      )}
                      {inquiry.sizeQuantity && (
                        <div style={{ background: 'var(--paper)', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--line)', color: 'var(--espresso)' }}>
                          <b>Size/Qty:</b> {inquiry.sizeQuantity}
                        </div>
                      )}
                    </div>

                    {inquiry.message && (
                      <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--espresso)', lineHeight: 1.5 }}>
                        <b>Design Request Details:</b> {inquiry.message}
                      </p>
                    )}
                  </div>

                </div>
              );
            })}
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

export default InquiryManager;
