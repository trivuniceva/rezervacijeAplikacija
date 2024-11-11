package menadzerisanjeuser.menadzerisanjeuser.controller;

import jakarta.servlet.http.HttpServletRequest;
import menadzerisanjeuser.menadzerisanjeuser.model.RegisterRequest;
import menadzerisanjeuser.menadzerisanjeuser.model.SuccessResponse;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import menadzerisanjeuser.menadzerisanjeuser.model.UserSession;
import menadzerisanjeuser.menadzerisanjeuser.service.AuthService;
import menadzerisanjeuser.menadzerisanjeuser.service.SessionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private SessionService sessionService;


    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginUser, HttpServletRequest request) {
        User user = authService.login(loginUser.getEmail(), loginUser.getPassword());
        if (user != null) {
            String sessionId = request.getSession().getId();
            String ipAddress = request.getRemoteAddr();
            sessionService.saveSession(user.getId(), sessionId, ipAddress);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).body(null); // Unauthorized if login fails

    }


    @PostMapping("/logout")
    public String logout(@RequestParam String sessionId) {
        Optional<UserSession> userSessionOptional = sessionService.getSessionBySessionId(sessionId);
        if (userSessionOptional.isPresent()) {
            Long userId = userSessionOptional.get().getUserId();
            sessionService.invalidateSession(userId, sessionId); // Pass userId and sessionId
            return "Logout successful!";
        } else {
            return "Session not found!";
        }

    }


    @PostMapping("/register")
    public ResponseEntity<?> signup(@RequestBody RegisterRequest registerRequest) {
        System.out.println("Registration request received: " + registerRequest.getEmail());
        System.out.println("rola: " + registerRequest.getRole());

        System.out.println(" - - - - - - - ");
        System.out.println(registerRequest.toString());

        authService.signup(registerRequest);

        return ResponseEntity.ok(new SuccessResponse("Registration successful!"));
    }
}


