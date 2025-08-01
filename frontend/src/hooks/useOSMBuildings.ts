import { useState } from 'react';
import { fetchChungjuBuildings } from '../api/openStreetMap';
import type { OSMBuilding } from '../api/openStreetMap';

interface UseOSMBuildingsReturn {
  buildings: OSMBuilding[];
  loading: boolean;
  error: string | null;
  loadBuildings: () => void;
  hasLoaded: boolean;
}

export const useOSMBuildings = (): UseOSMBuildingsReturn => {
  const [buildings, setBuildings] = useState<OSMBuilding[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadBuildings = async () => {
    if (hasLoaded) return; // 이미 로드된 경우 중복 로드 방지
    
    try {
      setLoading(true);
      setError(null);
      
      const buildingsData = await fetchChungjuBuildings();
      setBuildings(buildingsData);
      setHasLoaded(true);
    } catch (err) {
      setError('건물 데이터를 불러오는데 실패했습니다.');
      console.error('OSM 건물 데이터 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return { buildings, loading, error, loadBuildings, hasLoaded };
}; 