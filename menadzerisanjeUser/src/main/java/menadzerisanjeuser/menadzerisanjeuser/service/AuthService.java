package menadzerisanjeuser.menadzerisanjeuser.service;

import menadzerisanjeuser.menadzerisanjeuser.model.ErrorResponse;
import menadzerisanjeuser.menadzerisanjeuser.model.RegisterRequest;
import menadzerisanjeuser.menadzerisanjeuser.model.SuccessResponse;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

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

    public ResponseEntity<?> signup(RegisterRequest registerRequest) {
        System.out.println(registerRequest.getRole());
        if(!this.userService.userExist(registerRequest.getEmail())){
            User newUser = new User();
            newUser.setEmail(registerRequest.getEmail());
            newUser.setPassword(registerRequest.getPassword());
            newUser.setFirstname(registerRequest.getFirstname());
            newUser.setLastname(registerRequest.getLastname());
            newUser.setProfilePic("/pics/slika2.jpg");
            newUser.setAddress(registerRequest.getAddress());
            newUser.setPhone(registerRequest.getPhone());
            newUser.setUserRole(registerRequest.getRole());

            try{
                System.out.println("krece mejl: " + newUser.getEmail());
                System.out.println("tokeN: " + newUser.getResetToken());

                String token = tokenService.generateToken();
                newUser.setResetToken(token);

                System.out.println("save....");
                userService.saveUser(newUser);
                System.out.println("snimio korisnika");

                emailService.sendActivationEmail(newUser.getEmail(), newUser.getResetToken());

                return ResponseEntity.ok(new SuccessResponse("Registration successful! Please check your email to activate your account."));

            } catch (Exception e) {
                System.err.println("Error saving user: " + e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Failed to save user."));
            }
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Email exist!."));
    }
}
