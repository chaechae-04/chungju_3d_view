import React, { useRef, useState } from 'react';
import { Box, Text } from '@react-three/drei';
import * as THREE from 'three';
import { getBuildingCategory, estimateBuildingHeight, getBuildingColor } from '../api/openStreetMap';
import type { OSMBuilding } from '../api/openStreetMap';
import { gpsToMapCoordinates } from '../utils/locationUtils';

interface OSMBuildingsProps {
  buildings: OSMBuilding[];
  onBuildingClick?: (building: OSMBuilding) => void;
}

const OSMBuildingComponent: React.FC<{
  building: OSMBuilding;
  onClick?: (building: OSMBuilding) => void;
}> = ({ building, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // 성능 최적화: 회전 애니메이션 제거
  // useFrame(() => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.y += 0.005;
  //   }
  // });

  // GPS 좌표를 3D 지도 좌표로 변환
  const [x, z] = gpsToMapCoordinates(building.lat, building.lon);
  
  // 건물 높이 추정
  const height = estimateBuildingHeight(building);
  
  // 건물 카테고리와 색상
  const category = getBuildingCategory(building);
  const color = getBuildingColor(category);

  return (
    <group position={[x, height / 2, z]}>
      {/* 건물 */}
      <Box
        ref={meshRef}
        args={[0.8, height, 0.8]}
        onClick={() => onClick?.(building)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? '#3b82f6' : color}
          transparent
          opacity={hovered ? 0.8 : 0.6}
        />
      </Box>
      
      {/* 건물 이름 (있는 경우만) */}
      {building.name && (
        <Text
          position={[0, height + 0.3, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.5}
        >
          {building.name}
        </Text>
      )}
      
      {/* 건물 카테고리 */}
      <Text
        position={[0, height + 0.1, 0]}
        fontSize={0.15}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        {category}
      </Text>
    </group>
  );
};

const OSMBuildings: React.FC<OSMBuildingsProps> = ({ buildings, onBuildingClick }) => {
  return (
    <group>
      {buildings.map((building) => (
        <OSMBuildingComponent
          key={`${building.type}-${building.id}`}
          building={building}
          onClick={onBuildingClick}
        />
      ))}
    </group>
  );
};

export default OSMBuildings; 