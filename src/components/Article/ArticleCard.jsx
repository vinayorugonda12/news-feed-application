const ArticleCard = ({ article, darkMode }) => {
  const handleImageError = (e) => {
    e.target.src = `https://images.unsplash.com/photo-1585241936939-be4099591252?w=400&h=250&fit=crop&q=80`;
  };

  // Use urlToImage for NewsAPI, image for GNews
  const imageUrl = article.urlToImage || article.image;

  return (
    <article className={`rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>
      <div className="p-4">
        <h2 className={`text-lg font-semibold mb-2 line-clamp-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {article.title}
        </h2>
        <p className={`text-sm mb-4 line-clamp-3 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {article.description}
        </p>
        <div className="flex justify-between items-center text-xs mb-3">
          <span className={`${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {article.source?.name || 'Unknown Source'}
          </span>
          <span className={`${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full text-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          Read Full Article
        </a>
      </div>
    </article>
  );
};

export default ArticleCard;