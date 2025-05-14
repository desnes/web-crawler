import { useState, useEffect } from 'react'
import { fetchNews } from '../services/api'
import { NewsCard } from '../components/NewsCard'
import { Filters } from '../components/Filters'
import { SkeletonLoader } from '../components/SkeletonLoader'

export const Home = () => {
  const [news, setNews] = useState<HNNews[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'long' | 'short'>('all')

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true)
        let endpoint = '/news'
        if (filter === 'long') endpoint = '/news/filter/long-titles'
        if (filter === 'short') endpoint = '/news/filter/short-titles'
        
        const data = await fetchNews(endpoint)
        setNews(data)
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    getNews()
  }, [filter])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-hn-orange">Hacker News</h1>
      
      <Filters currentFilter={filter} onFilterChange={setFilter} />
      
      {loading ? (
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <SkeletonLoader key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {news.map((item) => (
            <NewsCard key={item.number} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}