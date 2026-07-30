// Centralized API Base URL configuration for local & production environments
const DEFAULT_RAILWAY_BACKEND = 'https://jaipurcnc-production.up.railway.app';

const rawApiUrl = import.meta.env.VITE_API_URL;

const formatApiUrl = (url) => {
  if (!url || !url.trim()) {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      if (host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.startsWith('10.') || host.startsWith('172.')) {
        return `http://${host}:5000`;
      }
    }
    return DEFAULT_RAILWAY_BACKEND;
  }
  let trimmed = url.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    trimmed = `http://${trimmed}`;
  }
  return trimmed.replace(/\/+$/, '');
};

export const API_BASE_URL = formatApiUrl(rawApiUrl);

export const getFullMediaUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('blob:') || url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    if (typeof window !== 'undefined' && window.location.protocol === 'https:' && url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    return url;
  }
  return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};
