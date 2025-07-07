import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';
import ReviewSummary from './ReviewSummary';
import { Plus, Filter, SortAsc, Search, X } from 'lucide-react';

const Reviews = ({ business }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewSummary, setReviewSummary] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    recommendationRate: 0,
    avgResponseTime: 0,
    photosCount: 0,
    recentTrend: 0
  });
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    rating: '',
    sortBy: 'newest',
    searchTerm: '',
    withPhotos: false,
    verified: false
  });

  // Mock data - replace with real API calls
  const mockReviews = [
    {
      id: 1,
      user: {
        full_name: 'Anna Kask',
        avatar_url: null,
        is_verified: true
      },
      rating: 5,
      title: 'Suurepärane teenindus!',
      content: 'Väga meeldiv kogemus. Personal oli sõbralik ja abivalmis. Toit oli maitsev ja kiiresti valmis. Kindlasti tulen tagasi ja soovitan ka teistele.',
      visit_date: '2024-01-15',
      service_type: 'dine_in',
      created_at: '2024-01-16T10:30:00Z',
      recommended: true,
      helpful_count: 8,
      photos: [
        { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop', caption: 'Maitsev burger' },
        { url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', caption: 'Hubane interjöör' }
      ],
      category_ratings: {
        food_quality: 5,
        service: 5,
        atmosphere: 4,
        value_for_money: 4,
        cleanliness: 5
      },
      business_reply: {
        content: 'Täname südamlikku tagasisidet! Meil on väga hea meel, et Teil meie juures meeldiv kogemus oli. Ootame Teid jälle!',
        created_at: '2024-01-17T09:15:00Z'
      }
    },
    {
      id: 2,
      user: {
        full_name: 'Mart Tamm',
        avatar_url: null,
        is_verified: false
      },
      rating: 4,
      title: 'Hea koht, aga võiks parem olla',
      content: 'Üldiselt korralik teenindus ja toit. Ainuke miinus oli natuke pikk ootamine, aga muidu kõik oli hästi.',
      visit_date: '2024-01-10',
      service_type: 'dine_in',
      created_at: '2024-01-12T14:20:00Z',
      recommended: true,
      helpful_count: 3,
      photos: [],
      category_ratings: {
        food_quality: 4,
        service: 3,
        atmosphere: 4,
        value_for_money: 4,
        cleanliness: 4
      }
    },
    {
      id: 3,
      user: {
        full_name: 'Liisa Mägi',
        avatar_url: null,
        is_verified: true
      },
      rating: 3,
      title: 'Keskmisest kogemus',
      content: 'Toit oli okei, aga teenindus võiks parem olla. Ootamine oli pikk ja personal tundus halb tujuline.',
      visit_date: '2024-01-05',
      service_type: 'takeaway',
      created_at: '2024-01-06T16:45:00Z',
      recommended: false,
      helpful_count: 1,
      photos: [],
      category_ratings: {
        food_quality: 3,
        service: 2,
        atmosphere: 3,
        value_for_money: 3,
        cleanliness: 3
      }
    }
  ];

  useEffect(() => {
    loadReviews();
  }, [business.id, filters]);

  const loadReviews = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredReviews = [...mockReviews];
      
      // Apply filters
      if (filters.rating) {
        filteredReviews = filteredReviews.filter(review => review.rating === parseInt(filters.rating));
      }
      
      if (filters.searchTerm) {
        filteredReviews = filteredReviews.filter(review => 
          review.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          review.content.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }
      
      if (filters.withPhotos) {
        filteredReviews = filteredReviews.filter(review => review.photos.length > 0);
      }
      
      if (filters.verified) {
        filteredReviews = filteredReviews.filter(review => review.user.is_verified);
      }
      
      // Apply sorting
      switch (filters.sortBy) {
        case 'newest':
          filteredReviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        case 'oldest':
          filteredReviews.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          break;
        case 'highest':
          filteredReviews.sort((a, b) => b.rating - a.rating);
          break;
        case 'lowest':
          filteredReviews.sort((a, b) => a.rating - b.rating);
          break;
        case 'helpful':
          filteredReviews.sort((a, b) => b.helpful_count - a.helpful_count);
          break;
      }
      
      setReviews(filteredReviews);
      
      // Calculate summary stats
      const totalReviews = mockReviews.length;
      const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
      
      const ratingDistribution = mockReviews.reduce((dist, review) => {
        dist[review.rating]++;
        return dist;
      }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
      
      const recommendationRate = (mockReviews.filter(review => review.recommended).length / totalReviews) * 100;
      const photosCount = mockReviews.reduce((sum, review) => sum + review.photos.length, 0);
      
      setReviewSummary({
        averageRating,
        totalReviews,
        ratingDistribution,
        recommendationRate,
        avgResponseTime: 4,
        photosCount,
        recentTrend: 0.2
      });
      
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      // Simulate API call to submit review
      console.log('Submitting review:', reviewData);
      
      // Add to local state optimistically
      const newReview = {
        id: Date.now(),
        user: {
          full_name: 'Sina',
          avatar_url: null,
          is_verified: false
        },
        ...reviewData,
        created_at: new Date().toISOString(),
        helpful_count: 0,
        photos: reviewData.photos.map(photo => ({ url: photo.url }))
      };
      
      setReviews(prev => [newReview, ...prev]);
      setShowReviewForm(false);
      
      // Show success message
      alert('Arvustus edukalt avaldatud!');
      
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Viga arvustuse avaldamisel. Palun proovi uuesti.');
    }
  };

  const handleVoteHelpful = async (reviewId, isHelpful, hasVoted) => {
    try {
      // Simulate API call
      console.log('Voting on review:', { reviewId, isHelpful, hasVoted });
      
      // Update local state
      setReviews(prev => prev.map(review => {
        if (review.id === reviewId) {
          const change = hasVoted ? (isHelpful ? 1 : 0) : (isHelpful ? -1 : 0);
          return {
            ...review,
            helpful_count: Math.max(0, review.helpful_count + change)
          };
        }
        return review;
      }));
      
    } catch (error) {
      console.error('Error voting on review:', error);
    }
  };

  const clearFilters = () => {
    setFilters({
      rating: '',
      sortBy: 'newest',
      searchTerm: '',
      withPhotos: false,
      verified: false
    });
  };

  const hasActiveFilters = filters.rating || filters.searchTerm || filters.withPhotos || filters.verified || filters.sortBy !== 'newest';

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Arvustused</h2>
        <button
          onClick={() => setShowReviewForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Lisa arvustus</span>
        </button>
      </div>

      {/* Review Summary */}
      <ReviewSummary {...reviewSummary} businessId={business.id} />

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          
          {/* Search */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Otsi arvustustest..."
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Rating Filter */}
          <select
            value={filters.rating}
            onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Kõik hinnangud</option>
            <option value="5">5 tähte</option>
            <option value="4">4 tähte</option>
            <option value="3">3 tähte</option>
            <option value="2">2 tähte</option>
            <option value="1">1 täht</option>
          </select>
          
          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Uusimad</option>
            <option value="oldest">Vanemad</option>
            <option value="highest">Kõrgeimad hinnangud</option>
            <option value="lowest">Madalaimad hinnangud</option>
            <option value="helpful">Kõige kasulikumad</option>
          </select>
          
          {/* Additional Filters */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={filters.withPhotos}
                onChange={(e) => setFilters(prev => ({ ...prev, withPhotos: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Koos fotodega</span>
            </label>
            
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={filters.verified}
                onChange={(e) => setFilters(prev => ({ ...prev, verified: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Verifieeritud</span>
            </label>
          </div>
          
          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Lähtesta</span>
            </button>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Laadin arvustusi...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              {hasActiveFilters ? 'Filtritele vastavaid arvustusi ei leitud.' : 'Veel arvustusi pole.'}
            </p>
            {!hasActiveFilters && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ole esimene, kes arvustab!
              </button>
            )}
          </div>
        ) : (
          reviews.map(review => (
            <ReviewCard
              key={review.id}
              review={review}
              onVoteHelpful={handleVoteHelpful}
              onReport={(review) => console.log('Report review:', review)}
              onShare={(review) => console.log('Share review:', review)}
            />
          ))
        )}
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ReviewForm
              business={business}
              onSubmit={handleSubmitReview}
              onCancel={() => setShowReviewForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews; 