#!/bin/bash

echo "🚀 충주 3D 상점 탐험 플랫폼 개발 서버 시작..."

# Docker가 실행 중인지 확인
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker가 실행되지 않았습니다. Docker를 먼저 실행해주세요."
    exit 1
fi

# 기존 컨테이너 정리
echo "🧹 기존 컨테이너 정리 중..."
docker-compose down

# 이미지 빌드
echo "🔨 Docker 이미지 빌드 중..."
docker-compose build

# 서비스 시작
echo "🌟 서비스 시작 중..."
docker-compose up -d

# 서비스 상태 확인
echo "📊 서비스 상태 확인 중..."
sleep 5

echo ""
echo "✅ 모든 서비스가 시작되었습니다!"
echo ""
echo "🌐 접속 정보:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:8080"
echo "   Database: localhost:3306"
echo ""
echo "📝 로그 확인:"
echo "   docker-compose logs -f frontend"
echo "   docker-compose logs -f backend"
echo "   docker-compose logs -f db"
echo ""
echo "🛑 서버 중지:"
echo "   ./stop-dev.sh"
echo "" 