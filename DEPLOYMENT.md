# 🚀 배포 가이드

## 📋 사전 준비

### 1. GitHub Repository 생성
```bash
# GitHub에서 새 저장소 생성
# Repository name: chungju-3d-platform
# Public 또는 Private 선택
```

### 2. 로컬에서 Git 초기화
```bash
git init
git add .
git commit -m "Initial commit: 충주 3D 상점 탐험 플랫폼"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/chungju-3d-platform.git
git push -u origin main
```

## 🌐 Vercel 배포 (Frontend)

### 1. Vercel 계정 생성
- [Vercel](https://vercel.com)에서 GitHub 계정으로 로그인

### 2. 프로젝트 연결
1. Vercel 대시보드에서 "New Project" 클릭
2. GitHub 저장소 선택: `chungju-3d-platform`
3. Framework Preset: `Vite`
4. Root Directory: `frontend`
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Install Command: `npm install`

### 3. 환경 변수 설정
```
VITE_API_URL=https://your-railway-app.railway.app
```

## 🚂 Railway 배포 (Backend)

### 1. Railway 계정 생성
- [Railway](https://railway.app)에서 GitHub 계정으로 로그인

### 2. 프로젝트 연결
1. Railway 대시보드에서 "New Project" 클릭
2. "Deploy from GitHub repo" 선택
3. GitHub 저장소 선택: `chungju-3d-platform`
4. Root Directory: `backend`

### 3. 환경 변수 설정
```
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=jdbc:mysql://your-mysql-url:3306/chungju_db
SPRING_DATASOURCE_USERNAME=your-username
SPRING_DATASOURCE_PASSWORD=your-password
```

### 4. MySQL 데이터베이스 추가
1. Railway 프로젝트에서 "New" 클릭
2. "Database" → "MySQL" 선택
3. 생성된 MySQL URL을 환경 변수에 설정

## 🔗 도메인 연결

### Vercel 도메인
- 기본 도메인: `your-app.vercel.app`
- 커스텀 도메인 설정 가능

### Railway 도메인
- 기본 도메인: `your-app.railway.app`
- 커스텀 도메인 설정 가능

## 🔄 자동 배포

### GitHub Actions 워크플로우
`.github/workflows/deploy.yml` 파일을 생성하여 자동 배포 설정:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./frontend

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        uses: railway/deploy@v1
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend
```

## 📊 모니터링

### Vercel Analytics
- 페이지뷰, 성능 모니터링
- 실시간 사용자 분석

### Railway Metrics
- CPU, 메모리 사용량
- 요청 수, 응답 시간

## 🔧 문제 해결

### 일반적인 문제들
1. **CORS 오류**: Railway 백엔드에서 CORS 설정 확인
2. **API 연결 실패**: 환경 변수 URL 확인
3. **빌드 실패**: 로그 확인 및 의존성 문제 해결

### 로그 확인
```bash
# Vercel 로그
vercel logs

# Railway 로그
railway logs
``` 