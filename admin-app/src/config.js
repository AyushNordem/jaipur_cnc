// Centralized API Base URL configuration for Vercel, Railway & local environments
const DEFAULT_RAILWAY_BACKEND = 'https://jaipurcnc-production.up.railway.app';

const rawApiUrl = import.meta.env.VITE_API_URL;

const formatApiUrl = (url) => {
  if (!url || !url.trim()) {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return DEFAULT_RAILWAY_BACKEND;
    }
    return 'http://localhost:5000';
  }
  let trimmed = url.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    trimmed = `https://${trimmed}`;
  }
  
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && trimmed.startsWith('http://')) {
    trimmed = trimmed.replace('http://', 'https://');
  }

  return trimmed.replace(/\/+$/, '');
};

export const API_BASE_URL = formatApiUrl(rawApiUrl);

export const getFullMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) {
    if (typeof window !== 'undefined' && window.location.protocol === 'https:' && url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    return url;
  }
  return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};
