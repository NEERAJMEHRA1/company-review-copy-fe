import React, { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";

const SearchFilter = ({ onSearch, onAddCompany, sortBy, onSortChange }) => {
  const [city, setCity] = useState("");

  return (
    <div className=" rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-6">
        <div className="flex items-center space-x-4 flex-wrap gap-4">
          {/* City Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                // value={city}
                onChange={onSearch}
                className="w-80 pl-4 pr-10 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 mt-6">
            <button
              // onClick={onSearch}
              style={{
                background:
                  "linear-gradient(172deg,rgba(166, 8, 233, 1) 16%, rgba(50, 32, 208, 0.88) 100%)",
              }}
              className=" text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Find Company
            </button>
            <button
              onClick={onAddCompany}
              style={{
                background:
                  "linear-gradient(172deg,rgba(166, 8, 233, 1) 16%, rgba(50, 32, 208, 0.88) 100%)",
              }}
              className=" text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              + Add Company
            </button>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Sort:
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={onSortChange}
              className="appearance-none bg-white border text-black border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="name" className="text-black">Name</option>
              <option value="rating" className="text-black">Rating</option>
              <option value="reviews" className="text-black">Reviews</option>
              <option value="date" className="text-black">Date</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;

export const ResultsHeader = ({ resultCount }) => {
  return (
    <div className="mb-6">
      <p className="text-gray-600">Result Found: {resultCount}</p>
    </div>
  );
};
