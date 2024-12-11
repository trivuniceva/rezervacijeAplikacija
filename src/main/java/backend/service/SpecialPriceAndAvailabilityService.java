package backend.service;

import backend.model.SpecialPriceAndAvailability;
import backend.repository.SpecialPriceAndAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialPriceAndAvailabilityService {

    @Autowired
    private SpecialPriceAndAvailabilityRepository specialPriceAndAvailabilityRepository;

    public SpecialPriceAndAvailability createSpecialPriceAndAvailability(SpecialPriceAndAvailability specialPriceAndAvailability) {
        return specialPriceAndAvailabilityRepository.save(specialPriceAndAvailability);
    }

    public SpecialPriceAndAvailability getSpecialPriceAndAvailabilityById(Long id) {
        return specialPriceAndAvailabilityRepository.findById(id).orElse(null);
    }

    public List<SpecialPriceAndAvailability> getAllSpecialPricesAndAvailabilities() {
        return specialPriceAndAvailabilityRepository.findAll();
    }

    public void deleteSpecialPriceAndAvailability(Long id) {
        specialPriceAndAvailabilityRepository.deleteById(id);
    }
}
