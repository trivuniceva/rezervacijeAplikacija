package menadzerisanjeuser.menadzerisanjeuser.service;

import menadzerisanjeuser.menadzerisanjeuser.model.RegisterRequest;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

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

    public void signup(RegisterRequest registerRequest) {
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
            newUser.setResetToken(this.userService.generateActivationToken());



            System.out.println("krece mejl: " + newUser.getEmail());
            System.out.println("tokeN: " + newUser.getResetToken());
//            emailService.sendActivationEmail(newUser.getEmail(), newUser.getResetToken());

            System.out.println("save....");
            userService.saveUser(newUser);
            System.out.println("snimio korisnika");
        }
    }
}
