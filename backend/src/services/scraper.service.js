const axios = require('axios');
const cheerio = require('cheerio');

class ScraperService {
  constructor() {
    this.cache = null;
    this.cacheTime = null;
    this.CACHE_DURATION = 15 * 60 * 1000;
  }

  async fetchHNNews() {
    if (this.cache && Date.now() - this.cacheTime < this.CACHE_DURATION) {
      return this.cache;
    }

    try {
      const { data } = await axios.get('https://news.ycombinator.com/');
      const $ = cheerio.load(data);
      const entries = [];
      
      // Seleccionamos todas las filas que contienen noticias
      $('tr.athing').slice(0, 30).each((i, element) => {
        const titleElement = $(element).find('.titleline > a');
        const title = titleElement.text().trim();
        const url = titleElement.attr('href');
        const number = i + 1;
        
        // El siguiente tr hermano contiene los metadatos
        const metadataRow = $(element).next();
        
        // Extracción de puntos
        const pointsText = metadataRow.find('.score').text();
        const points = pointsText ? parseInt(pointsText.replace(' points', '')) : 0;
        
        // Extracción de comentarios
        const commentsLink = metadataRow.find('a:contains("comment"), a:contains("comments")');
        let comments = 0;
        
        if (commentsLink.length) {
          const commentsText = commentsLink.text();
          comments = parseInt(commentsText.replace(/[^0-9]/g, '')) || 0;
        }
        
        entries.push({ 
          number, 
          title, 
          points, 
          comments,
          url // Añadido para referencia
        });
      });

      this.cache = entries;
      this.cacheTime = Date.now();
      return entries;
    } catch (error) {
      console.error('Scraping failed:', error);
      throw new Error('Failed to scrape Hacker News');
    }
  }
}

module.exports = new ScraperService();