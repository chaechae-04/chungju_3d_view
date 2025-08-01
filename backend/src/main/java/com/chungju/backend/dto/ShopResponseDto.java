package com.chungju.backend.dto;

import com.chungju.backend.entity.Shop;

public class ShopResponseDto {
    
    private Long id;
    private String name;
    private String category;
    private String description;
    private double[] position;
    private Double rating;
    private String address;
    private String phone;
    private String hours;
    private String image;
    
    // 기본 생성자
    public ShopResponseDto() {}
    
    // 전체 생성자
    public ShopResponseDto(Long id, String name, String category, String description, double[] position, Double rating, String address, String phone, String hours, String image) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.position = position;
        this.rating = rating;
        this.address = address;
        this.phone = phone;
        this.hours = hours;
        this.image = image;
    }
    
    // Getter 메서드들
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public double[] getPosition() { return position; }
    public Double getRating() { return rating; }
    public String getAddress() { return address; }
    public String getPhone() { return phone; }
    public String getHours() { return hours; }
    public String getImage() { return image; }
    
    // Setter 메서드들
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setCategory(String category) { this.category = category; }
    public void setDescription(String description) { this.description = description; }
    public void setPosition(double[] position) { this.position = position; }
    public void setRating(Double rating) { this.rating = rating; }
    public void setAddress(String address) { this.address = address; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setHours(String hours) { this.hours = hours; }
    public void setImage(String image) { this.image = image; }
    
    // Shop 엔티티를 DTO로 변환
    public static ShopResponseDto from(Shop shop) {
        ShopResponseDto dto = new ShopResponseDto();
        dto.setId(shop.getId());
        dto.setName(shop.getName());
        dto.setCategory(shop.getCategory());
        dto.setDescription(shop.getDescription());
        dto.setPosition(shop.getPosition());
        dto.setRating(shop.getRating());
        dto.setAddress(shop.getAddress());
        dto.setPhone(shop.getPhone());
        dto.setHours(shop.getHours());
        dto.setImage(shop.getImage());
        return dto;
    }
} 