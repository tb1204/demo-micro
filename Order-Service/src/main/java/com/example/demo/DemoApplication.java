package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@SpringBootApplication
@RestController
// @CrossOrigin(origins = "http://localhost:5173")
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @GetMapping("/orders")
    public List<Map<String, Object>> getOrders() {
        return List.of(
                Map.of("id", 101, "product", "Bàn gỗ sồi", "status", "Đang xử lý"),
                Map.of("id", 102, "product", "Ghế làm việc", "status", "Đã giao"));
    }
}