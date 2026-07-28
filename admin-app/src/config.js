// Centralized API Base URL configuration for Railway & local environments
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getFullMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};
