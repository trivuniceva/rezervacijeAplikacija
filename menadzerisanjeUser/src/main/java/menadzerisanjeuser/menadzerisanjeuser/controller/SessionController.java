package menadzerisanjeuser.menadzerisanjeuser.controller;

import menadzerisanjeuser.menadzerisanjeuser.model.UserSession;
import menadzerisanjeuser.menadzerisanjeuser.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    // Pronađi aktivne sesije za korisnika
    @GetMapping("/active/{userId}")
    public List<UserSession> getActiveSessions(@PathVariable Long userId) {
        return sessionService.getActiveSessionsByUserId(userId);
    }

    // Invalidiraj sesiju korisnika
    @PostMapping("/invalidate")
    public void invalidateSession(@RequestParam Long userId, @RequestParam String sessionId) {
        sessionService.invalidateSession(userId, sessionId);
    }
}

