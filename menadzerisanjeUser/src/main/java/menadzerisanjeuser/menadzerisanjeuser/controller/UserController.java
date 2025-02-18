package menadzerisanjeuser.menadzerisanjeuser.controller;

import menadzerisanjeuser.menadzerisanjeuser.dto.PasswordChangeRequest;
import menadzerisanjeuser.menadzerisanjeuser.dto.UserDto;
import menadzerisanjeuser.menadzerisanjeuser.model.SuccessResponse;
import menadzerisanjeuser.menadzerisanjeuser.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
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
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
        System.out.println("Password change request received for: " + passwordChangeRequest.getEmail());
        try {
            boolean isChanged = userService.changePassword(passwordChangeRequest.getEmail(), passwordChangeRequest.getOldPassword(), passwordChangeRequest.getNewPassword());

            if (isChanged) {
                System.out.println("Password successfully changed for: " + passwordChangeRequest.getEmail());
                // Koristi SuccessResponse umesto ResponseMessage
                return ResponseEntity.ok(new SuccessResponse("Password changed successfully."));
            } else {
                System.out.println("Failed to change password for: " + passwordChangeRequest.getEmail());
                // Koristi SuccessResponse sa odgovarajućom porukom
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new SuccessResponse("Failed to change password."));
            }
        } catch (Exception e) {
            e.printStackTrace();
            // U slučaju greške, koristi SuccessResponse sa odgovarajućom porukom
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new SuccessResponse("An error occurred while changing the password."));
        }
    }

}
