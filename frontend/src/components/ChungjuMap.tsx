import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { gpsToMapCoordinates, isInChungjuArea } from '../utils/locationUtils';

interface Shop {
  id: number;
  name: string;
  category: string;
  position: [number, number, number];
  latitude: number;
  longitude: number;
  description: string;
  rating: number;
  address: string;
  phone: string;
  hours: string;
  image?: string;
}

interface ShopBuildingProps {
  shop: Shop;
  onClick: (shop: Shop) => void;
  isFiltered: boolean;
}

const ShopBuilding: React.FC<ShopBuildingProps> = ({ shop, onClick, isFiltered }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const getColorByCategory = (category: string) => {
    switch (category) {
      case '농산물': return '#4ade80';
      case '음식점': return '#f87171';
      case '시장': return '#fbbf24';
      case '카페': return '#a78bfa';
      case '관광': return '#60a5fa';
      case '공예': return '#f472b6';
      default: return '#6b7280';
    }
  };

  const getBuildingHeight = (category: string) => {
    switch (category) {
      case '농산물': return 1.5;
      case '음식점': return 2.2;
      case '시장': return 2.8;
      case '카페': return 1.8;
      case '관광': return 2.5;
      case '공예': return 1.6;
      default: return 2;
    }
  };

  // 필터링된 상점은 투명도와 색상을 조정
  const getOpacity = () => {
    if (isFiltered) return 0.3; // 필터링된 상점은 흐리게
    if (hovered) return 0.8;
    return 0.6;
  };

  const getTextColor = () => {
    return isFiltered ? '#666666' : '#000000';
  };

  const getRatingColor = () => {
    return isFiltered ? '#d1d5db' : '#f59e0b';
  };

  return (
    <group position={shop.position}>
      {/* 건물 */}
      <Box
        ref={meshRef}
        args={[1, getBuildingHeight(shop.category), 1]}
        onClick={() => onClick(shop)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? '#3b82f6' : getColorByCategory(shop.category)}
          transparent
          opacity={getOpacity()}
        />
      </Box>
      
      {/* 상점 이름 */}
      <Text
        position={[0, getBuildingHeight(shop.category) + 0.3, 0]}
        fontSize={0.25}
        color={getTextColor()}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {shop.name}
      </Text>
      
      {/* 평점 */}
      <Text
        position={[0, getBuildingHeight(shop.category) + 0.1, 0]}
        fontSize={0.2}
        color={getRatingColor()}
        anchorX="center"
        anchorY="middle"
      >
        ⭐ {shop.rating}
      </Text>
    </group>
  );
};

interface ChungjuMapProps {
  shops: Shop[];
  onShopSelect: (shop: Shop) => void;
  selectedCategory: string;
  userLocation?: {
    latitude: number;
    longitude: number;
  } | null;
}

const ChungjuMap: React.FC<ChungjuMapProps> = ({ 
  shops, 
  onShopSelect, 
  selectedCategory, 
  userLocation
}) => {
  const handleShopClick = (shop: Shop) => {
    onShopSelect(shop);
  };

  // 사용자 위치가 충주 지역 내에 있는지 확인
  const isUserInChungju = userLocation && isInChungjuArea(userLocation.latitude, userLocation.longitude);

  return (
    <group>
      {/* 실제 충주 지도 기반 지면 */}
      <Box args={[20, 0.1, 20]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#8b5cf6" />
      </Box>
      
      {/* 상점들 */}
      {shops.map((shop) => {
        const isFiltered = selectedCategory !== 'all' && shop.category !== selectedCategory;
        return (
          <ShopBuilding 
            key={shop.id} 
            shop={shop} 
            onClick={handleShopClick}
            isFiltered={isFiltered}
          />
        );
      })}
      
      {/* 사용자 위치 표시 */}
      {userLocation && isUserInChungju && (
        <group>
          {/* 사용자 위치 구체 */}
          {(() => {
            const [x, z] = gpsToMapCoordinates(userLocation.latitude, userLocation.longitude);
            return (
              <>
                <Sphere args={[0.3]} position={[x, 0.5, z]}>
                  <meshStandardMaterial color="#3b82f6" />
                </Sphere>
                
                {/* 사용자 위치 텍스트 */}
                <Text
                  position={[x, 1.2, z]}
                  fontSize={0.3}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                >
                  내 위치
                </Text>
              </>
            );
          })()}
        </group>
      )}
      
      {/* 사용자 위치가 없을 때 안내 메시지 */}
      {!userLocation && (
        <Text
          position={[0, 2, 0]}
          fontSize={0.5}
          color="#f59e0b"
          anchorX="center"
          anchorY="middle"
        >
          위치 정보를 허용해주세요
        </Text>
      )}
      
      {/* 사용자가 충주 지역 밖에 있을 때 안내 메시지 */}
      {userLocation && !isUserInChungju && (
        <Text
          position={[0, 2, 0]}
          fontSize={0.5}
          color="#f59e0b"
          anchorX="center"
          anchorY="middle"
        >
          충주 지역으로 이동해주세요
        </Text>
      )}
    </group>
  );
};

export default ChungjuMap; 