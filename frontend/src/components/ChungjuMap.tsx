import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface Shop {
  id: number;
  name: string;
  category: string;
  position: [number, number, number];
  description: string;
  rating: number;
}

const shops: Shop[] = [
  {
    id: 1,
    name: "충주 사과 농장",
    category: "농산물",
    position: [-3, 0, -2],
    description: "신선한 충주 사과를 직접 구매할 수 있는 농장입니다.",
    rating: 4.8
  },
  {
    id: 2,
    name: "충주 맛집",
    category: "음식점",
    position: [2, 0, -1],
    description: "충주의 대표 맛집으로 유명한 곳입니다.",
    rating: 4.5
  },
  {
    id: 3,
    name: "충주 전통시장",
    category: "시장",
    position: [0, 0, 3],
    description: "충주의 전통시장으로 다양한 상품을 구매할 수 있습니다.",
    rating: 4.2
  },
  {
    id: 4,
    name: "충주 카페",
    category: "카페",
    position: [-1, 0, 1],
    description: "충주의 아름다운 카페입니다.",
    rating: 4.6
  }
];

const ShopBuilding: React.FC<{ shop: Shop; onClick: (shop: Shop) => void }> = ({ shop, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
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
      default: return '#6b7280';
    }
  };

  return (
    <group position={shop.position}>
      {/* 건물 */}
      <Box
        ref={meshRef}
        args={[1, 2, 1]}
        onClick={() => onClick(shop)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? '#3b82f6' : getColorByCategory(shop.category)}
          transparent
          opacity={hovered ? 0.8 : 0.6}
        />
      </Box>
      
      {/* 상점 이름 */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {shop.name}
      </Text>
      
      {/* 평점 */}
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.2}
        color="#f59e0b"
        anchorX="center"
        anchorY="middle"
      >
        ⭐ {shop.rating}
      </Text>
    </group>
  );
};

const ChungjuMap: React.FC = () => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const handleShopClick = (shop: Shop) => {
    setSelectedShop(shop);
  };

  return (
    <group>
      {/* 지면 */}
      <Box args={[20, 0.1, 20]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#8b5cf6" />
      </Box>
      
      {/* 상점들 */}
      {shops.map((shop) => (
        <ShopBuilding 
          key={shop.id} 
          shop={shop} 
          onClick={handleShopClick}
        />
      ))}
      
      {/* 중심점 */}
      <Sphere args={[0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ef4444" />
      </Sphere>
      
      {/* 중심점 텍스트 */}
      <Text
        position={[0, 1, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        충주 중심
      </Text>
    </group>
  );
};

export default ChungjuMap; 