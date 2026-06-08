package com.cariq.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Value("${groq.api.key}")
    private String apiKey;

    @PostMapping
    public ResponseEntity<?> chat(@RequestBody Map<String, String> request) {
        try {
            String userMessage = request.get("message");
            if (userMessage == null || userMessage.trim().isEmpty()) {
                return ResponseEntity.ok(Map.of("reply", "Please enter a message"));
            }

            String url = "https://api.groq.com/openai/v1/chat/completions";

            RestTemplate restTemplate = new RestTemplate();

            // System message
            Map<String, String> systemMessage = new HashMap<>();
            systemMessage.put("role", "system");
            systemMessage.put("content", "You are CarIQ AI, an expert car advisor for Indian car buyers. " +
                    "Help users choose the best cars based on budget, needs and preferences. " +
                    "You know everything about Indian cars — prices in INR, specs, mileage, EMI, " +
                    "resale value, EV vs petrol comparison. Keep answers concise and helpful. " +
                    "Always recommend specific cars with prices in Indian Rupees.");

            // User message
            Map<String, String> userMsg = new HashMap<>();
            userMsg.put("role", "user");
            userMsg.put("content", userMessage);

            // Request body
            Map<String, Object> body = new HashMap<>();
            body.put("model", "llama-3.3-70b-versatile");
            body.put("messages", List.of(systemMessage, userMsg));
            body.put("max_tokens", 500);
            body.put("temperature", 0.7);

            // Headers with Bearer token
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

            Map responseBody = response.getBody();
            List choices = (List) responseBody.get("choices");
            Map choice = (Map) choices.get(0);
            Map message = (Map) choice.get("message");
            String text = (String) message.get("content");

            return ResponseEntity.ok(Map.of("reply", text));

        } catch (Exception e) {
            System.out.println("Chat Error: " + e.getMessage());
            return ResponseEntity.ok(Map.of("reply", "Error: " + e.getMessage()));
        }
    }
}