import React, { useState } from 'react';

const RATING_DEFINITIONS = {
  1: {
    label: 'Kehv',
    description: 'Ei soovita kellegi teisele',
    emoji: '😞',
    color: '#ef4444'
  },
  2: {
    label: 'Alla keskmise',
    description: 'Palju parandamisruumi',
    emoji: '😐',
    color: '#f97316'
  },
  3: {
    label: 'Keskmine',
    description: 'Okei, aga võiks parem olla',
    emoji: '🙂',
    color: '#eab308'
  },
  4: {
    label: 'Hea',
    description: 'Soovitan, väikesed puudused',
    emoji: '😊',
    color: '#22c55e'
  },
  5: {
    label: 'Suurepärane',
    description: 'Täiuslik kogemus!',
    emoji: '🤩',
    color: '#16a34a'
  }
};

const StarRating = ({ 
  rating = 0, 
  onRatingChange, 
  size = 'medium', 
  readonly = false,
  showLabel = false,
  showDescription = false,
  className = ''
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
    xl: 'w-10 h-10'
  };

  const currentRating = hoverRating || rating;
  const definition = RATING_DEFINITIONS[currentRating];

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`${sizes[size]} transition-all duration-200 transform ${
              !readonly ? 'hover:scale-110' : ''
            } ${
              star <= currentRating
                ? 'text-yellow-400 drop-shadow-sm'
                : 'text-gray-300'
            }`}
            onClick={() => !readonly && onRatingChange && onRatingChange(star)}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            disabled={readonly}
          >
            <svg 
              className="w-full h-full fill-current" 
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </button>
        ))}
        
        {showLabel && definition && (
          <div className="ml-3 flex items-center space-x-2">
            <span className="text-lg">{definition.emoji}</span>
            <span className="font-medium" style={{ color: definition.color }}>
              {definition.label}
            </span>
          </div>
        )}
      </div>
      
      {showDescription && definition && (
        <p className="text-sm text-gray-600 mt-1">
          {definition.description}
        </p>
      )}
    </div>
  );
};

export default StarRating; 