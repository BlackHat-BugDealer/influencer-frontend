import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchDashboard = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Split by comma, remove whitespace, filter empty strings
    const usernames = input.split(',').map(u => u.trim().replace('@', '')).filter(u => u);
    if (usernames.length > 0) {
      onSearch(usernames);
    }
  };

  return (
    <div className="search-dashboard">
      <form onSubmit={handleSubmit} className="search-form glass-panel">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={24} />
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. mrbeast, charlidamelio, selenagomez"
            className="search-input"
            disabled={isLoading}
          />
        </div>
        <button type="submit" className="primary-btn" disabled={isLoading || !input.trim()}>
          {isLoading ? 'Scanning...' : 'Discover'}
        </button>
      </form>
      <div className="search-tips">
         <p>💡 Tip: Enter multiple usernames separated by commas to compare metrics side-by-side.</p>
      </div>
    </div>
  );
};

export default SearchDashboard;
