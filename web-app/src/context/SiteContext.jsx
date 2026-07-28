import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dynamic global site settings from backend API
    axios.get('http://localhost:5000/api/settings')
      .then(res => {
        const settingsData = res.data?.data || res.data?.settings || res.data || {};
        setSiteData(settingsData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching site settings:", err);
        setLoading(false);
      });

    // Track real-time daily visitor hit
    axios.post('http://localhost:5000/api/analytics/track')
      .catch(() => {});
  }, []);

  return (
    <SiteContext.Provider value={{ siteData, loading }}>
      {children}
    </SiteContext.Provider>
  );
};
