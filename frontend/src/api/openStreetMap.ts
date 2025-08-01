// OpenStreetMap API 관련 타입 정의
export interface OSMNode {
  id: number;
  lat: number;
  lon: number;
  tags?: Record<string, string>;
}

export interface OSMWay {
  id: number;
  nodes: number[];
  tags?: Record<string, string>;
}

export interface OSMRelation {
  id: number;
  members: Array<{
    type: 'node' | 'way' | 'relation';
    ref: number;
    role: string;
  }>;
  tags?: Record<string, string>;
}

export interface OSMBuilding {
  id: number;
  type: 'node' | 'way' | 'relation';
  lat: number;
  lon: number;
  name?: string;
  building?: string;
  height?: number;
  levels?: number;
  amenity?: string;
  shop?: string;
  tourism?: string;
  tags: Record<string, string>;
}

// 충주시 경계 (Overpass API 쿼리용)
const CHUNGJU_BOUNDS = {
  south: 36.8,
  north: 37.1,
  west: 127.7,
  east: 128.1,
};

// Overpass API 엔드포인트
const OVERPASS_API = 'https://overpass-api.de/api/interpreter';

/**
 * Overpass QL 쿼리를 실행하여 건물 데이터를 가져옵니다
 */
export const fetchChungjuBuildings = async (): Promise<OSMBuilding[]> => {
  try {
    // 충주시 주요 건물들만 가져오는 최적화된 쿼리
    const query = `
      [out:json][timeout:15];
      (
        // 주요 상업시설들만 (이름이 있는 것들 우선)
        way["shop"]["name"](${CHUNGJU_BOUNDS.south},${CHUNGJU_BOUNDS.west},${CHUNGJU_BOUNDS.north},${CHUNGJU_BOUNDS.east});
        node["shop"]["name"](${CHUNGJU_BOUNDS.south},${CHUNGJU_BOUNDS.west},${CHUNGJU_BOUNDS.north},${CHUNGJU_BOUNDS.east});
        
        // 주요 음식점들
        way["amenity"="restaurant"]["name"](${CHUNGJU_BOUNDS.south},${CHUNGJU_BOUNDS.west},${CHUNGJU_BOUNDS.north},${CHUNGJU_BOUNDS.east});
        node["amenity"="restaurant"]["name"](${CHUNGJU_BOUNDS.south},${CHUNGJU_BOUNDS.west},${CHUNGJU_BOUNDS.north},${CHUNGJU_BOUNDS.east});
        
        // 주요 카페들
        way["amenity"="cafe"]["name"](${CHUNGJU_BOUNDS.south},${CHUNGJU_BOUNDS.west},${CHUNGJU_BOUNDS.north},${CHUNGJU_BOUNDS.east});
        node["amenity"="cafe"]["name"](${CHUNGJU_BOUNDS.south},${CHUNGJU_BOUNDS.west},${CHUNGJU_BOUNDS.north},${CHUNGJU_BOUNDS.east});
        
        // 주요 관광지들
        way["tourism"]["name"](${CHUNGJU_BOUNDS.south},${CHUNGJU_BOUNDS.west},${CHUNGJU_BOUNDS.north},${CHUNGJU_BOUNDS.east});
        node["tourism"]["name"](${CHUNGJU_BOUNDS.south},${CHUNGJU_BOUNDS.west},${CHUNGJU_BOUNDS.north},${CHUNGJU_BOUNDS.east});
        
        // 주요 건물들 (이름이 있는 것들만)
        way["building"]["name"](${CHUNGJU_BOUNDS.south},${CHUNGJU_BOUNDS.west},${CHUNGJU_BOUNDS.north},${CHUNGJU_BOUNDS.east});
        node["building"]["name"](${CHUNGJU_BOUNDS.south},${CHUNGJU_BOUNDS.west},${CHUNGJU_BOUNDS.north},${CHUNGJU_BOUNDS.east});
      );
      out body;
      >;
      out skel qt;
    `;

    const response = await fetch(OVERPASS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return parseOSMData(data);
  } catch (error) {
    console.error('OpenStreetMap 데이터를 가져오는데 실패했습니다:', error);
    return [];
  }
};

interface OSMElement {
  id: number;
  type: 'node' | 'way' | 'relation';
  lat?: number;
  lon?: number;
  nodes?: number[];
  tags?: Record<string, string>;
}

/**
 * OSM 데이터를 파싱하여 건물 정보로 변환합니다
 */
const parseOSMData = (data: { elements: OSMElement[] }): OSMBuilding[] => {
  const buildings: OSMBuilding[] = [];
  const nodes = new Map<number, { lat: number; lon: number }>();

  // 노드 정보 수집
  data.elements.forEach((element: OSMElement) => {
    if (element.type === 'node' && element.lat && element.lon) {
      nodes.set(element.id, { lat: element.lat, lon: element.lon });
    }
  });

  // 건물 정보 추출 (최대 100개로 제한)
  let count = 0;
  const MAX_BUILDINGS = 100;
  
  for (const element of data.elements) {
    if (count >= MAX_BUILDINGS) break;
    
    if (element.tags) {
      const building = parseBuildingElement(element, nodes);
      if (building) {
        buildings.push(building);
        count++;
      }
    }
  }

  return buildings;
};

/**
 * OSM 요소를 건물 정보로 파싱합니다
 */
const parseBuildingElement = (
  element: OSMElement,
  nodes: Map<number, { lat: number; lon: number }>
): OSMBuilding | null => {
  const tags = element.tags || {};
  
  // 건물, 상점, 음식점, 카페, 관광지 중 하나라도 있으면 포함
  const isRelevant = tags.building || tags.shop || tags.amenity || tags.tourism;
  
  if (!isRelevant) return null;

  let lat = 0, lon = 0;

  if (element.type === 'node' && element.lat && element.lon) {
    lat = element.lat;
    lon = element.lon;
  } else if (element.type === 'way' && element.nodes && element.nodes.length > 0) {
    // way의 중심점 계산
    const wayNodes = element.nodes
      .map((nodeId: number) => nodes.get(nodeId))
      .filter((node): node is { lat: number; lon: number } => node !== undefined);
    
    if (wayNodes.length > 0) {
      const center = wayNodes.reduce(
        (acc: { lat: number; lon: number }, node: { lat: number; lon: number }) => 
          ({ lat: acc.lat + node.lat, lon: acc.lon + node.lon }),
        { lat: 0, lon: 0 }
      );
      lat = center.lat / wayNodes.length;
      lon = center.lon / wayNodes.length;
    }
  }

  return {
    id: element.id,
    type: element.type,
    lat,
    lon,
    name: tags.name,
    building: tags.building,
    height: tags.height ? parseFloat(tags.height) : undefined,
    levels: tags.levels ? parseInt(tags.levels) : undefined,
    amenity: tags.amenity,
    shop: tags.shop,
    tourism: tags.tourism,
    tags,
  };
};

/**
 * 건물 타입을 카테고리로 변환합니다
 */
export const getBuildingCategory = (building: OSMBuilding): string => {
  if (building.shop) return '상점';
  if (building.amenity === 'restaurant') return '음식점';
  if (building.amenity === 'cafe') return '카페';
  if (building.tourism) return '관광';
  if (building.building) return '건물';
  return '기타';
};

/**
 * 건물 높이를 추정합니다
 */
export const estimateBuildingHeight = (building: OSMBuilding): number => {
  if (building.height) return building.height;
  if (building.levels) return building.levels * 3; // 층당 3m 추정
  return 2; // 기본 높이
};

/**
 * 건물 색상을 카테고리별로 반환합니다
 */
export const getBuildingColor = (category: string): string => {
  switch (category) {
    case '상점': return '#fbbf24';
    case '음식점': return '#f87171';
    case '카페': return '#a78bfa';
    case '관광': return '#60a5fa';
    case '건물': return '#6b7280';
    default: return '#9ca3af';
  }
}; 