package smestajMenadzment.service;

import smestajMenadzment.model.Accommodation;
import backend.repository.AccommodationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccommodationService {

    @Autowired
    private AccommodationRepository accommodationRepository;

    public List<Accommodation> getAllAccommodations() {
        return accommodationRepository.findAll();
    }
}

