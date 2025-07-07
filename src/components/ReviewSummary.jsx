import React from 'react';
import StarRating from './StarRating';
import { TrendingUp, Clock, Camera, ThumbsUp } from 'lucide-react';

const ReviewSummary = ({ 
  businessId, 
  averageRating = 0, 
  totalReviews = 0, 
  ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  recommendationRate = 0,
  avgResponseTime = 0,
  photosCount = 0,
  recentTrend = 0
}) => {

  const getRatingPercentage = (rating) => {
    if (totalReviews === 0) return 0;
    return (ratingDistribution[rating] / totalReviews) * 100;
  };

  const getRatingColor = (rating) => {
    const colors = {
      5: 'bg-green-500',
      4: 'bg-green-400',
      3: 'bg-yellow-400',
      2: 'bg-orange-400',
      1: 'bg-red-500'
    };
    return colors[rating] || 'bg-gray-300';
  };

  const getOverallRatingText = (rating) => {
    if (rating >= 4.5) return { text: 'Suurepärane', color: 'text-green-600' };
    if (rating >= 4.0) return { text: 'Väga hea', color: 'text-green-600' };
    if (rating >= 3.5) return { text: 'Hea', color: 'text-blue-600' };
    if (rating >= 3.0) return { text: 'Keskmine', color: 'text-yellow-600' };
    if (rating >= 2.0) return { text: 'Alla keskmise', color: 'text-orange-600' };
    return { text: 'Kehv', color: 'text-red-600' };
  };

  const getTrendIndicator = (trend) => {
    if (trend > 0.1) return { icon: '📈', text: 'Tõusev trend', color: 'text-green-600' };
    if (trend < -0.1) return { icon: '📉', text: 'Langev trend', color: 'text-red-600' };
    return { icon: '➖', text: 'Stabiilne', color: 'text-gray-600' };
  };

  const overallRating = getOverallRatingText(averageRating);
  const trendInfo = getTrendIndicator(recentTrend);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Overall Rating */}
        <div className="text-center lg:border-r lg:border-gray-200 lg:pr-8">
          <div className="mb-4">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <StarRating rating={Math.round(averageRating)} readonly size="large" />
            <p className={`text-lg font-medium mt-2 ${overallRating.color}`}>
              {overallRating.text}
            </p>
            <p className="text-gray-600 mt-1">
              {totalReviews} arvustust
            </p>
          </div>
          
          {/* Trend */}
          {recentTrend !== 0 && (
            <div className={`flex items-center justify-center space-x-2 text-sm ${trendInfo.color}`}>
              <span>{trendInfo.icon}</span>
              <span>{trendInfo.text}</span>
            </div>
          )}
        </div>
        
        {/* Rating Distribution */}
        <div className="lg:px-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hinnangute jaotus</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm font-medium text-gray-700">{rating}</span>
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${getRatingColor(rating)}`}
                    style={{ width: `${getRatingPercentage(rating)}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">
                  {ratingDistribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="lg:pl-8 lg:border-l lg:border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistika</h3>
          <div className="space-y-4">
            
            {/* Recommendation Rate */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ThumbsUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {recommendationRate}%
                </div>
                <p className="text-sm text-gray-600">soovitab</p>
              </div>
            </div>
            
            {/* Response Time */}
            {avgResponseTime > 0 && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {avgResponseTime}h
                  </div>
                  <p className="text-sm text-gray-600">vastamiskiirus</p>
                </div>
              </div>
            )}
            
            {/* Photos Count */}
            {photosCount > 0 && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Camera className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {photosCount}
                  </div>
                  <p className="text-sm text-gray-600">fotot</p>
                </div>
              </div>
            )}
            
            {/* Recent Reviews */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>Viimased 30 päeva:</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {Math.round(totalReviews * 0.15)} uut arvustust
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Stats Bar */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {(averageRating * 20).toFixed(0)}%
            </div>
            <p className="text-sm text-gray-600">rahulolu</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(totalReviews / 12)}
            </div>
            <p className="text-sm text-gray-600">arvustust kuus</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {((ratingDistribution[4] + ratingDistribution[5]) / totalReviews * 100).toFixed(0)}%
            </div>
            <p className="text-sm text-gray-600">4+ tähte</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {(photosCount / Math.max(totalReviews, 1)).toFixed(1)}
            </div>
            <p className="text-sm text-gray-600">fotot/arvustus</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary; 