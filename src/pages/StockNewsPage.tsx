import React, { useState, useEffect } from 'react';
import { getStockMarketNews, getStockSymbols } from '../services/stockService';
import { saveNewsItem, likeNewsItem } from '../services/newsService';
import { useAuth } from '../contexts/AuthContext';
import StockNewsCard from '../components/stocks/StockNewsCard';
import StockChart from '../components/stocks/StockChart';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface StockNews {
  id: string;
  headline: string;
  summary: string[];
  imageUrl: string;
  datetime: number;
  source: string;
  url: string;
  related: string;
}

interface StockSymbol {
  symbol: string;
  name: string;
  type: string;
}

const StockNewsPage: React.FC = () => {
  const [news, setNews] = useState<StockNews[]>([]);
  const [symbols, setSymbols] = useState<StockSymbol[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('AAPL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const symbolsData = await getStockSymbols();
        setSymbols(symbolsData);
      } catch (err) {
        console.error('Error fetching stock symbols:', err);
      }
    };
    
    fetchSymbols();
  }, []);
  
  useEffect(() => {
    const fetchStockNews = async () => {
      try {
        setLoading(true);
        const newsData = await getStockMarketNews(selectedSymbol);
        setNews(newsData);
        setError(null);
      } catch (err) {
        setError('Failed to load stock news. Please try again later.');
        console.error('Error fetching stock news:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (selectedSymbol) {
      fetchStockNews();
    }
  }, [selectedSymbol]);
  
  const handleSaveNews = async (newsId: string) => {
    if (!currentUser) {
      alert('Please log in to save news');
      return;
    }
    
    try {
      await saveNewsItem(newsId, currentUser.uid);
      alert('Stock news saved successfully!');
    } catch (err) {
      console.error('Error saving stock news:', err);
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
      alert('Stock news liked successfully!');
    } catch (err) {
      console.error('Error liking stock news:', err);
      alert('Failed to like news. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Stock Market News</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 sm:mb-0">
                  Latest News for {selectedSymbol}
                </h2>
                
                <div className="relative">
                  <select
                    value={selectedSymbol}
                    onChange={(e) => setSelectedSymbol(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {symbols.slice(0, 20).map((symbol) => (
                      <option key={symbol.symbol} value={symbol.symbol}>
                        {symbol.symbol} - {symbol.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-10">
                  <LoadingSpinner />
                </div>
              ) : error ? (
                <div className="bg-red-50 p-4 rounded-md">
                  <p className="text-red-600">{error}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {news.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">
                      No recent news available for this stock.
                    </p>
                  ) : (
                    news.map((item) => (
                      <StockNewsCard 
                        key={item.id}
                        news={item}
                        onSave={() => handleSaveNews(item.id)}
                        onLike={() => handleLikeNews(item.id)}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {selectedSymbol} Performance
              </h2>
              
              <StockChart symbol={selectedSymbol} />
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 mb-1">Current Price</p>
                  <p className="text-lg font-semibold text-gray-800" id="current-price">--</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 mb-1">Daily Change</p>
                  <p className="text-lg font-semibold" id="daily-change">--</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 mb-1">Market Cap</p>
                  <p className="text-lg font-semibold text-gray-800" id="market-cap">--</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 mb-1">Volume</p>
                  <p className="text-lg font-semibold text-gray-800" id="volume">--</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Popular Stocks
              </h2>
              
              <ul className="divide-y divide-gray-200">
                {['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'].map((symbol) => (
                  <li key={symbol} className="py-3">
                    <button
                      onClick={() => setSelectedSymbol(symbol)}
                      className={`w-full text-left px-3 py-2 rounded-md transition ${
                        selectedSymbol === symbol 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{symbol}</span>
                        <span className="text-sm text-gray-500 stock-price" data-symbol={symbol}>
                          --
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockNewsPage;