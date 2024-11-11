package menadzerisanjeuser.menadzerisanjeuser.service;

import menadzerisanjeuser.menadzerisanjeuser.dto.UserDto;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import menadzerisanjeuser.menadzerisanjeuser.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

//    @Autowired
    private PasswordEncoder passwordEncoder;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean userExist(String email) {
        return userRepository.findByEmail(email) != null;
    }

    public boolean validPassword(User user, String password) {
        return user.getPassword().equals(password);
    }

    public boolean isDeleted(User user) {
        return user.getDeletedAcc();
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(UserDto userDto) {
        User user = userRepository.findByEmail(userDto.getEmail());

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setProfilePic(user.getProfilePic());

        userRepository.save(user);
    }

    public boolean changePassword(String oldPassword, String newPassword) {
        User currentUser = getCurrentAuthenticatedUser();

        if (passwordEncoder.matches(oldPassword, currentUser.getPassword())) {
            currentUser.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(currentUser);
            System.out.println("uspesno snimio novu ");
            return true;
        } else {
            return false;
        }
    }

    private User getCurrentAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User with email " + email + " not found");
        }

        return user;
    }


}
