package menadzerisanjeuser.menadzerisanjeuser.controller;

import menadzerisanjeuser.menadzerisanjeuser.model.RegisterRequest;
import menadzerisanjeuser.menadzerisanjeuser.model.SuccessResponse;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import menadzerisanjeuser.menadzerisanjeuser.service.AuthService;
import menadzerisanjeuser.menadzerisanjeuser.service.UserSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserSessionService userSessionService;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginUser) {
        User user = authService.login(loginUser.getEmail(), loginUser.getPassword());

        String sessionId = java.util.UUID.randomUUID().toString();
        userSessionService.loginUser(loginUser.getEmail(), sessionId);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public String logout(@RequestParam String sessionId) {
        userSessionService.logoutUser(sessionId);
        return "Logout successful!";
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


