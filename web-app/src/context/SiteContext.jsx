import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dynamic content from backend
    axios.get('http://localhost:5000/api/content')
      .then(res => {
        setSiteData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching site content:", err);
        setLoading(false);
      });
  }, []);

  return (
    <SiteContext.Provider value={{ siteData, loading }}>
      {children}
    </SiteContext.Provider>
  );
};
