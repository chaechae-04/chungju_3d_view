import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 검색 기능 구현
    console.log('Searching for:', searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <div className="relative">
        <input
          type="text"
          placeholder="상점 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <button
        type="submit"
        className="btn-primary text-sm"
      >
        검색
      </button>
    </form>
  );
};

export default SearchBar; 