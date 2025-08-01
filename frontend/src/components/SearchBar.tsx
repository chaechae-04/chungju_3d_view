import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  onCategoryFilter: (category: string) => void;
  selectedCategory: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onCategoryFilter, selectedCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: '전체', icon: '🏪' },
    { id: '농산물', name: '농산물', icon: '🍎' },
    { id: '음식점', name: '음식점', icon: '🍽️' },
    { id: '시장', name: '시장', icon: '🛒' },
    { id: '카페', name: '카페', icon: '☕' },
    { id: '관광', name: '관광', icon: '🏛️' },
    { id: '공예', name: '공예', icon: '🎨' }
  ];

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* 검색 입력 */}
      <div className="relative">
        <input
          type="text"
          placeholder="상점 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-64 px-4 py-2 pl-10 pr-12 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1.5 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          검색
        </button>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">카테고리:</span>
        <div className="flex space-x-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryFilter(category.id)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 