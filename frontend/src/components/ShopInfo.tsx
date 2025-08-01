import React from 'react';

interface Shop {
  id: number;
  name: string;
  category: string;
  position: [number, number, number];
  description: string;
  rating: number;
  address: string;
  phone: string;
  hours: string;
  image?: string;
}

interface ShopInfoProps {
  selectedShop: Shop | null;
  isOpen: boolean;
  onClose: () => void;
}

const ShopInfo: React.FC<ShopInfoProps> = ({ selectedShop, isOpen, onClose }) => {
  if (!isOpen || !selectedShop) {
    return null;
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '농산물': return 'bg-green-100 text-green-800';
      case '음식점': return 'bg-red-100 text-red-800';
      case '시장': return 'bg-yellow-100 text-yellow-800';
      case '카페': return 'bg-purple-100 text-purple-800';
      case '관광': return 'bg-blue-100 text-blue-800';
      case '공예': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* 상점 정보 패널 */}
      <div className="fixed top-20 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-20 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">{selectedShop.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 카테고리 */}
          <div className="mb-4">
            <span className={`inline-block ${getCategoryColor(selectedShop.category)} text-xs font-medium px-2.5 py-0.5 rounded`}>
              {selectedShop.category}
            </span>
          </div>

          {/* 평점 */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(selectedShop.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">{selectedShop.rating}/5.0</span>
          </div>

          {/* 설명 */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">상점 소개</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {selectedShop.description}
            </p>
          </div>

          {/* 상점 정보 */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-600">{selectedShop.address}</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm text-gray-600">{selectedShop.phone}</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-600">{selectedShop.hours}</span>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="space-y-3">
            <button className="w-full btn-primary">
              📍 길찾기
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
              📞 전화하기
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
              💬 리뷰 보기
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
              📅 예약하기
            </button>
          </div>
        </div>
      </div>

      {/* 미니맵 */}
      <div className="fixed bottom-4 right-4 w-48 h-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-700 mb-2">충주 지도</h3>
          <div className="w-full h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
            <span className="text-xs text-gray-500">3D 지도</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopInfo; 