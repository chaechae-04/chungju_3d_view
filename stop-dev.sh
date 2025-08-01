#!/bin/bash

echo "🛑 충주 3D 상점 탐험 플랫폼 개발 서버 중지..."

# Docker가 실행 중인지 확인
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker가 실행되지 않았습니다."
    exit 1
fi

# 서비스 중지
echo "🔄 서비스 중지 중..."
docker-compose down

echo "✅ 모든 서비스가 중지되었습니다!"
echo ""
echo "🚀 서버 재시작:"
echo "   ./start-dev.sh"
echo "" 