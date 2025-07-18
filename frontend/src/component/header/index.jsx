import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const Navigate=useNavigate()
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2" onClick={()=>{
          Navigate("/")
        }}>
          <div className="w-10 h-10  rounded-full flex items-center justify-center" style={{background:" linear-gradient(90deg, #D946EF 0%, #3B82F6 100%)"}}>
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <span className="text-xl  text-gray-800">
            Review<span className="text-purple-600">&</span><span className='font-bold'>RATE</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className='flex'>
            <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className=" pl-4 pr-12 py-2 border border-gray-300 rounded-md !w-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-purple-600">
              <Search className="w-5 h-5 text-purple-600 font-medium" />
            </button>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-purple-600 font-medium">
            SignUp
          </button>
          <button className="text-gray-700 hover:text-purple-600 font-medium">
            Login
          </button>
        </div>
        </div>
      </div>
    </header>
  );
}