import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, CheckCircle, Box, MapPin, Image as ImageIcon, MessageSquare, Briefcase, FileText, TrendingUp } from 'lucide-react';

const trafficData = [
  { name: 'Mon', visitors: 120 },
  { name: 'Tue', visitors: 150 },
  { name: 'Wed', visitors: 180 },
  { name: 'Thu', visitors: 220 },
  { name: 'Fri', visitors: 300 },
  { name: 'Sat', visitors: 280 },
  { name: 'Sun', visitors: 350 },
];

const Dashboard = () => {
  const [counts, setCounts] = useState({
    gallery: 0,
    services: 0,
    reviews: 0
  });

  const [metrics, setMetrics] = useState({
    happyCustomersCount: '5,000+',
    completedProjectsCount: '12,500',
    activeResourcesCount: '45',
    totalBranchesCount: '3'
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/content')
      .then(res => {
        const data = res.data;
        setCounts({
          gallery: data?.galleryImages?.length || 0,
          services: data?.services?.length || 0,
          reviews: data?.testimonials?.length || 0
        });
        setMetrics({
          happyCustomersCount: data?.happyCustomersCount || '5,000+',
          completedProjectsCount: data?.completedProjectsCount || '12,500',
          activeResourcesCount: data?.activeResourcesCount || '45',
          totalBranchesCount: data?.totalBranchesCount || '3'
        });
      })
      .catch(err => console.error("Error fetching live data for dashboard", err));
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
            { title: 'Total Inquiries', count: '1,248', icon: <MessageSquare size={24} />, color: '#4caf50', bg: '#e8f5e9' },
            { title: 'Customer Reviews', count: counts.reviews, icon: <FileText size={24} />, color: '#2196f3', bg: '#e3f2fd' },
            { title: 'Gallery Images', count: counts.gallery, icon: <ImageIcon size={24} />, color: '#9c27b0', bg: '#f3e5f5' },
            { title: 'Active Services', count: counts.services, icon: <Briefcase size={24} />, color: '#ff9800', bg: '#fff3e0' },
          ].map((stat, idx) => (
            <div key={idx} style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ background: stat.bg, color: stat.color, width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {stat.icon}
              </div>
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: '#666', fontSize: '0.95rem' }}>{stat.title}</h3>
                <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold', color: '#323232' }}>{stat.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Welcome Banner */}
        <div style={{ 
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1c1c1c 0%, #0a0a0a 100%)', 
          padding: '40px 32px', 
          borderRadius: '16px', 
          color: 'white',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          {/* Decorative Glow */}
          <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '150%', height: '150%', background: 'radial-gradient(circle, rgba(139, 115, 85, 0.15) 0%, rgba(0,0,0,0) 60%)', pointerEvents: 'none' }}></div>
          
          <div style={{ zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(139, 115, 85, 0.15)', padding: '6px 16px', borderRadius: '20px', marginBottom: '20px', border: '1px solid rgba(139, 115, 85, 0.3)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d4af37', boxShadow: '0 0 10px #d4af37' }}></span>
              <p style={{ color: '#d4af37', fontSize: '0.75rem', margin: 0, textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>Jaipur Arts Portal</p>
            </div>
            
            <h2 style={{ fontSize: '2.2rem', margin: '0 0 32px 0', fontWeight: '300', letterSpacing: '1px' }}>
              <span style={{ fontWeight: '600' }}>{greeting.split(' ')[0]}</span> {greeting.split(' ')[1]}!
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
      <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, color: '#323232', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={24} color="var(--color-accent, #8b7355)" />
            Daily Website Traffic
          </h2>
          <span style={{ fontSize: '0.9rem', color: '#666', background: '#f5f2f0', padding: '4px 12px', borderRadius: '20px' }}>Last 7 Days</span>
        </div>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b7355" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b7355" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#323232', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="visitors" stroke="#8b7355" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Business Stats Section */}
      <h3 style={{ fontSize: '1.4rem', color: '#323232', marginBottom: '20px' }}>Business Metrics</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {[
          { title: 'Happy Customers', count: metrics.happyCustomersCount, icon: <Users size={28} /> },
          { title: 'Completed Projects', count: metrics.completedProjectsCount, icon: <CheckCircle size={28} /> },
          { title: 'Active Resources', count: metrics.activeResourcesCount, icon: <Box size={28} /> },
          { title: 'Total Branches', count: metrics.totalBranchesCount, icon: <MapPin size={28} /> },
        ].map((metric, idx) => (
          <div key={idx} style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid #eee',
            textAlign: 'center'
          }}>
            <div style={{ color: '#8b7355', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              {metric.icon}
            </div>
            <p style={{ margin: '0 0 8px 0', fontSize: '2.2rem', fontWeight: 'bold', color: '#323232' }}>{metric.count}</p>
            <h4 style={{ margin: 0, color: '#666', fontSize: '1rem', fontWeight: '500' }}>{metric.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
