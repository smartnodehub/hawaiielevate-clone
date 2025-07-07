import React, { useState } from 'react';
import StarRating from './StarRating';
import { ThumbsUp, ThumbsDown, Share2, Flag, MoreHorizontal, Calendar, CheckCircle } from 'lucide-react';

const ReviewCard = ({ review, onVoteHelpful, onReport, onShare }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState(review.helpful_count || 0);
  const [userVote, setUserVote] = useState(null); // 'helpful' | 'not_helpful' | null

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('et-EE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatVisitDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('et-EE', {
      year: 'numeric',
      month: 'short'
    });
  };

  const handleHelpfulVote = async (isHelpful) => {
    try {
      const newVote = userVote === (isHelpful ? 'helpful' : 'not_helpful') ? null : (isHelpful ? 'helpful' : 'not_helpful');
      
      // Update local state optimistically
      if (userVote === 'helpful' && newVote !== 'helpful') {
        setHelpfulVotes(prev => prev - 1);
      } else if (userVote !== 'helpful' && newVote === 'helpful') {
        setHelpfulVotes(prev => prev + 1);
      }
      
      setUserVote(newVote);
      
      // Call parent handler
      if (onVoteHelpful) {
        await onVoteHelpful(review.id, isHelpful, newVote !== null);
      }
    } catch (error) {
      console.error('Error voting on review:', error);
      // Revert optimistic update
      setUserVote(userVote);
      setHelpfulVotes(review.helpful_count || 0);
    }
  };

  const getUserAvatar = (user) => {
    if (user.avatar_url) {
      return (
        <img
          src={user.avatar_url}
          alt={user.full_name}
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    }
    
    const initials = user.full_name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
        {initials}
      </div>
    );
  };

  const getServiceTypeLabel = (serviceType) => {
    const labels = {
      'dine_in': 'Kohapeal söömine',
      'takeaway': 'Kaasa võtmine',
      'delivery': 'Kojutoominen',
      'overnight': 'Ööbimine',
      'event': 'Üritus',
      'meeting': 'Koosolek',
      'service_visit': 'Teenuse kasutamine',
      'consultation': 'Konsultatsioon',
      'purchase': 'Ostmine'
    };
    return labels[serviceType] || serviceType;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getUserAvatar(review.user)}
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-900">{review.user.full_name}</h4>
              {review.user.is_verified && (
                <CheckCircle className="h-4 w-4 text-blue-500" title="Verifitseeritud kasutaja" />
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <StarRating rating={review.rating} readonly size="small" />
              <span>•</span>
              <time>{formatDate(review.created_at)}</time>
              {review.visit_date && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Külastas {formatVisitDate(review.visit_date)}</span>
                  </div>
                </>
              )}
              {review.service_type && (
                <>
                  <span>•</span>
                  <span>{getServiceTypeLabel(review.service_type)}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Menu */}
        <div className="relative">
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="mb-4">
        <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
        <div className={`text-gray-700 leading-relaxed ${!showFullContent && review.content.length > 300 ? 'line-clamp-3' : ''}`}>
          {review.content}
        </div>
        {review.content.length > 300 && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-blue-600 text-sm mt-2 hover:underline font-medium"
          >
            {showFullContent ? 'Näita vähem' : 'Loe edasi'}
          </button>
        )}
      </div>
      
      {/* Category Ratings */}
      {review.category_ratings && Object.keys(review.category_ratings).length > 0 && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h6 className="text-sm font-medium text-gray-900 mb-3">Detailsed hinnangud</h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(review.category_ratings).map(([criterion, rating]) => (
              <div key={criterion} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 capitalize">
                  {criterion.replace('_', ' ')}
                </span>
                <StarRating rating={rating} readonly size="small" />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="mb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {review.photos.slice(0, showPhotos ? review.photos.length : 3).map((photo, index) => (
              <img
                key={index}
                src={photo.url}
                alt={photo.caption || `Review photo ${index + 1}`}
                className="h-20 w-20 rounded-lg object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {/* TODO: Open photo modal */}}
              />
            ))}
            {review.photos.length > 3 && !showPhotos && (
              <button
                onClick={() => setShowPhotos(true)}
                className="h-20 w-20 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-200 transition-colors flex-shrink-0"
              >
                +{review.photos.length - 3}
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleHelpfulVote(true)}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              userVote === 'helpful' 
                ? 'text-blue-600 font-medium' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <ThumbsUp className={`h-4 w-4 ${userVote === 'helpful' ? 'fill-current' : ''}`} />
            <span>Kasulik ({helpfulVotes})</span>
          </button>
          
          <button
            onClick={() => handleHelpfulVote(false)}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              userVote === 'not_helpful' 
                ? 'text-red-600 font-medium' 
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            <ThumbsDown className={`h-4 w-4 ${userVote === 'not_helpful' ? 'fill-current' : ''}`} />
            <span>Ei ole kasulik</span>
          </button>
          
          <button
            onClick={() => onShare && onShare(review)}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            <span>Jaga</span>
          </button>
          
          <button
            onClick={() => onReport && onReport(review)}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <Flag className="h-4 w-4" />
            <span>Raporteeri</span>
          </button>
        </div>
        
        {review.recommended && (
          <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
            <CheckCircle className="h-4 w-4" />
            <span>Soovitab</span>
          </div>
        )}
      </div>
      
      {/* Business Reply */}
      {review.business_reply && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">B</span>
            </div>
            <span className="font-medium text-blue-900">Yritykse vastus</span>
            <span className="text-sm text-blue-700">
              {formatDate(review.business_reply.created_at)}
            </span>
          </div>
          <p className="text-blue-900 text-sm leading-relaxed">
            {review.business_reply.content}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewCard; 