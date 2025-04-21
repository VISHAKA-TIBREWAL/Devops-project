import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getLatestNewsFromFirestore, NewsItemFromFirestore } from '../contexts/HomePageNews';
import NewsCard from '../components/news/NewsCard';
import HeroSection from '../components/home/HeroSection';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface NewsItem {
  id: string;
  title: string | null | undefined;
  summary: string[] | null | undefined;
  imageUrl: string | null | undefined;
  publishedAt: string | null | undefined;
  source: string | null | undefined;
  url: string | null | undefined;
}

const HomePage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true);
        const latestNewsData: NewsItemFromFirestore[] = await getLatestNewsFromFirestore();
        
        const formattedNews: NewsItem[] = latestNewsData.map(item => ({
          id: item.id || '',
          title: item.title || null,
          summary: item.summary || null,
          imageUrl: item.imageUrl || null,
          publishedAt: item.publishedAt || null,
          source: item.source || null,
          url: item.url || null,
        }));

        setNews(formattedNews);
        setError(null);
      } catch (err) {
        setError('Failed to load latest news. Please try again later.');
        console.error('Error fetching latest news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  const handleSaveNews = async (newsId: string) => {
    if (!currentUser) {
      alert('Please log in to save news');
      return;
    }

    // Assuming you have a saveNewsItem function in your newsService
    // that handles saving based on the news ID (which is the document ID)
    // and user ID. You would likely need to send the news item data
    // or at least the document ID to your service function.
    // Example:
    // try {
    //   const itemToSave = news.find(item => item.id === newsId);
    //   if (itemToSave) {
    //     await saveNewsItem(itemToSave, currentUser.uid);
    //     alert('News saved successfully!');
    //   }
    // } catch (err) {
    //   console.error('Error saving news:', err);
    //   alert('Failed to save news. Please try again.');
    // }
    alert('Save functionality not fully linked to the new data structure yet.'+newsId);
  };

  const handleLikeNews = async (newsId: string) => {
    if (!currentUser) {
      alert('Please log in to like news');
      return;
    }

    // Assuming you have a likeNewsItem function in your newsService
    // that handles liking based on the news ID and user ID.
    // Example:
    // try {
    //   await likeNewsItem(newsId, currentUser.uid);
    //   alert('News liked successfully!');
    // } catch (err) {
    //   console.error('Error liking news:', err);
    //   alert('Failed to like news. Please try again.');
    // }
    alert('Like functionality not fully linked to the new data structure yet.'+newsId);
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
