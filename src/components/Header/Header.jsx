import SearchBar from './SearchBar';
import ThemeToggle from '../ThemeToggle';

const Header = ({ 
  darkMode, 
  onThemeToggle, 
  searchQuery, 
  onSearchChange, 
  onSearchSubmit,
  useMockData 
}) => {
  return (
    <header className={`shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              📰 News Feed {useMockData && '(Demo)'}
            </h1>
            <ThemeToggle 
              darkMode={darkMode} 
              onToggle={onThemeToggle}
              className="md:hidden"
            />
          </div>
          
          <div className="flex space-x-2">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              onSearchSubmit={onSearchSubmit}
              darkMode={darkMode}
            />
            <ThemeToggle 
              darkMode={darkMode} 
              onToggle={onThemeToggle}
              className="hidden md:block"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;