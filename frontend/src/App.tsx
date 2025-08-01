import React, { useState, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ChungjuMap from './components/ChungjuMap';
import ShopInfo from './components/ShopInfo';
import SearchBar from './components/SearchBar';
import OSMBuildings from './components/OSMBuildings';
import PlayerLocation from './components/PlayerLocation';
import { fetchShops, searchShops } from './api/shops';
import type { Shop } from './api/shops';
import { useLocation } from './hooks/useLocation';
import { useOSMBuildings } from './hooks/useOSMBuildings';
import { usePlayerMovement } from './hooks/usePlayerMovement';
import { updateUserCenter } from './utils/locationUtils';
import './App.css';

function App() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isShopInfoOpen, setIsShopInfoOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // GPS 위치 정보
  const { location, error: locationError, loading: locationLoading, requestLocation } = useLocation();
  
  // OSM 건물 데이터 (지연 로딩)
  const { buildings: osmBuildings, loading: osmLoading, error: osmError, loadBuildings, hasLoaded } = useOSMBuildings();
  
  // 플레이어 이동 시스템
  const { position: playerPosition } = usePlayerMovement(
    location?.latitude,
    location?.longitude
  );

  // 초기 상점 데이터 로드
  useEffect(() => {
    const loadShops = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const shopsData = await fetchShops();
        setShops(shopsData);
      } catch (err) {
        setError('상점 데이터를 불러오는데 실패했습니다.');
        console.error('상점 데이터 로드 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    loadShops();
  }, []);
  
  // OSM 건물 데이터 지연 로딩 (사용자가 상점 데이터 로드 완료 후)
  useEffect(() => {
    if (!loading && !hasLoaded) {
      // 상점 데이터 로드 완료 후 2초 뒤에 OSM 데이터 로드
      const timer = setTimeout(() => {
        loadBuildings();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [loading, hasLoaded, loadBuildings]);

  // GPS 위치 변경 시 중심점 업데이트
  useEffect(() => {
    if (location) {
      updateUserCenter(location.latitude, location.longitude);
    }
  }, [location]);

  // 검색 기능
  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      try {
        const searchResults = await searchShops(term);
        setShops(searchResults);
      } catch (err) {
        console.error('검색 실패:', err);
      }
    } else {
      // 검색어가 비어있으면 전체 상점 다시 로드
      try {
        const allShops = await fetchShops();
        setShops(allShops);
      } catch (err) {
        console.error('전체 상점 로드 실패:', err);
      }
    }
  };

  // 필터링된 상점 목록
  const filteredShops = useMemo(() => {
    if (selectedCategory === 'all') {
      return shops;
    }
    return shops.filter(shop => shop.category === selectedCategory);
  }, [shops, selectedCategory]);

  const handleShopSelect = (shop: Shop) => {
    setSelectedShop(shop);
    setIsShopInfoOpen(true);
  };

  const handleCloseShopInfo = () => {
    setIsShopInfoOpen(false);
    setSelectedShop(null);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">상점 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              🏪 충주 3D 상점 탐험
            </h1>
            <SearchBar 
              onSearch={handleSearch}
              onCategoryFilter={handleCategoryFilter}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </header>

      {/* 검색 결과 표시 */}
      {searchTerm && (
        <div className="absolute top-20 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-3">
          <p className="text-sm text-gray-600">
            "{searchTerm}" 검색 결과: <span className="font-semibold">{filteredShops.length}개</span>
          </p>
        </div>
      )}

      {/* 위치 정보 표시 */}
      <div className="absolute top-20 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-3">
        {locationLoading ? (
          <p className="text-sm text-gray-600">📍 위치 확인 중...</p>
        ) : locationError ? (
          <div className="text-sm">
            <p className="text-red-600 mb-2">📍 {locationError}</p>
            <button 
              onClick={requestLocation}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              다시 시도
            </button>
          </div>
        ) : location ? (
          <div className="text-sm text-gray-600">
            <p>📍 내 위치: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</p>
            <p className="text-xs text-gray-500">정확도: ±{Math.round(location.accuracy)}m</p>
          </div>
        ) : (
          <p className="text-sm text-gray-600">📍 위치 정보 없음</p>
        )}
      </div>

      {/* OSM 건물 로딩 상태 표시 */}
      {osmLoading && (
        <div className="absolute top-32 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-3">
          <p className="text-sm text-gray-600">🏗️ 건물 데이터 로딩 중...</p>
        </div>
      )}
      
      {osmError && (
        <div className="absolute top-32 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-3">
          <p className="text-sm text-red-600">🏗️ {osmError}</p>
        </div>
      )}

      {/* 조작 안내 */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-3">
        <div className="text-sm text-gray-600">
          <p className="font-semibold mb-1">🎮 조작법</p>
          <p>WASD: 이동</p>
          <p>R: 위치 리셋</p>
          <p>마우스: 카메라 회전</p>
          <p>휠: 줌</p>
        </div>
      </div>

      {/* 3D Scene */}
      <div className="h-full w-full">
        <Canvas
          camera={{ position: [0, 5, 10], fov: 75 }}
          className="h-full w-full"
        >
          <Environment preset="sunset" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <ChungjuMap 
            shops={filteredShops}
            onShopSelect={handleShopSelect}
            selectedCategory={selectedCategory}
            userLocation={location}
          />
          <OSMBuildings 
            buildings={osmBuildings}
            onBuildingClick={(building) => {
              console.log('OSM 건물 클릭:', building);
            }}
          />
          <PlayerLocation 
            position={playerPosition}
            userLocation={location}
          />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Shop Info Panel */}
      <ShopInfo 
        selectedShop={selectedShop}
        isOpen={isShopInfoOpen}
        onClose={handleCloseShopInfo}
      />
    </div>
  );
}

export default App;
