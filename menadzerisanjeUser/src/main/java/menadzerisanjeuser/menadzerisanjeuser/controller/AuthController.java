package menadzerisanjeuser.menadzerisanjeuser.controller;

import menadzerisanjeuser.menadzerisanjeuser.dto.ApiResponse;
import menadzerisanjeuser.menadzerisanjeuser.model.RegisterRequest;
import menadzerisanjeuser.menadzerisanjeuser.model.SuccessResponse;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import menadzerisanjeuser.menadzerisanjeuser.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
        User user = authService.login(loginUser.getEmail(), loginUser.getPassword());
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public String logout(@RequestParam String sessionId) {
        // TODO: napravi user session
        return "Logout successful!";
    }

    @PostMapping("/register")
    public ResponseEntity<?> signup(@RequestBody RegisterRequest registerRequest) {
        String message = authService.signup(registerRequest);
        return ResponseEntity.ok(new ApiResponse(message));
    }

    @GetMapping(value = "/verify", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> verify(@RequestParam("token") String token) {
        System.out.println("veriffff <<<<<<<<<<<<<<<<<<<");
        String message;
        boolean success = false;
        try {
            message = authService.verifyToken(token);
            success = true;
        } catch (RuntimeException e) {
            message = e.getMessage();
        }

        String redirectUrl = success
                ? "http://localhost:4200/login?verification_status=success&message=" + message
                : "http://localhost:4200/login?verification_status=error&message=" + message;

        String htmlResponse = String.format("""
            <!DOCTYPE html>
            <html>
            <head>
                <title>Account Verification</title>
                <meta http-equiv="refresh" content="0; url=%s" />
            </head>
            <body>
                <p>Verifying account... If you are not redirected automatically, <a href="%s">click here</a>.</p>
            </body>
            </html>
            """, redirectUrl, redirectUrl);

        return ResponseEntity.ok(htmlResponse);
    }

}


