const axios = require('axios');
const scraperService = require('../../../src/services/scraper.service');

// Mock de axios
jest.mock('axios');

describe('ScraperService', () => {
  beforeEach(() => {
    // Restablecer la caché antes de cada prueba
    scraperService.cache = null;
    scraperService.cacheTime = null;
    jest.clearAllMocks();
  });

  describe('fetchHNNews()', () => {
    it('debería analizar correctamente el HTML de Hacker News', async () => {
      // HTML simulado con la estructura real de Hacker News
      const mockHtml = `
        <html>
          <body>
            <table>
              <tr class="athing" id="43974891">
                <td class="title">
                  <span class="titleline">
                    <a href="https://example.com/1">Test Title 1</a>
                  </span>
                </td>
              </tr>
              <tr>
                <td class="subtext">
                  <span class="score">100 points</span>
                  <a href="item?id=43974891">50 comments</a>
                </td>
              </tr>
              <tr class="athing" id="43974892">
                <td class="title">
                  <span class="titleline">
                    <a href="https://example.com/2">Test Title 2</a>
                  </span>
                </td>
              </tr>
              <tr>
                <td class="subtext">
                  <span class="score">101 points</span>
                  <a href="item?id=43974892">51 comments</a>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `;

      axios.get.mockResolvedValue({ data: mockHtml });

      const result = await scraperService.fetchHNNews();

      expect(result).toEqual([
        {
          number: 1,
          title: 'Test Title 1',
          points: 100,
          comments: 50,
          url: 'https://example.com/1'
        },
        {
          number: 2,
          title: 'Test Title 2',
          points: 101,
          comments: 51,
          url: 'https://example.com/2'
        }
      ]);
    });

    it('debería manejar errores de conexión', async () => {
      axios.get.mockRejectedValue(new Error('Network Error'));

      await expect(scraperService.fetchHNNews()).rejects.toThrow('Failed to scrape Hacker News');
    });

    it('debería utilizar la caché si está disponible', async () => {
      // Simular datos en caché
      scraperService.cache = [
        { number: 1, title: 'Cached Title 1', points: 90, comments: 30, url: 'https://cached.com/1' },
        { number: 2, title: 'Cached Title 2', points: 80, comments: 20, url: 'https://cached.com/2' },
      ];
      scraperService.cacheTime = Date.now();

      const result = await scraperService.fetchHNNews();

      expect(result).toEqual([
        { number: 1, title: 'Cached Title 1', points: 90, comments: 30, url: 'https://cached.com/1' },
        { number: 2, title: 'Cached Title 2', points: 80, comments: 20, url: 'https://cached.com/2' },
      ]);
    });
  });
});