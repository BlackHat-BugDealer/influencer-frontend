import React, { useState } from 'react';
import SearchDashboard from './components/SearchDashboard';
import ProfileCard from './components/ProfileCard';
import ExportButton from './components/ExportButton';
import { Search } from 'lucide-react';

// Use Vite's environment variables to set the base API URL dynamically.
// In development, it points to localhost. In production on Vercel, we can pass it via env vars.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (usernames) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernames }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch the profiles.');
      }
      
      const data = await response.json();
      setProfiles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Background gradients for premium look */}
      <div className="gradient-blob shape-1"></div>
      <div className="gradient-blob shape-2"></div>
      <div className="gradient-blob shape-3"></div>
      
      <header className="app-header">
        <div className="logo">
          <div className="logo-icon"><Search size={20} color="white"/></div>
          <h1>Influencer<span className="accent">Hub</span></h1>
        </div>
        {profiles.length > 0 && (
          <ExportButton profiles={profiles} />
        )}
      </header>

      <main className="app-main">
        <section className="hero-section">
          <h2>Discover the perfect creators <br/>for your next campaign.</h2>
          <p className="subtitle">Enter Instagram usernames separated by commas to fetch detailed insights, engagement rates, and recent posts.</p>
          <SearchDashboard onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Scanning millions of data points...</p>
          </div>
        ) : (
          profiles.length > 0 && (
            <section className="results-section">
              <div className="results-header">
                <h3>Found {profiles.length} creator{profiles.length > 1 ? 's' : ''}</h3>
              </div>
              <div className="profiles-grid">
                {profiles.map(profile => (
                  <ProfileCard key={profile.username} profile={profile} />
                ))}
              </div>
            </section>
          )
        )}
      </main>
    </div>
  );
}

export default App;
