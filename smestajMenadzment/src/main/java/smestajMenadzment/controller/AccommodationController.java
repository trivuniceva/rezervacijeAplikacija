package smestajMenadzment.controller;

import backend.model.Accommodation;
import backend.service.AccommodationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/accommodations")
public class AccommodationController {

    @Autowired
    private AccommodationService accommodationService;

    @GetMapping
    public List<Accommodation> getAllAccommodations() {
        return accommodationService.getAllAccommodations();
    }
}

