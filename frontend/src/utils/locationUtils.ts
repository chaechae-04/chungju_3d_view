// 충주시 중심 좌표 (충주시청 기준)
export const CHUNGJU_CENTER = {
  latitude: 36.9912,
  longitude: 127.9260,
};

// 충주시 경계 (대략적인 범위)
export const CHUNGJU_BOUNDS = {
  north: 37.1, // 북쪽 경계
  south: 36.8, // 남쪽 경계
  east: 128.1,  // 동쪽 경계
  west: 127.7,  // 서쪽 경계
};

// 3D 지도에서 사용할 좌표 범위 (사용자 위치 기준)
export const MAP_BOUNDS = {
  x: [-10, 10], // X축 범위
  z: [-10, 10], // Z축 범위
};

// 사용자 중심 좌표 (동적으로 업데이트)
export let USER_CENTER = {
  latitude: CHUNGJU_CENTER.latitude,
  longitude: CHUNGJU_CENTER.longitude,
};

// 사용자 중심점 업데이트 함수
export const updateUserCenter = (lat: number, lon: number) => {
  USER_CENTER = { latitude: lat, longitude: lon };
};

/**
 * GPS 좌표를 3D 지도 좌표로 변환 (사용자 위치 기준)
 */
export const gpsToMapCoordinates = (
  latitude: number,
  longitude: number
): [number, number] => {
  // 사용자 중심을 기준으로 상대적 위치 계산
  const latDiff = latitude - USER_CENTER.latitude;
  const lonDiff = longitude - USER_CENTER.longitude;

  // 경도 차이를 X축으로, 위도 차이를 Z축으로 매핑
  // 충주시 전체 범위를 3D 지도 범위로 스케일링
  const x = (lonDiff / (CHUNGJU_BOUNDS.east - CHUNGJU_BOUNDS.west)) * 
            (MAP_BOUNDS.x[1] - MAP_BOUNDS.x[0]) + MAP_BOUNDS.x[0];
  const z = -(latDiff / (CHUNGJU_BOUNDS.north - CHUNGJU_BOUNDS.south)) * 
             (MAP_BOUNDS.z[1] - MAP_BOUNDS.z[0]) + MAP_BOUNDS.z[0];

  return [x, z];
};

/**
 * 3D 지도 좌표를 GPS 좌표로 변환
 */
export const mapToGpsCoordinates = (
  x: number,
  z: number
): [number, number] => {
  // X축을 경도로, Z축을 위도로 역변환
  const lonDiff = (x - MAP_BOUNDS.x[0]) / (MAP_BOUNDS.x[1] - MAP_BOUNDS.x[0]) * 
                  (CHUNGJU_BOUNDS.east - CHUNGJU_BOUNDS.west);
  const latDiff = -(z - MAP_BOUNDS.z[0]) / (MAP_BOUNDS.z[1] - MAP_BOUNDS.z[0]) * 
                   (CHUNGJU_BOUNDS.north - CHUNGJU_BOUNDS.south);

  const longitude = CHUNGJU_CENTER.longitude + lonDiff;
  const latitude = CHUNGJU_CENTER.latitude + latDiff;

  return [latitude, longitude];
};

/**
 * 두 GPS 좌표 간의 거리 계산 (미터 단위)
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371e3; // 지구 반지름 (미터)
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * 거리를 사람이 읽기 쉬운 형태로 변환
 */
export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  } else {
    return `${(meters / 1000).toFixed(1)}km`;
  }
};

/**
 * 현재 위치가 충주시 범위 내에 있는지 확인
 */
export const isInChungjuArea = (
  latitude: number,
  longitude: number
): boolean => {
  return (
    latitude >= CHUNGJU_BOUNDS.south &&
    latitude <= CHUNGJU_BOUNDS.north &&
    longitude >= CHUNGJU_BOUNDS.west &&
    longitude <= CHUNGJU_BOUNDS.east
  );
}; 