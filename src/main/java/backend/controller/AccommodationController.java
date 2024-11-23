package backend.controller;

import backend.model.Accommodation;
import backend.service.AccommodationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/createAccommodation")
    public ResponseEntity<Accommodation> createAccommodation(@RequestBody Accommodation accommodation) {
        Accommodation createdAccommodation = accommodationService.createAccommodation(accommodation);
        return ResponseEntity.ok(createdAccommodation);
    }

}

