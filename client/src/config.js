/**
 * API base URL for the backend.
 * Set VITE_API_URL in Vercel (e.g. https://ucla-club-finder.onrender.com) for production.
 * Falls back to localhost for development.
 */
export const API_BASE =
  (import.meta.env.VITE_API_URL && String(import.meta.env.VITE_API_URL).trim()) ||
  'http://localhost:4000';
