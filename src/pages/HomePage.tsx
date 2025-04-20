import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, ThumbsUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getAllNews, saveNewsItem, likeNewsItem } from '../services/newsService';
import NewsCard from '../components/news/NewsCard';
import HeroSection from '../components/home/HeroSection';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface NewsItem {
  id: string;
  title: string;
  summary: string[];
  imageUrl: string;
  publishedAt: string;
  source: string;
  url: string;
}

const HomePage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const newsData = await getAllNews();
        setNews(newsData);
        setError(null);
      } catch (err) {
        setError('Failed to load news. Please try again later.');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleSaveNews = async (newsId: string) => {
    if (!currentUser) {
      alert('Please log in to save news');
      return;
    }

    try {
      await saveNewsItem(newsId, currentUser.uid);
      alert('News saved successfully!');
    } catch (err) {
      console.error('Error saving news:', err);
      alert('Failed to save news. Please try again.');
    }
  };

  const handleLikeNews = async (newsId: string) => {
    if (!currentUser) {
      alert('Please log in to like news');
      return;
    }

    try {
      await likeNewsItem(newsId, currentUser.uid);
      alert('News liked successfully!');
    } catch (err) {
      console.error('Error liking news:', err);
      alert('Failed to like news. Please try again.');
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Latest Business News</h2>
          <Link 
            to="/dashboard" 
            className="text-primary-600 hover:text-primary-700 flex items-center"
          >
            {currentUser && (
              <>
                View saved news <ArrowRight size={16} className="ml-1" />
              </>
            )}
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <NewsCard 
                key={item.id}
                news={item}
                onSave={() => handleSaveNews(item.id)}
                onLike={() => handleLikeNews(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;