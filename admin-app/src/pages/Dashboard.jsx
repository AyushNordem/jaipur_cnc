import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, CheckCircle, Box, MapPin, Image as ImageIcon, MessageSquare, Briefcase, FileText, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [counts, setCounts] = useState({
    inquiries: 0,
    reviews: 0,
    gallery: 0,
    services: 3
  });

  const [traffic, setTraffic] = useState([]);

  const [metrics, setMetrics] = useState({
    happyCustomersCount: '50+',
    completedProjectsCount: '15+',
    yearsExperienceCount: '5',
    totalBranchesCount: '3'
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:5000/api/inquiries').catch(() => ({ data: [] })),
      axios.get('http://localhost:5000/api/reviews').catch(() => ({ data: [] })),
      axios.get('http://localhost:5000/api/gallery').catch(() => ({ data: [] })),
      axios.get('http://localhost:5000/api/settings').catch(() => ({ data: {} })),
      axios.get('http://localhost:5000/api/analytics/weekly').catch(() => ({ data: [] }))
    ]).then(([inquiriesRes, reviewsRes, galleryRes, settingsRes, analyticsRes]) => {
      const inquiriesData = inquiriesRes.data.data || inquiriesRes.data || [];
      const reviewsData = reviewsRes.data.data || reviewsRes.data || [];
      const galleryData = galleryRes.data.data || galleryRes.data || [];
      const settingsData = settingsRes.data.settings || settingsRes.data.data || settingsRes.data || {};
      const analyticsData = analyticsRes.data.data || analyticsRes.data || [];

      setCounts({
        inquiries: Array.isArray(inquiriesData) ? inquiriesData.length : 0,
        reviews: Array.isArray(reviewsData) ? reviewsData.length : 0,
        gallery: Array.isArray(galleryData) ? galleryData.length : 0,
        services: 3
      });

      if (Array.isArray(analyticsData) && analyticsData.length > 0) {
        setTraffic(analyticsData);
      }

      setMetrics({
        happyCustomersCount: settingsData.happyCustomersCount || '50+',
        completedProjectsCount: settingsData.completedProjectsCount || '15+',
        yearsExperienceCount: settingsData.yearsExperienceCount || '5',
        totalBranchesCount: settingsData.totalBranchesCount || '3'
      });
    }).catch(err => console.error("Error fetching live data for dashboard", err));
  }, []);

  const hour = currentTime.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const formattedDate = currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div>
      {/* Top Banner Section: 4 Metric Cards on Left, Welcome Banner on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px', marginBottom: '32px' }}>
        
        {/* Left Data Boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {[
            { title: 'Total Inquiries', count: counts.inquiries, icon: <MessageSquare size={24} />, color: 'var(--brick)', bg: 'rgba(168, 61, 44, 0.12)' },
            { title: 'Customer Reviews', count: counts.reviews, icon: <FileText size={24} />, color: 'var(--brass)', bg: 'rgba(184, 137, 43, 0.12)' },
            { title: 'Gallery Images', count: counts.gallery, icon: <ImageIcon size={24} />, color: 'var(--walnut)', bg: 'rgba(110, 74, 46, 0.12)' },
            { title: 'Active Services', count: counts.services, icon: <Briefcase size={24} />, color: 'var(--espresso)', bg: 'rgba(46, 33, 22, 0.12)' },
          ].map((stat, idx) => (
            <div key={idx} style={{ background: 'var(--paper)', padding: '24px', borderRadius: '6px', border: '1px solid var(--line)', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ background: stat.bg, color: stat.color, width: '60px', height: '60px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {stat.icon}
              </div>
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: 'var(--walnut)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', fontWeight: '500' }}>{stat.title}</h3>
                <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--espresso)', fontFamily: 'var(--font-heading)' }}>{stat.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Welcome Banner */}
        <div style={{ 
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, var(--espresso) 0%, #1a120c 100%)', 
          padding: '40px 32px', 
          borderRadius: '6px', 
          color: 'var(--paper)',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          border: '1px solid rgba(184, 137, 43, 0.3)'
        }}>
          {/* Decorative Glow */}
          <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '150%', height: '150%', background: 'radial-gradient(circle, rgba(184, 137, 43, 0.2) 0%, rgba(0,0,0,0) 60%)', pointerEvents: 'none' }}></div>
          
          <div style={{ zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(184, 137, 43, 0.15)', padding: '6px 16px', borderRadius: '20px', marginBottom: '20px', border: '1px solid rgba(184, 137, 43, 0.4)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--brass)', boxShadow: '0 0 10px var(--brass)' }}></span>
              <p style={{ color: 'var(--brass)', fontSize: '0.75rem', margin: 0, textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>Jaipur Arts Portal</p>
            </div>
            
            <h2 style={{ fontSize: '2rem', margin: '0 0 24px 0', fontFamily: 'var(--font-heading)', color: 'var(--paper)' }}>
              <span>{greeting.split(' ')[0]}</span> {greeting.split(' ')[1]}!
            </h2>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.03)', 
              backdropFilter: 'blur(10px)',
              padding: '24px', 
              borderRadius: '12px', 
              border: '1px solid rgba(255,255,255,0.08)', 
              width: '100%', 
              boxSizing: 'border-box',
              boxShadow: 'inset 0 2px 20px rgba(255,255,255,0.02)'
            }}>
              <p style={{ 
                fontSize: '2.2rem', 
                fontWeight: '800', 
                margin: '0 0 8px 0', 
                fontFamily: 'monospace',
                background: 'linear-gradient(to right, #ffffff, #a09d9a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '2px'
              }}>{formattedTime}</p>
              <p style={{ margin: 0, color: '#A09D9A', fontSize: '0.95rem', fontWeight: '500' }}>{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Website Traffic Graph Section */}
      <div style={{ background: 'var(--paper)', padding: '32px', borderRadius: '6px', border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, color: 'var(--espresso)', fontSize: '1.5rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={24} color="var(--brick)" />
            Daily Website Traffic
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--walnut)', background: 'var(--cream)', padding: '4px 14px', borderRadius: '20px', fontFamily: 'var(--font-mono)' }}>Last 7 Days</span>
        </div>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={traffic} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A83D2C" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#A83D2C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(46,33,22,0.08)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6E4A2E', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6E4A2E', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--paper)', borderRadius: '6px', border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}
                itemStyle={{ color: 'var(--espresso)', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="visitors" stroke="#A83D2C" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Business Stats Section */}
      <h3 style={{ fontSize: '1.4rem', color: 'var(--espresso)', fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>Business Metrics</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {[
          { title: 'Happy Customers', count: metrics.happyCustomersCount, icon: <Users size={28} /> },
          { title: 'Completed Projects', count: metrics.completedProjectsCount, icon: <CheckCircle size={28} /> },
          { title: 'Years Experience', count: metrics.yearsExperienceCount || '7+ Yrs', icon: <Briefcase size={28} /> },
          { title: 'Total Branches', count: metrics.totalBranchesCount, icon: <MapPin size={28} /> },
        ].map((metric, idx) => (
          <div key={idx} style={{ 
            background: 'var(--paper)', 
            padding: '24px', 
            borderRadius: '6px', 
            border: '1px solid var(--line)',
            boxShadow: 'var(--shadow)',
            textAlign: 'center'
          }}>
            <div style={{ color: 'var(--brick)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              {metric.icon}
            </div>
            <p style={{ margin: '0 0 8px 0', fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--espresso)', fontFamily: 'var(--font-heading)' }}>{metric.count}</p>
            <h4 style={{ margin: 0, color: 'var(--walnut)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', fontWeight: '500' }}>{metric.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
