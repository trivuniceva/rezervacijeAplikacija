package backend.service;

import backend.controller.AccommodationController;
import backend.dto.ApartmentDTO;
import backend.dto.NotificationRequest;
import backend.model.Accommodation;
import backend.model.Notification;
import backend.model.PricingMethod;
import backend.model.ReservationType;
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
        System.out.println(accommodation.toString());
        accommodation.setApproved(false);
        accommodation.setPricingMethod(PricingMethod.PER_GUEST);
        accommodation.setReservationType(ReservationType.MANUAL);
        Accommodation savedAccommodation = accommodationRepository.save(accommodation);

        List<User> admins = userRepository.findByUserRole(UserRole.ADMINISTRATOR);
        if(admins.size() > 1){
            System.out.println(admins.toString());
            for (int i = 0; i < admins.size(); i++)
            handleNotification(admins.get(i), String.valueOf(accommodation.getId()));
        } else {
            System.out.println(admins.get(0).getId());
            handleNotification(admins.get(0), String.valueOf(accommodation.getId()));
        }
        return savedAccommodation;

    }

    private void handleNotification(User user, String info){
        Notification notification = new Notification();
        notification.setMessage("Created new apartment with id: #");
        notification.setRead(false);
        notification.setUser(user);
        notification.setInfo(info);

        notificationService.createNotification(notification);

    }

    public Accommodation getAccommodationById(Long id) {
        return accommodationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Accommodation not found with id " + id));
    }

    public void approveApartment(ApartmentDTO apartment) {
        Accommodation accommodation = getAccommodationById(apartment.getId());
        System.out.println(accommodation);
        System.out.println("^^^^");
    }

    public void approveApartment(NotificationRequest notificationRequest) {
        notificationService.markAsRead(notificationRequest.getId());
        Accommodation accommodation = getAccommodationById(notificationRequest.getApartment().getId());
        accommodation.setApproved(true);

        accommodationRepository.save(accommodation);
    }

    public void rejectApartment(NotificationRequest notificationRequest) {
        notificationService.markAsRead(notificationRequest.getId());
        Accommodation accommodation = getAccommodationById(notificationRequest.getApartment().getId());
        accommodation.setApproved(false);

        accommodationRepository.save(accommodation);
    }



}

