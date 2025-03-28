package backend.controller;

import backend.dto.AvailabilityRequest;
import backend.dto.SpecialPricingDto;
import backend.model.Reservation;
import backend.model.SpecialPriceAndAvailability;
import backend.service.SpecialPriceAndAvailabilityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/special-prices")
public class SpecialPriceController {
    private final SpecialPriceAndAvailabilityService service;

    public SpecialPriceController(SpecialPriceAndAvailabilityService service) {
        this.service = service;
    }

    @GetMapping("/pricesSS")
    public List<SpecialPriceAndAvailability> getAvailableSpecialPrices(@RequestParam Long apartmentId) {
        return service.getSpecialPrice(apartmentId);
    }

    @GetMapping("/reservedDatesApartment")
    public List<LocalDate[]> getReservedDatesByApartmentId(@RequestParam Long apartmentId) {
        return service.getReservedDatesByApartmentId(apartmentId);
    }

    @GetMapping("/reservedDatesGuest")
    public List<Reservation> getReservationsByGuest(@PathVariable Long guestId) {
        return service.getReservationsByGuestId(guestId);
    }


    @GetMapping("/unavailableDates")
    public List<LocalDate[]> getUnavailableDates(@RequestParam Long apartmentId) {
        return service.getUnavailableDates(apartmentId);
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> saveSpecialPricing(@RequestBody SpecialPricingDto specialPricing) {
        System.out.println("Received special pricing data: " + specialPricing);
        Map<String, String> response = new HashMap<>();

        service.updatePricing(specialPricing);

        response.put("message", "Special pricing data saved successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update-availability")
    public ResponseEntity<?> updateAvailability(@RequestBody AvailabilityRequest request) {
        // Poziv servisa da ažurira dostupnost za te datume
        service.updateAvailability(request.getApartmentId(), request.getDates());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/prices/{accommodationId}")
    public ResponseEntity<List<SpecialPriceAndAvailability>> getSpecialPricesByAccommodationId(@PathVariable Long accommodationId) {
        List<SpecialPriceAndAvailability> specialPrices = service.getSpecialPricesByAccommodationId(accommodationId);
        return ResponseEntity.ok(specialPrices);
    }


}
