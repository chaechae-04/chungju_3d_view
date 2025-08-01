-- 충주 데이터베이스 초기화 스크립트

-- 데이터베이스 생성 (이미 존재하는 경우 무시)
CREATE DATABASE IF NOT EXISTS chungju_db;
USE chungju_db;

-- 상점 테이블 생성
CREATE TABLE IF NOT EXISTS shops (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    address VARCHAR(500),
    phone VARCHAR(20),
    rating DECIMAL(3, 2) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 샘플 데이터 삽입
INSERT INTO shops (name, category, description, latitude, longitude, address, phone, rating) VALUES
('충주 사과 농장', '농산물', '신선한 충주 사과를 직접 구매할 수 있는 농장입니다.', 36.9701, 127.9322, '충청북도 충주시', '043-123-4567', 4.8),
('충주 맛집', '음식점', '충주의 대표 맛집으로 유명한 곳입니다.', 36.9705, 127.9325, '충청북도 충주시', '043-234-5678', 4.5),
('충주 전통시장', '시장', '충주의 전통시장으로 다양한 상품을 구매할 수 있습니다.', 36.9708, 127.9328, '충청북도 충주시', '043-345-6789', 4.2),
('충주 카페', '카페', '충주의 아름다운 카페입니다.', 36.9711, 127.9331, '충청북도 충주시', '043-456-7890', 4.6);

-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 리뷰 테이블 생성
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    shop_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shop_id) REFERENCES shops(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
); 