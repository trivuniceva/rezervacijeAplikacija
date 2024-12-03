package backend.controller;

import backend.dto.NotificationRequest;
import backend.model.Notification;
import backend.service.AccommodationService;
import backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:4200")
public class NotificationController {

    @Autowired
    private AccommodationService accommodationService;

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<Notification> getNotifications(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return notificationService.getNotificationsByUserId(userId);
        }
        return notificationService.getAllNotifications();
    }

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.createNotification(notification);
    }

    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }

    @PostMapping("/approve")
    public ResponseEntity<Map<String, String>> approveApartment(@RequestBody NotificationRequest notification) {
        System.out.println("Notification: " + notification);

        accommodationService.approveApartment(notification);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Apartment approved successfully!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reject")
    public ResponseEntity<Map<String, String>> rejectApartment(@RequestBody NotificationRequest notification) {
        System.out.println("Notification: " + notification);

        accommodationService.approveApartment(notification);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Apartment rejected successfully!");
        return ResponseEntity.ok(response);
    }


}

