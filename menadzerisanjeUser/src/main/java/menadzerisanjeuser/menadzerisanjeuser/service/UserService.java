package menadzerisanjeuser.menadzerisanjeuser.service;

import menadzerisanjeuser.menadzerisanjeuser.dto.UserDto;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import menadzerisanjeuser.menadzerisanjeuser.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final String uploadDirectory = "public/pics/";

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

    public String saveFileToServer(MultipartFile file) {
        // Kreiraj direktorijum ako ne postoji
        File directory = new File(uploadDirectory);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Generiši jedinstveno ime fajla
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDirectory + fileName);

        try {
            // Sačuvaj fajl u javno dostupni folder
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Error saving file", e);
        }

        // Vraćamo relativnu putanju do fajla (kako bi mogla da se koristi u URL-u)
        return "/pics/" + fileName;
    }

    public void uploadProfilePic(MultipartFile file, String email) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Sačuvaj fajl na serveru
        String filePath = saveFileToServer(file);

        // Ažuriraj putanju do slike u korisnikovom profilu
        user.setProfilePic(filePath);
        userRepository.save(user);
    }
}