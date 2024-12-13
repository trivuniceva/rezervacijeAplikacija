package backend.service;

import backend.model.ReservationRequest;
import backend.model.SpecialPriceAndAvailability;
import backend.model.ReservationStatus;
import backend.repository.ReservationRequestRepository;
import backend.repository.SpecialPriceAndAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SpecialPriceAndAvailabilityService {

    @Autowired
    private SpecialPriceAndAvailabilityRepository repository;

    @Autowired
    private ReservationRequestRepository reservationRequestRepository;

    public SpecialPriceAndAvailability createSpecialPriceAndAvailability(SpecialPriceAndAvailability specialPriceAndAvailability) {
        return repository.save(specialPriceAndAvailability);
    }

    public SpecialPriceAndAvailability getSpecialPriceAndAvailabilityById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<SpecialPriceAndAvailability> getAllSpecialPricesAndAvailabilities() {
        return repository.findAll();
    }

    public void deleteSpecialPriceAndAvailability(Long id) {
        repository.deleteById(id);
    }

    public List<SpecialPriceAndAvailability> getSpecialPrice(Long apartmentId) {
        System.out.println("ajdee");
        System.out.println(repository.findByAccommodation_Id(apartmentId));
        return repository.findByAccommodation_Id(apartmentId);
    }

    public List<LocalDate[]> getUnavailableDates(Long apartmentId) {
        // Dohvatanje svih datuma koji nisu dostupni iz SpecialPriceAndAvailability
        List<LocalDate[]> unavailableDates = repository.findByAccommodation_Id(apartmentId).stream()
                .filter(price -> SpecialPriceAndAvailability.Availability.NOT_AVAILABLE.equals(price.getAvailability()))
                .map(price -> new LocalDate[]{price.getStartDate(), price.getDateEnd()})
                .collect(Collectors.toList());

        return unavailableDates;
    }


    public List<LocalDate[]> getReservedDates(Long apartmentId) {
        // Dohvatanje rezervacija koje su prihvaćene iz ReservationRequest
        List<LocalDate[]> reservedRequestDates = reservationRequestRepository.findAll().stream()
                .filter(reservation -> apartmentId.equals(reservation.getAccommodation().getId()) &&
                        ReservationStatus.ACCEPTED.equals(reservation.getStatus()))
                .map(reservation -> new LocalDate[]{reservation.getStartDate(), reservation.getEndDate()})
                .collect(Collectors.toList());

        return reservedRequestDates;
    }

    public void updateAvailability(Long apartmentId, List<String> dates) {
        System.out.println("Ažuriranje dostupnosti za apartman " + apartmentId + " sa datumima: " + dates);
    }
}
