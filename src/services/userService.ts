import axios from 'axios';

// This would be replaced with actual API endpoints in production
const API_URL = 'http://localhost:5000/api';

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

interface UserProfile {
  displayName: string;
  notifications: {
    emailDigest: boolean;
    stockAlerts: boolean;
    breakingNews: boolean;
    weeklyReport: boolean;
  };
}

/**
 * Save user to database after authentication
 */
export async function saveUserToDatabase(userData: UserData) {
  try {
    // In a real implementation, this would call the actual backend API
    console.log('User data saved to database:', userData);
    return { success: true };
  } catch (error) {
    console.error('Error saving user to database:', error);
    throw error;
  }
}

/**
 * Get user's saved news
 */
export async function getUserSavedNews(userId: string) {
  try {
    // In a real implementation, this would call the actual backend API
    // For demo purposes, we'll return mock data
    return getMockSavedNews();
  } catch (error) {
    console.error('Error fetching saved news:', error);
    throw error;
  }
}

/**
 * Get user's liked news
 */
export async function getUserLikedNews(userId: string) {
  try {
    // In a real implementation, this would call the actual backend API
    // For demo purposes, we'll return mock data
    return getMockLikedNews();
  } catch (error) {
    console.error('Error fetching liked news:', error);
    throw error;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, profileData: UserProfile) {
  try {
    // In a real implementation, this would call the actual backend API
    console.log('User profile updated:', profileData);
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

// Mock data for demonstration
function getMockSavedNews() {
  return [
    {
      id: '2',
      title: 'Federal Reserve Signals Potential Interest Rate Cuts for Next Quarter',
      summary: [
        'The Federal Reserve has indicated it may begin cutting interest rates in the coming quarter.',
        'This shift comes as inflation shows signs of cooling to near the target 2% annual rate.',
        'Markets responded positively with the S&P 500 gaining 1.2% following the announcement.',
        'Economists predict up to three quarter-point cuts may occur before year-end.',
        'Housing market analysts anticipate this could reinvigorate mortgage applications and home sales.'
      ],
      imageUrl: 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg',
      publishedAt: '2023-11-14T14:45:00Z',
      source: 'Economic Times',
      url: 'https://example.com/news/2'
    },
    {
      id: '5',
      title: 'Major Retail Chain Announces Expansion with 200 New Stores',
      summary: [
        'National retail chain ValueMart has announced plans to open 200 new locations over the next two years.',
        'The expansion will create an estimated 15,000 jobs across 30 states.',
        'This comes against the trend of retail contractions and store closures in the industry.',
        'The company attributes success to its hybrid online/in-store model and value pricing strategy.',
        'Analysts see this as evidence of a possible broader retail recovery in certain segments.'
      ],
      imageUrl: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg',
      publishedAt: '2023-11-11T16:30:00Z',
      source: 'Retail Insider',
      url: 'https://example.com/news/5'
    }
  ];
}

function getMockLikedNews() {
  return [
    {
      id: '1',
      title: 'Tech Giants Announce Collaboration on AI Safety Standards',
      summary: [
        'Major tech companies including Google, Microsoft, and OpenAI have formed a coalition to develop safety standards for artificial intelligence.',
        'The coalition aims to address concerns about AI risks while promoting innovation.',
        'Standards will focus on model evaluation, security benchmarks, and responsible deployment practices.',
        'This marks the first major industry-wide effort to self-regulate generative AI technologies.',
        'Critics argue that government regulation is still necessary alongside industry initiatives.'
      ],
      imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      publishedAt: '2023-11-15T08:30:00Z',
      source: 'TechDaily',
      url: 'https://example.com/news/1'
    },
    {
      id: '3',
      title: 'Startup Raises $50 Million to Develop Sustainable Battery Technology',
      summary: [
        'GreenCell, a cleantech startup, has secured $50 million in Series B funding.',
        'The company is developing batteries using abundant materials that avoid rare earth elements.',
        'Their technology promises 40% longer life and 30% faster charging than current lithium-ion batteries.',
        'Major investors include Breakthrough Energy Ventures and several automotive manufacturers.',
        'The funding will accelerate production scaling and commercial partnerships with electric vehicle makers.'
      ],
      imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      publishedAt: '2023-11-13T09:15:00Z',
      source: 'VentureBeat',
      url: 'https://example.com/news/3'
    }
  ];
}