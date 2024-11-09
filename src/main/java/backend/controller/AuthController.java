package backend.controller;

import backend.model.User;
import backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginUser) {
        System.out.println(" srce moje lepooo!!! ");

        User user = authService.login(loginUser.getEmail(), loginUser.getPassword());
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public String logout(@RequestParam String sessionId) {
        // TODO: napravi user session
        return "Logout successful!";
    }
}


