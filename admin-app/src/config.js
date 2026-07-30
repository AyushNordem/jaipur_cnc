// Centralized EC2/Local Production API Base URL
export const API_BASE_URL = (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim())
  ? import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')
  : (typeof window !== 'undefined' && window.location.hostname)
    ? `${window.location.protocol}//${window.location.hostname}:5000`
    : 'http://localhost:5000';

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
