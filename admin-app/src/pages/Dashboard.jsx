import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [counts, setCounts] = useState({
    gallery: 0,
    services: 0,
    reviews: 0
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/content')
      .then(res => {
        const data = res.data;
        setCounts({
          gallery: data?.galleryImages?.length || 0,
          services: data?.services?.length || 0,
          reviews: data?.testimonials?.length || 0
        });
      })
      .catch(err => console.error("Error fetching live data for dashboard", err));
  }, []);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#666' }}>Total Gallery Images</h3>
          <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: '#323232' }}>{counts.gallery}</p>
        </div>
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#666' }}>Active Services</h3>
          <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: '#323232' }}>{counts.services}</p>
        </div>
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#666' }}>Customer Reviews</h3>
          <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: '#323232' }}>{counts.reviews}</p>
        </div>
      </div>
      
      <div style={{ marginTop: '40px', background: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h2>Welcome to your Control Panel</h2>
        <p style={{ color: '#666', lineHeight: 1.6 }}>
          From this dashboard, you can control all the dynamic content on the Jaipur Arts CNC website. 
          Use the sidebar on the left to navigate to different sections. When you save changes here, 
          they will instantly update on your live public website!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
