package com.chungju.backend.service;

import com.chungju.backend.dto.ShopResponseDto;
import com.chungju.backend.entity.Shop;
import com.chungju.backend.repository.ShopRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShopService {
    
    private final ShopRepository shopRepository;
    
    // 생성자 주입
    public ShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }
    
    // 모든 상점 조회
    public List<ShopResponseDto> getAllShops() {
        return shopRepository.findAll().stream()
                .map(ShopResponseDto::from)
                .collect(Collectors.toList());
    }
    
    // ID로 상점 조회
    public ShopResponseDto getShopById(Long id) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("상점을 찾을 수 없습니다: " + id));
        return ShopResponseDto.from(shop);
    }
    
    // 카테고리별 상점 조회
    public List<ShopResponseDto> getShopsByCategory(String category) {
        return shopRepository.findByCategory(category).stream()
                .map(ShopResponseDto::from)
                .collect(Collectors.toList());
    }
    
    // 상점 검색
    public List<ShopResponseDto> searchShops(String query) {
        return shopRepository.searchByNameOrDescription(query).stream()
                .map(ShopResponseDto::from)
                .collect(Collectors.toList());
    }
    
    // 평점순으로 상점 조회
    public List<ShopResponseDto> getShopsByRating() {
        return shopRepository.findAllByOrderByRatingDesc().stream()
                .map(ShopResponseDto::from)
                .collect(Collectors.toList());
    }
} 