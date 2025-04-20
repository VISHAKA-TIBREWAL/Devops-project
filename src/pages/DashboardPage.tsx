import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { useAuth } from '../contexts/AuthContext';
import { getUserSavedNews, getUserLikedNews } from '../services/userService';
import NewsCard from '../components/news/NewsCard';
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

const DashboardPage: React.FC = () => {
  const [savedNews, setSavedNews] = useState<NewsItem[]>([]);
  const [likedNews, setLikedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('saved');
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const [savedNewsData, likedNewsData] = await Promise.all([
          getUserSavedNews(currentUser.uid),
          getUserLikedNews(currentUser.uid)
        ]);
        
        setSavedNews(savedNewsData);
        setLikedNews(likedNewsData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [currentUser]);
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Dashboard</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('saved')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'saved'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Saved News
              </button>
              <button
                onClick={() => setActiveTab('liked')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'liked'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Liked News
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : (
              <div>
                {activeTab === 'saved' && (
                  <div>
                    {savedNews.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-gray-500">You haven't saved any news articles yet.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedNews.map((item) => (
                          <NewsCard 
                            key={item.id}
                            news={item}
                            onSave={() => {}} // Already saved
                            onLike={() => {}} // Like functionality
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'liked' && (
                  <div>
                    {likedNews.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-gray-500">You haven't liked any news articles yet.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {likedNews.map((item) => (
                          <NewsCard 
                            key={item.id}
                            news={item}
                            onSave={() => {}} // Save functionality
                            onLike={() => {}} // Already liked
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;