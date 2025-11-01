const ThemeToggle = ({ darkMode, onToggle, className = '' }) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-lg transition-colors ${className} ${
        darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'
      }`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;