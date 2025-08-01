import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

interface PlayerLocationProps {
  position: { x: number; z: number };
  userLocation?: {
    latitude: number;
    longitude: number;
  } | null;
}

const PlayerLocation: React.FC<PlayerLocationProps> = ({ position, userLocation }) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  // 펄스 애니메이션
  useFrame((state) => {
    if (pulseRef.current) {
      const time = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(time * 3) * 0.3;
      pulseRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[position.x, 0.5, position.z]}>
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
      >
        내 위치
      </Text>
      
      {/* GPS 정보 (있는 경우) */}
      {userLocation && (
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.2}
          color="#10b981"
          anchorX="center"
          anchorY="middle"
        >
          GPS: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
        </Text>
      )}
      
      {/* 조작 안내 */}
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.15}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        WASD로 이동, R로 리셋
      </Text>
    </group>
  );
};

export default PlayerLocation; 