class FilterService {
    countWords(title) {
      if (!title) return 0;
      // Remove symbols and count words separated by spaces
      return title
        .replace(/[^\w\s]/g, '') // Remove non-word characters except spaces
        .split(/\s+/) // Split by one or more spaces
        .filter(word => word.length > 0) // Remove empty strings
        .length;
    }
  
    filterLongTitles(entries) {
      return entries
        .filter(entry => this.countWords(entry.title) > 5)
        .sort((a, b) => b.comments - a.comments);
    }
  
    filterShortTitles(entries) {
      return entries
        .filter(entry => this.countWords(entry.title) <= 5)
        .sort((a, b) => b.points - a.points);
    }
  }
  
  module.exports = new FilterService();