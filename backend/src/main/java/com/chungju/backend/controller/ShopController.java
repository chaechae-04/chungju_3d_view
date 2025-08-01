package com.chungju.backend.controller;

import com.chungju.backend.dto.ShopResponseDto;
import com.chungju.backend.service.ShopService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shops")
@CrossOrigin(origins = "http://localhost:5173")
public class ShopController {
    
    private final ShopService shopService;
    
    // 생성자 주입
    public ShopController(ShopService shopService) {
        this.shopService = shopService;
    }
    
    // 모든 상점 조회
    @GetMapping
    public ResponseEntity<List<ShopResponseDto>> getAllShops() {
        List<ShopResponseDto> shops = shopService.getAllShops();
        return ResponseEntity.ok(shops);
    }
    
    // ID로 상점 조회
    @GetMapping("/{id}")
    public ResponseEntity<ShopResponseDto> getShopById(@PathVariable Long id) {
        ShopResponseDto shop = shopService.getShopById(id);
        return ResponseEntity.ok(shop);
    }
    
    // 카테고리별 상점 조회
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ShopResponseDto>> getShopsByCategory(@PathVariable String category) {
        List<ShopResponseDto> shops = shopService.getShopsByCategory(category);
        return ResponseEntity.ok(shops);
    }
    
    // 상점 검색
    @GetMapping("/search")
    public ResponseEntity<List<ShopResponseDto>> searchShops(@RequestParam String q) {
        List<ShopResponseDto> shops = shopService.searchShops(q);
        return ResponseEntity.ok(shops);
    }
    
    // 평점순으로 상점 조회
    @GetMapping("/top-rated")
    public ResponseEntity<List<ShopResponseDto>> getTopRatedShops() {
        List<ShopResponseDto> shops = shopService.getShopsByRating();
        return ResponseEntity.ok(shops);
    }
} 