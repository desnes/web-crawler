const FilterService = require('../../../src/services/filter.service');

describe('FilterService', () => {
  describe('countWords()', () => {
    it('debería contar correctamente el número de palabras en un título', () => {
      expect(FilterService.countWords('Hello world')).toBe(2);
      expect(FilterService.countWords('This is a test title')).toBe(5);
      expect(FilterService.countWords('Title with punctuation!')).toBe(3);
      expect(FilterService.countWords('')).toBe(0);
      expect(FilterService.countWords(null)).toBe(0);
    });
  });

  describe('filterLongTitles()', () => {
    it('debería filtrar títulos largos (más de 5 palabras) y ordenarlos por comentarios', () => {
      const entries = [
        { title: 'A short title', comments: 20, points: 50 },
        { title: 'This is an example of a long title with many words', comments: 10, points: 60 },
        { title: 'Another long title that exceeds five words', comments: 30, points: 40 }
      ];

      const result = FilterService.filterLongTitles(entries);

      expect(result).toEqual([
        { title: 'Another long title that exceeds five words', comments: 30, points: 40 },
        { title: 'This is an example of a long title with many words', comments: 10, points: 60 }
      ]);
    });
  });

  describe('filterShortTitles()', () => {
    it('debería filtrar títulos cortos (5 palabras o menos) y ordenarlos por puntos', () => {
      const entries = [
        { title: 'Short title', comments: 20, points: 50 },
        { title: 'Tiny title', comments: 15, points: 70 },
        { title: 'A longer title with many words', comments: 10, points: 90 }
      ];

      const result = FilterService.filterShortTitles(entries);

      expect(result).toEqual([
        { title: 'Tiny title', comments: 15, points: 70 },
        { title: 'Short title', comments: 20, points: 50 }
      ]);
    });
  });
});