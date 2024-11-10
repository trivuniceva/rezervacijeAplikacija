package menadzerisanjeuser.menadzerisanjeuser.controller;

import menadzerisanjeuser.menadzerisanjeuser.dto.UserDto;
import menadzerisanjeuser.menadzerisanjeuser.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/update-user")
    public ResponseEntity<String> updateUser(@RequestBody UserDto userDto) {
        System.out.println(userDto.getEmail());
        System.out.println(userDto.getFirstname());
        try {
            userService.updateUser(userDto);
            return ResponseEntity.ok("User updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user");
        }
    }

    @PostMapping(value = "/upload-profile-pic", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> uploadProfilePic(@RequestParam("file") MultipartFile file, @RequestParam("email") String email) {
        // logika za upload
        String filePath = this.userService.saveFileToServer(file);
        // vraća JSON odgovor
        return ResponseEntity.ok().body(Map.of("message", "Profile picture uploaded successfully", "profilePicUrl", filePath));
    }




}
