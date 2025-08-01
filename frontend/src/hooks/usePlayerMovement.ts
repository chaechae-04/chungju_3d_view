import { useState, useEffect, useCallback } from 'react';
import { gpsToMapCoordinates, updateUserCenter } from '../utils/locationUtils';

interface PlayerPosition {
  x: number;
  z: number;
}

interface UsePlayerMovementReturn {
  position: PlayerPosition;
  movePlayer: (dx: number, dz: number) => void;
  resetPosition: () => void;
}

export const usePlayerMovement = (initialLat?: number, initialLon?: number): UsePlayerMovementReturn => {
  const [position, setPosition] = useState<PlayerPosition>({ x: 0, z: 0 });

  // 초기 위치 설정 (GPS 좌표가 있으면 해당 위치로)
  useEffect(() => {
    if (initialLat && initialLon) {
      // 사용자 중심점 업데이트
      updateUserCenter(initialLat, initialLon);
      
      // GPS 좌표를 3D 좌표로 변환 (사용자 위치가 중심점이므로 0,0)
      const [x, z] = gpsToMapCoordinates(initialLat, initialLon);
      setPosition({ x, z });
    }
  }, [initialLat, initialLon]);

  const movePlayer = useCallback((dx: number, dz: number) => {
    setPosition(prev => ({
      x: prev.x + dx,
      z: prev.z + dz
    }));
  }, []);

  const resetPosition = useCallback(() => {
    setPosition({ x: 0, z: 0 });
  }, []);

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const moveSpeed = 0.5;
      
      switch (event.key.toLowerCase()) {
        case 'w':
          movePlayer(0, -moveSpeed);
          break;
        case 's':
          movePlayer(0, moveSpeed);
          break;
        case 'a':
          movePlayer(-moveSpeed, 0);
          break;
        case 'd':
          movePlayer(moveSpeed, 0);
          break;
        case 'r':
          resetPosition();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer, resetPosition]);

  return { position, movePlayer, resetPosition };
}; 