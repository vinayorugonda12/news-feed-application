const ErrorMessage = ({ error, useMockData, onRetry, darkMode }) => {
  if (!error) return null;

  return (
    <>
      <div className={`mb-6 p-4 rounded-lg flex justify-between items-center ${
        darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-700'
      }`}>
        <span>{error}</span>
        {useMockData && (
          <button
            onClick={onRetry}
            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Retry
          </button>
        )}
      </div>

      {useMockData && (
        <div className={`mb-6 p-4 rounded-lg ${
          darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
        }`}>
          <p className="font-semibold">To get real news data:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
            <li>Get a free API key from <a href="https://newsapi.org/" className="underline" target="_blank" rel="noopener noreferrer">NewsAPI</a> or <a href="https://gnews.io/" className="underline" target="_blank" rel="noopener noreferrer">GNews</a></li>
            <li>Replace the API keys in the useNews.js file</li>
            <li>Click "Retry" above to fetch real news</li>
          </ol>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;