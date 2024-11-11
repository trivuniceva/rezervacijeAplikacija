package menadzerisanjeuser.menadzerisanjeuser.controller;

import menadzerisanjeuser.menadzerisanjeuser.dto.ChangePasswordRequest;
import menadzerisanjeuser.menadzerisanjeuser.dto.UserDto;
import menadzerisanjeuser.menadzerisanjeuser.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        System.out.println("menjamo sifru");
        boolean isChanged = userService.changePassword(request.getOldPassword(), request.getNewPassword());

        if (isChanged) {
            return ResponseEntity.ok("Password changed successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to change password. Old password is incorrect.");
        }
    }




    }
