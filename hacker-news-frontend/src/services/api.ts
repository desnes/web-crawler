const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const fetchNews = async (endpoint: string): Promise<HNNews[]> => {
  const response = await fetch(`${API_BASE}${endpoint}`)
  if (!response.ok) {
    throw new Error('Failed to fetch news')
  }
  return response.json()
}