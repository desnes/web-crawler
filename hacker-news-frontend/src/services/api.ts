const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchNews = async (endpoint: string): Promise<HNNews[]> => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    mode: 'cors', // Habilita CORS
    credentials: 'include', // Si necesitas enviar cookies/tokens
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.statusText}`);
  }

  // Verifica que la respuesta tenga el header CORS
  if (!response.headers.get('Access-Control-Allow-Origin')) {
    console.warn('CORS header missing in response');
  }

  return response.json();
};