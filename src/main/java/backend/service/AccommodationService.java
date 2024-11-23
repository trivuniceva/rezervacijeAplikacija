package backend.service;

import backend.model.Accommodation;
import backend.model.Notification;
import backend.repository.AccommodationRepository;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import menadzerisanjeuser.menadzerisanjeuser.model.UserRole;
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

    @Autowired
    private NotificationService notificationService;

    public List<Accommodation> getAllAccommodations() {
        return accommodationRepository.findAll();
    }

    public List<Accommodation> getAccommodationsByHost(String email) {
        User host = this.userRepository.findByEmail(email);

        System.out.println("Host id: " + host.getId());
        System.out.println(this.accommodationRepository.findByOwnerId(host.getId()));

        return this.accommodationRepository.findByOwnerId(host.getId());
    }

    public Accommodation createAccommodation(Accommodation accommodation) {
        accommodation.setApproved(false);
        System.out.println(accommodation.getOwner());

        List<User> admins = userRepository.findByUserRole(UserRole.ADMINISTRATOR);
        System.out.println(admins.toString());
        System.out.println(admins.size());
        if(admins.size() > 1){
            System.out.println(admins.toString());
            for (int i = 0; i < admins.size(); i++)
            handleNotification(admins.get(i));
        } else {
            System.out.println(admins.get(0).getId());
            handleNotification(admins.get(0));
        }

        System.out.println("snima...");
        return accommodationRepository.save(accommodation);
    }

    private void handleNotification(User user){
        Notification notification = new Notification();
        notification.setMessage("Created new apartment.");
        notification.setIs_read(false);
        notification.setUser(user);

        notificationService.createNotification(notification);

    }
}

