import React from 'react';
import { BadgeCheck, Users, Heart, MessageCircle, BarChart3, ExternalLink } from 'lucide-react';

const ProfileCard = ({ profile }) => {
  
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const isExcellentEngagement = profile.engagement_rate >= 5.0;
  const isGoodEngagement = profile.engagement_rate >= 2.0 && profile.engagement_rate < 5.0;

  return (
    <div className="profile-card glass-panel">
      
      <div className="profile-header">
         <div className="avatar-container">
            {profile.profile_pic_url ? (
               <img src={profile.profile_pic_url} alt={profile.username} className="avatar" />
            ) : (
               <div className="avatar-placeholder">{profile.username.charAt(0).toUpperCase()}</div>
            )}
         </div>
         <div className="profile-info">
            <h3 className="fullname">
               {profile.full_name || profile.username}
               {profile.is_verified && <BadgeCheck size={18} className="verified-badge" />}
            </h3>
            <a href={`https://instagram.com/${profile.username}`} target="_blank" rel="noopener noreferrer" className="username">
               @{profile.username} <ExternalLink size={14} />
            </a>
         </div>
      </div>

      <div className="profile-bio">
         <p>{profile.biography ? (profile.biography.length > 100 ? `${profile.biography.substring(0, 100)}...` : profile.biography) : 'No biography available.'}</p>
      </div>

      <div className="metrics-grid">
         <div className="metric-box">
            <Users size={18} className="metric-icon followers" />
            <div className="metric-data">
               <span className="metric-label">Followers</span>
               <span className="metric-value">{formatNumber(profile.followers_count)}</span>
            </div>
         </div>
         
         <div className="metric-box highlight">
            <BarChart3 size={18} className={`metric-icon er ${isExcellentEngagement ? 'excellent' : isGoodEngagement ? 'good' : 'average'}`} />
            <div className="metric-data">
               <span className="metric-label">Avg. ER</span>
               <span className="metric-value">{profile.engagement_rate}%</span>
            </div>
         </div>

         <div className="metric-box">
            <Heart size={18} className="metric-icon likes" />
            <div className="metric-data">
               <span className="metric-label">Avg Likes</span>
               <span className="metric-value">{formatNumber(profile.average_likes)}</span>
            </div>
         </div>
         
         <div className="metric-box">
            <MessageCircle size={18} className="metric-icon comments" />
            <div className="metric-data">
               <span className="metric-label">Avg Cmts</span>
               <span className="metric-value">{formatNumber(profile.average_comments)}</span>
            </div>
         </div>
      </div>

      {profile.latest_posts_urls && profile.latest_posts_urls.length > 0 && (
         <div className="recent-posts-section">
            <span className="section-label">Recent Posts URL</span>
            <div className="post-links">
               {profile.latest_posts_urls.map((url, index) => (
                  <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="post-link">Post {index + 1}</a>
               ))}
            </div>
         </div>
      )}

    </div>
  );
};

export default ProfileCard;
