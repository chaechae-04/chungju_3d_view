import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';
import { gpsToMapCoordinates, calculateDistance, formatDistance } from '../utils/locationUtils';

interface UserLocationProps {
  userLatitude: number;
  userLongitude: number;
  shopLatitude: number;
  shopLongitude: number;
  shopName: string;
}

const UserLocation: React.FC<UserLocationProps> = ({
  userLatitude,
  userLongitude,
  shopLatitude,
  shopLongitude,
  shopName,
}) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  // GPS 좌표를 3D 지도 좌표로 변환
  const [x, z] = gpsToMapCoordinates(userLatitude, userLongitude);
  
  // 상점까지의 거리 계산
  const distance = calculateDistance(userLatitude, userLongitude, shopLatitude, shopLongitude);
  const distanceText = formatDistance(distance);

  // 펄스 애니메이션
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.02;
    }
    
    if (pulseRef.current) {
      const time = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(time * 3) * 0.3;
      pulseRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[x, 0.5, z]}>
      {/* 사용자 위치 표시 (파란색 구체) */}
      <Sphere ref={sphereRef} args={[0.3]}>
        <meshStandardMaterial color="#3b82f6" />
      </Sphere>
      
      {/* 펄스 효과 */}
      <Sphere ref={pulseRef} args={[0.4]}>
        <meshStandardMaterial 
          color="#60a5fa" 
          transparent 
          opacity={0.3}
        />
      </Sphere>
      
      {/* "내 위치" 텍스트 */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/NotoSansKR-Regular.otf"
      >
        내 위치
      </Text>
      
      {/* 거리 정보 */}
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.2}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
        font="/fonts/NotoSansKR-Regular.otf"
      >
        {shopName}까지 {distanceText}
      </Text>
    </group>
  );
};

export default UserLocation; 