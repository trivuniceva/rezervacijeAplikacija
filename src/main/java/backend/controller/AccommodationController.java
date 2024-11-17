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

    @PostMapping("/add-apartment")
    public ResponseEntity<Accommodation> addNewAccommodation(@RequestBody Accommodation accommodation) {
        Accommodation savedAccommodation = accommodationService.saveAccommodation(accommodation);
        return ResponseEntity.ok(savedAccommodation);
    }

}

