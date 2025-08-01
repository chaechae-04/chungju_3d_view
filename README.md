# 충주 3D 상점 탐험 플랫폼

## 🎯 프로젝트 개요
충주 지역 상점들을 3D 환경에서 탐험할 수 있는 웹 플랫폼입니다.

## 🛠 기술 스택
### Frontend
- React 18 + TypeScript
- Vite
- Three.js + React Three Fiber
- Mapbox GL JS
- Tailwind CSS

### Backend
- Spring Boot 3.x
- Spring Data JPA
- MySQL 8.0
- Spring Security

### Infrastructure
- Docker & Docker Compose
- MySQL Database

## 📁 프로젝트 구조
```
├── frontend/          # React + Vite + Three.js
├── backend/           # Spring Boot
├── docker-compose.yml # Docker Compose 설정
├── start-dev.sh       # 개발 서버 시작 스크립트
├── stop-dev.sh        # 개발 서버 중지 스크립트
└── README.md
```

## 🚀 빠른 시작

### 사전 요구사항
- Docker Desktop 설치
- Docker Compose 설치

### 개발 서버 실행
```bash
# 프로젝트 루트에서 실행
./start-dev.sh
```

### 개발 서버 중지
```bash
# 프로젝트 루트에서 실행
./stop-dev.sh
```

## 🌐 접속 정보
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080
- **Database**: localhost:3306

## 📝 로그 확인
```bash
# 전체 로그
docker-compose logs -f

# 특정 서비스 로그
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f db
```

## 🎨 주요 기능
1. 3D 충주 시내 지도
2. 상점 정보 표시
3. 실시간 상점 검색
4. 상점 상세 정보 팝업
5. 사용자 리뷰 시스템

## 🔧 수동 실행 (Docker 없이)

### Frontend 실행
```bash
cd frontend
npm install
npm run dev
```

### Backend 실행
```bash
cd backend
./gradlew bootRun
```

## 📝 개발 일정
- [x] 프로젝트 구조 설정
- [x] Docker 환경 구성
- [x] 3D 지도 구현
- [ ] 상점 데이터 모델링
- [ ] API 개발
- [ ] UI/UX 구현
- [ ] 배포 