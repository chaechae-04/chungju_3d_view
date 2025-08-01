package com.chungju.backend.repository;

import com.chungju.backend.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {
    
    // 카테고리별 상점 조회
    List<Shop> findByCategory(String category);
    
    // 이름으로 검색
    List<Shop> findByNameContainingIgnoreCase(String name);
    
    // 설명으로 검색
    List<Shop> findByDescriptionContainingIgnoreCase(String description);
    
    // 이름 또는 설명으로 검색
    @Query("SELECT s FROM Shop s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(s.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Shop> searchByNameOrDescription(@Param("query") String query);
    
    // 평점순으로 정렬
    List<Shop> findAllByOrderByRatingDesc();
    
    // 카테고리별 평점순 정렬
    List<Shop> findByCategoryOrderByRatingDesc(String category);
} 