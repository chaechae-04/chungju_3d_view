export interface Shop {
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

const API_BASE_URL = 'http://backend:8080/api';

// 모든 상점 목록 가져오기
export const fetchShops = async (): Promise<Shop[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/shops`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('상점 목록을 가져오는데 실패했습니다:', error);
    // 에러 시 기본 데이터 반환
    return getDefaultShops();
  }
};

// 카테고리별 상점 목록 가져오기
export const fetchShopsByCategory = async (category: string): Promise<Shop[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/shops/category/${category}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('카테고리별 상점을 가져오는데 실패했습니다:', error);
    return [];
  }
};

// 상점 검색
export const searchShops = async (query: string): Promise<Shop[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/shops/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('상점 검색에 실패했습니다:', error);
    return [];
  }
};

// 특정 상점 상세 정보 가져오기
export const fetchShopById = async (id: number): Promise<Shop | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/shops/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('상점 상세 정보를 가져오는데 실패했습니다:', error);
    return null;
  }
};

// 기본 상점 데이터 (API 실패 시 사용)
const getDefaultShops = (): Shop[] => [
  {
    id: 1,
    name: "충주 사과 농장",
    category: "농산물",
    position: [-3, 0, -2],
    latitude: 36.9912,
    longitude: 127.9260,
    description: "신선한 충주 사과를 직접 구매할 수 있는 농장입니다. 30년 전통의 사과 농장으로, 친환경 농법으로 재배된 최고급 사과를 만나보세요.",
    rating: 4.8,
    address: "충청북도 충주시 사과로 123",
    phone: "043-123-4567",
    hours: "09:00 - 18:00"
  },
  {
    id: 2,
    name: "충주 맛집",
    category: "음식점",
    position: [2, 0, -1],
    latitude: 36.9912,
    longitude: 127.9260,
    description: "충주의 대표 맛집으로 유명한 곳입니다. 전통 한식과 현대적 감각이 조화를 이룬 독특한 맛을 경험해보세요.",
    rating: 4.5,
    address: "충청북도 충주시 맛집로 456",
    phone: "043-234-5678",
    hours: "11:00 - 22:00"
  },
  {
    id: 3,
    name: "충주 전통시장",
    category: "시장",
    position: [0, 0, 3],
    latitude: 36.9912,
    longitude: 127.9260,
    description: "충주의 전통시장으로 다양한 상품을 구매할 수 있습니다. 신선한 농산물부터 전통 공예품까지 모든 것을 만나보세요.",
    rating: 4.2,
    address: "충청북도 충주시 시장로 789",
    phone: "043-345-6789",
    hours: "06:00 - 20:00"
  },
  {
    id: 4,
    name: "충주 카페",
    category: "카페",
    position: [-1, 0, 1],
    latitude: 36.9912,
    longitude: 127.9260,
    description: "충주의 아름다운 카페입니다. 로컬 원두로 내린 커피와 수제 케이크를 즐겨보세요.",
    rating: 4.6,
    address: "충청북도 충주시 카페로 321",
    phone: "043-456-7890",
    hours: "08:00 - 21:00"
  },
  {
    id: 5,
    name: "충주 한옥마을",
    category: "관광",
    position: [3, 0, 2],
    latitude: 36.9912,
    longitude: 127.9260,
    description: "전통 한옥이 잘 보존된 마을입니다. 전통 문화를 체험하고 아름다운 풍경을 감상할 수 있습니다.",
    rating: 4.7,
    address: "충청북도 충주시 한옥로 654",
    phone: "043-567-8901",
    hours: "10:00 - 17:00"
  },
  {
    id: 6,
    name: "충주 도자기 공방",
    category: "공예",
    position: [-2, 0, 3],
    latitude: 36.9912,
    longitude: 127.9260,
    description: "전통 도자기 제작을 체험할 수 있는 공방입니다. 직접 도자기를 만들어보세요.",
    rating: 4.4,
    address: "충청북도 충주시 도자기로 987",
    phone: "043-678-9012",
    hours: "10:00 - 18:00"
  }
]; 