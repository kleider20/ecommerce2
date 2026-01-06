// resources/js/Components/2026/HomeLayout/Rating.jsx
import React from 'react';
import { Star } from 'lucide-react';

const Rating = ({ rating, reviews }) => {
  return (
    <div className="flex items-center gap-1 mb-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600 ml-1">({reviews})</span>
    </div>
  );
};

export default Rating;
