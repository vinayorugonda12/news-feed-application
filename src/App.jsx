import React, { useState, useEffect } from 'react';
import { useNews } from './hooks/useNews';
import Header from './components/Header/Header';
import CategoryFilters from './components/CategoryFilters';
import ArticleList from './components/Article/ArticleList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('general');
  
  const {
    articles,
    loading,
    error,
    useMockData,
    fetchNews,
    retryWithRealData
  } = useNews();

  const categories = [
    'general', 'business', 'technology', 'sports', 'health',
    'science', 'entertainment'
  ];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchNews(category, searchQuery);
    } else {
      fetchNews(category);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSearchQuery('');
  };

  const handleRetry = () => {
    retryWithRealData();
    fetchNews(category, searchQuery);
  };

  if (loading && articles.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner darkMode={darkMode} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header
        darkMode={darkMode}
        onThemeToggle={() => setDarkMode(!darkMode)}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearchSubmit={handleSearch}
        useMockData={useMockData}
      />

      <div className="container mx-auto px-4 py-6">
        <CategoryFilters
          categories={categories}
          currentCategory={category}
          onCategoryChange={handleCategoryChange}
          darkMode={darkMode}
        />
      </div>

      <main className="container mx-auto px-4 py-8">
        <ErrorMessage
          error={error}
          useMockData={useMockData}
          onRetry={handleRetry}
          darkMode={darkMode}
        />

        <ArticleList
          articles={articles}
          darkMode={darkMode}
        />

        {loading && articles.length > 0 && (
          <div className="text-center py-4">
            <LoadingSpinner 
              darkMode={darkMode} 
              message="Loading more articles..." 
            />
          </div>
        )}
      </main>

      <footer className={`py-6 mt-8 ${
        darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
      }`}>
        <div className="container mx-auto px-4 text-center">
          <p>Powered by News API | Built with React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;