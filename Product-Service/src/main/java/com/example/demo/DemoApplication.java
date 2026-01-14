package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@SpringBootApplication
@RestController
// @CrossOrigin(origins = "http://localhost:5173") // Cho phép React truy cập
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@GetMapping("/products")
	public List<Map<String, Object>> getProducts() {
		return List.of(
				Map.of("id", 1, "name", "Bàn gỗ sồi", "price", 1500, "image",
						"https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=200"),
				Map.of("id", 2, "name", "Ghế làm việc", "price", 800, "image",
						"https://images.unsplash.com/photo-1505843490701-5be5d2b01cc1?w=200"));
	}
}