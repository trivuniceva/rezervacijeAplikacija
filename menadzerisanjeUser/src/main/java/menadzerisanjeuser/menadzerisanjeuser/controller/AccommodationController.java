package menadzerisanjeuser.menadzerisanjeuser.controller;

import menadzerisanjeuser.menadzerisanjeuser.dto.ApartmentRequest;
import menadzerisanjeuser.menadzerisanjeuser.model.Accommodation;
import menadzerisanjeuser.menadzerisanjeuser.model.SuccessResponse;
import menadzerisanjeuser.menadzerisanjeuser.service.AccommodationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/add-apartment")
    public ResponseEntity<?> addNewApartment(@RequestBody ApartmentRequest apartmentRequest) {
        System.out.println("Primljen zahtev: " + apartmentRequest);

        this.accommodationService.addNewAccommodation(apartmentRequest);
        return ResponseEntity.ok(new SuccessResponse("Successful!"));
    }

}

