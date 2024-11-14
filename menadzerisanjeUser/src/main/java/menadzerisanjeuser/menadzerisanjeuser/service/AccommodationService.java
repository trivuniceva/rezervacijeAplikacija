package menadzerisanjeuser.menadzerisanjeuser.service;

import menadzerisanjeuser.menadzerisanjeuser.model.Accommodation;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import menadzerisanjeuser.menadzerisanjeuser.repository.AccommodationRepository;
import menadzerisanjeuser.menadzerisanjeuser.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccommodationService {

    @Autowired
    private AccommodationRepository accommodationRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Accommodation> getAllAccommodations() {
        return accommodationRepository.findAll();
    }

    public List<Accommodation> getAccommodationsByHost(String email) {
        User host = this.userRepository.findByEmail(email);

        System.out.println("Host id: " + host.getId());
        System.out.println(this.accommodationRepository.findByOwnerId(host.getId()));

        return this.accommodationRepository.findByOwnerId(host.getId());
    }
}

