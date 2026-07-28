// Centralized API Base URL configuration for Railway & local environments
const rawApiUrl = import.meta.env.VITE_API_URL;

const formatApiUrl = (url) => {
  if (!url || !url.trim()) {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return window.location.origin;
    }
    return 'http://localhost:5000';
  }
  let trimmed = url.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    trimmed = `https://${trimmed}`;
  }
  return trimmed.replace(/\/+$/, '');
};

export const API_BASE_URL = formatApiUrl(rawApiUrl);

export const getFullMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};
