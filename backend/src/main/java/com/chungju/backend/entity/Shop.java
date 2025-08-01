package com.chungju.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "shops")
public class Shop {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String category;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false)
    private Double latitude;
    
    @Column(nullable = false)
    private Double longitude;
    
    @Column(nullable = false)
    private String address;
    
    @Column(nullable = false)
    private String phone;
    
    @Column(nullable = false)
    private String hours;
    
    @Column(nullable = false)
    private Double rating;
    
    @Column
    private String image;
    
    // 기본 생성자
    public Shop() {}
    
    // 전체 생성자
    public Shop(Long id, String name, String category, String description, Double latitude, Double longitude, String address, String phone, String hours, Double rating, String image) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.phone = phone;
        this.hours = hours;
        this.rating = rating;
        this.image = image;
    }
    
    // Getter 메서드들
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public Double getLatitude() { return latitude; }
    public Double getLongitude() { return longitude; }
    public String getAddress() { return address; }
    public String getPhone() { return phone; }
    public String getHours() { return hours; }
    public Double getRating() { return rating; }
    public String getImage() { return image; }
    
    // Setter 메서드들
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setCategory(String category) { this.category = category; }
    public void setDescription(String description) { this.description = description; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public void setAddress(String address) { this.address = address; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setHours(String hours) { this.hours = hours; }
    public void setRating(Double rating) { this.rating = rating; }
    public void setImage(String image) { this.image = image; }
    
    // 3D 위치 정보를 위한 메서드
    public double[] getPosition() {
        return new double[]{
            latitude * 10, // 3D 좌표로 변환
            0.0,
            longitude * 10
        };
    }
} 