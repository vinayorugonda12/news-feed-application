import ArticleCard from './ArticleCard';

const ArticleList = ({ articles, darkMode }) => {
  if (articles.length === 0) {
    return (
      <div className={`text-center py-12 ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <p className="text-lg">No articles found. Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <ArticleCard
          key={index}
          article={article}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};

export default ArticleList;