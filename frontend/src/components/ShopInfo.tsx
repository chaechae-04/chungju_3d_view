import React, { useState } from 'react';

interface Shop {
  id: number;
  name: string;
  category: string;
  position: [number, number, number];
  description: string;
  rating: number;
}

const ShopInfo: React.FC = () => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // 임시 데이터
  const mockShop: Shop = {
    id: 1,
    name: "충주 사과 농장",
    category: "농산물",
    position: [-3, 0, -2],
    description: "신선한 충주 사과를 직접 구매할 수 있는 농장입니다. 30년 전통의 사과 농장으로, 친환경 농법으로 재배된 최고급 사과를 만나보세요.",
    rating: 4.8
  };

  const handleShopSelect = (shop: Shop) => {
    setSelectedShop(shop);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setSelectedShop(null);
  };

  return (
    <>
      {/* 상점 정보 패널 */}
      {isOpen && selectedShop && (
        <div className="fixed top-20 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
          <div className="p-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">{selectedShop.name}</h2>
              <button
                onClick={closePanel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 카테고리 */}
            <div className="mb-4">
              <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded">
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
            </div>
          </div>
        </div>
      )}

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