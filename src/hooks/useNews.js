import { useState } from 'react';

// 👇 Your backend proxy endpoint (replace localhost if deployed)
const BACKEND_URL = 'http://localhost:5000/api/news';

// Fallback mock data
const MOCK_ARTICLES = [
  {
    title: 'Breaking: Major Technological Advancement in AI',
    description: 'Researchers have made significant progress in artificial intelligence that could revolutionize multiple industries.',
    urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    url: '#',
    publishedAt: new Date().toISOString(),
    source: { name: 'Tech News' }
  },
  {
    title: 'Global Markets Show Positive Trends',
    description: 'Stock markets around the world are experiencing growth amid positive economic indicators.',
    urlToImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop',
    url: '#',
    publishedAt: new Date().toISOString(),
    source: { name: 'Financial Times' }
  },
  {
    title: 'New Health Study Reveals Important Findings',
    description: 'Recent research provides new insights into maintaining optimal health and wellness.',
    urlToImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
    url: '#',
    publishedAt: new Date().toISOString(),
    source: { name: 'Health Journal' }
  },
  {
    title: 'Sports Championship Breaks Viewership Records',
    description: 'The recent championship game attracted millions of viewers worldwide, setting new records.',
    urlToImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop',
    url: '#',
    publishedAt: new Date().toISOString(),
    source: { name: 'Sports Network' }
  },
  {
    title: 'Climate Change Conference Reaches New Agreement',
    description: 'World leaders have agreed on new measures to combat climate change at the international summit.',
    urlToImage: 'https://images.unsplash.com/photo-1569163139394-de44cb54d0c2?w=400&h=250&fit=crop',
    url: '#',
    publishedAt: new Date().toISOString(),
    source: { name: 'Environmental News' }
  },
  {
    title: 'Space Exploration Reaches New Milestone',
    description: 'Latest space mission achieves unprecedented success in exploring distant planets.',
    urlToImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=250&fit=crop',
    url: '#',
    publishedAt: new Date().toISOString(),
    source: { name: 'Space Today' }
  }
];

// Map our categories (optional)
const categoryMap = {
  general: 'general',
  world: 'general',
  nation: 'general',
  business: 'business',
  technology: 'technology',
  entertainment: 'entertainment',
  sports: 'sports',
  science: 'science',
  health: 'health'
};

export const useNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);

  const fetchNews = async (category = 'general', query = '') => {
    try {
      setLoading(true);
      setError(null);

      // Build the query string for your backend
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (category) params.append('category', category);

      // Call your backend API (NOT NewsAPI directly)
      const url = `${BACKEND_URL}?${params.toString()}`;
      console.log('Fetching from backend:', url);

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.articles && data.articles.length > 0) {
        const validArticles = data.articles.filter(article =>
          article.title && article.title !== '[Removed]' &&
          article.description && article.description !== '[Removed]'
        );

        if (validArticles.length > 0) {
          setArticles(validArticles);
          setUseMockData(false);
        } else {
          throw new Error('No valid articles found');
        }
      } else {
        throw new Error('No articles found');
      }

    } catch (err) {
      console.error('Error fetching news:', err);

      // Fallback to mock data
      setArticles(MOCK_ARTICLES);
      setUseMockData(true);

      if (err.message.includes('rate limit')) {
        setError('API rate limit exceeded. Showing demo articles.');
      } else if (err.message.includes('API key') || err.message.includes('401')) {
        setError('Invalid or unauthorized API key. Showing demo articles.');
      } else {
        setError('Failed to fetch live news. Showing demo articles.');
      }
    } finally {
      setLoading(false);
    }
  };

  const retryWithRealData = () => {
    setUseMockData(false);
    setError(null);
  };

  return {
    articles,
    loading,
    error,
    useMockData,
    fetchNews,
    retryWithRealData
  };
};
