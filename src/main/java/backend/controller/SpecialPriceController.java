package backend.controller;

import backend.model.SpecialPriceAndAvailability;
import backend.service.SpecialPriceAndAvailabilityService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/special-prices")
public class SpecialPriceController {
    private final SpecialPriceAndAvailabilityService service;

    public SpecialPriceController(SpecialPriceAndAvailabilityService service) {
        this.service = service;
    }

    @GetMapping("/available")
    public List<SpecialPriceAndAvailability> getAvailableSpecialPrices(@RequestParam Long apartmentId) {
        return service.getSpecialPrice(apartmentId);
    }

}
