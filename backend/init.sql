-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS chungju_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE chungju_db;

-- 기존 테이블 삭제 (있다면)
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS shops;

-- 상점 테이블 생성
CREATE TABLE shops (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    address VARCHAR(500) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    hours VARCHAR(100) NOT NULL,
    rating DOUBLE NOT NULL,
    image VARCHAR(500)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 사용자 테이블 생성
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 리뷰 테이블 생성
CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    shop_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 샘플 상점 데이터 삽입
INSERT INTO shops (name, category, description, latitude, longitude, address, phone, hours, rating, image) VALUES
('충주 사과 농장', '농산물', '신선한 충주 사과를 직접 구매할 수 있는 농장입니다. 30년 전통의 사과 농장으로, 친환경 농법으로 재배된 최고급 사과를 만나보세요.', -0.3, -0.2, '충청북도 충주시 사과로 123', '043-123-4567', '09:00 - 18:00', 4.8, NULL),
('충주 맛집', '음식점', '충주의 대표 맛집으로 유명한 곳입니다. 전통 한식과 현대적 감각이 조화를 이룬 독특한 맛을 경험해보세요.', 0.2, -0.1, '충청북도 충주시 맛집로 456', '043-234-5678', '11:00 - 22:00', 4.5, NULL),
('충주 전통시장', '시장', '충주의 전통시장으로 다양한 상품을 구매할 수 있습니다. 신선한 농산물부터 전통 공예품까지 모든 것을 만나보세요.', 0.0, 0.3, '충청북도 충주시 시장로 789', '043-345-6789', '06:00 - 20:00', 4.2, NULL),
('충주 카페', '카페', '충주의 아름다운 카페입니다. 로컬 원두로 내린 커피와 수제 케이크를 즐겨보세요.', -0.1, 0.1, '충청북도 충주시 카페로 321', '043-456-7890', '08:00 - 21:00', 4.6, NULL),
('충주 한옥마을', '관광', '전통 한옥이 잘 보존된 마을입니다. 전통 문화를 체험하고 아름다운 풍경을 감상할 수 있습니다.', 0.3, 0.2, '충청북도 충주시 한옥로 654', '043-567-8901', '10:00 - 17:00', 4.7, NULL),
('충주 도자기 공방', '공예', '전통 도자기 제작을 체험할 수 있는 공방입니다. 직접 도자기를 만들어보세요.', -0.2, 0.3, '충청북도 충주시 도자기로 987', '043-678-9012', '10:00 - 18:00', 4.4, NULL);

-- 샘플 사용자 데이터 삽입
INSERT INTO users (username, email, password) VALUES
('testuser1', 'user1@example.com', 'password123'),
('testuser2', 'user2@example.com', 'password456');

-- 샘플 리뷰 데이터 삽입
INSERT INTO reviews (shop_id, user_id, rating, comment) VALUES
(1, 1, 5, '정말 신선한 사과였어요!'),
(1, 2, 4, '맛있지만 조금 비싸요'),
(2, 1, 5, '맛집입니다!'),
(3, 2, 4, '전통시장 느낌이 좋아요'),
(4, 1, 5, '커피가 정말 맛있어요'),
(5, 2, 4, '한옥마을이 아름다워요'),
(6, 1, 4, '도자기 체험이 재미있었어요'); 