import React from 'react'
import { MapPin, Star, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function CompanyCard ({ company })  {
  const Navigation=useNavigate();
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          
<CompanyLogo logo={company?.logo} />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {company?.name}
            </h3>
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{company?.location},{company?.city}</span>
            </div>
            <StarRating rating={company?.avgRating??0} totalReviews={company?.reviewCount} />
          </div>
        </div>
        <div className="flex flex-col items-end space-y-3">
          <div className="text-sm text-gray-500">
            {company.foundedOn && `Founded on ${moment(company?.foundedOn).format('DD-MM-YYYY')}`}
            {company.regDate && `Reg. Date ${company.regDate}`}
          </div>
          <button onClick={()=>{
            Navigation(`/ratings/${company?._id}`)
          }} className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            Detail Review
          </button>
        </div>
      </div>
    </div>
  );
};

// Company Logo Component
const CompanyLogo = ({ logo }) => {
  return (
    <div 
      className={`w-20 h-20`}
      style={{border:'0.5px solid black',}}
    >
      <img src={logo} alt=' '/>
    </div>
  );
};


// Star Rating Component
const StarRating = ({ rating, totalReviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-lg font-semibold text-gray-800">{rating}</span>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
        {hasHalfStar && (
          <Star className="w-4 h-4 text-yellow-400 fill-current opacity-50" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
      {totalReviews && (
        <span className="text-sm text-gray-600">{totalReviews} Reviews</span>
      )}
    </div>
  );
};