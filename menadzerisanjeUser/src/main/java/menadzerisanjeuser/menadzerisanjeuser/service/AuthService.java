package menadzerisanjeuser.menadzerisanjeuser.service;

import menadzerisanjeuser.menadzerisanjeuser.model.*;
import menadzerisanjeuser.menadzerisanjeuser.repository.UserRepository;
import menadzerisanjeuser.menadzerisanjeuser.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    public User login(String email, String password) {
        System.out.println("email: " + email);
        System.out.println("password: " + password);

        User user = userService.getUserByEmail(email);
        if (user != null && userService.validPassword(user, password)) {
            if (!userService.isDeleted(user) && user.getActive()) {
                System.out.println("dobar korisnik: " + user.getProfilePic());
                return user;
            }
        }
        return null;
    }

    public String signup(RegisterRequest registerRequest) {

        if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        if (userRepository.findByEmail(registerRequest.getEmail()) != null) {
            throw new RuntimeException("Email already in use");
        }

        User newUser = new User();
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(registerRequest.getPassword());
        newUser.setFirstname(registerRequest.getFirstname());
        newUser.setLastname(registerRequest.getLastname());
        newUser.setProfilePic("/pics/slika2.jpg");
        newUser.setAddress(registerRequest.getAddress());
        newUser.setPhone(registerRequest.getPhone());
        newUser.setUserRole(registerRequest.getRole());

        newUser.setVerified(false);

        userRepository.save(newUser);

        VerificationToken token = new VerificationToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUser(newUser);
        token.setExpiryDate(LocalDateTime.now().plusHours(24));
        token.setUsed(false);

        tokenRepository.save(token);

        String verificationLink = "http://localhost:8080/api/auth/verify?token=" + token.getToken();

        emailService.sendEmail(newUser.getEmail(), "Verify your account",
                "Click the link to activate your account: " + verificationLink);


        return "Registration successful, please check your email to verify your account.";
    }

    public String verifyToken(String tokenStr) {
        VerificationToken token = tokenRepository.findByToken(tokenStr)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (token.isUsed()) {
            throw new RuntimeException("Token already used");
        }

        if (token.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        token.setUsed(true);
        tokenRepository.save(token);

        User user = token.getUser();
        user.setVerified(true);
        userRepository.save(user);

        return "Account successfully verified! You can now log in.";
    }
}
