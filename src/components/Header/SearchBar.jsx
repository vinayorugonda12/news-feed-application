const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit, darkMode }) => {
  return (
    <form onSubmit={onSearchSubmit} className="flex space-x-2">
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search news..."
        className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          darkMode 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        }`}
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;