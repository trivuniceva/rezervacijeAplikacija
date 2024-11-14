package menadzerisanjeuser.menadzerisanjeuser.controller;

import menadzerisanjeuser.menadzerisanjeuser.model.Accommodation;
import menadzerisanjeuser.menadzerisanjeuser.service.AccommodationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AccommodationController {

    @Autowired
    private AccommodationService accommodationService;

    @GetMapping("/accommodations")
    public List<Accommodation> getAllAccommodations() {
        return accommodationService.getAllAccommodations();
    }

    @GetMapping("/accommodationsByHost")
    public List<Accommodation> getAccommodationsByHost(@RequestParam String email) {
        return accommodationService.getAccommodationsByHost(email);
    }
}

