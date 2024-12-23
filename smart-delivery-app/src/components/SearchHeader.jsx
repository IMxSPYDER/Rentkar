import React from 'react';
import profile from '../assets/profile.jpg'

const SearchHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-md">
      {/* Left side: Search Box */}
      <div className="flex-1 max-w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Right side: Profile Image */}
      <div className="ml-4 flex items-center">
        <img
          src={profile}  // Replace with the actual image URL
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default SearchHeader;
