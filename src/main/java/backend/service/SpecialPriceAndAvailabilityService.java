package backend.service;

import backend.model.PricingMethod;
import backend.model.SpecialPriceAndAvailability;
import backend.model.ReservationStatus;
import backend.repository.ReservationRequestRepository;
import backend.repository.SpecialPriceAndAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SpecialPriceAndAvailabilityService {

    @Autowired
    private SpecialPriceAndAvailabilityRepository repository;

    @Autowired
    private ReservationRequestRepository reservationRequestRepository;

    @Autowired
    private AccommodationService accommodationService;

    @Autowired
    private SpecialPriceAndAvailabilityRepository specialPriceAndAvailabilityRepository;

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
                .map(price -> new LocalDate[]{price.getStartDate(), price.getEndDate()})
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

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d.M.yyyy");

        List<SpecialPriceAndAvailability> existingEntries = specialPriceAndAvailabilityRepository.findByAccommodation_Id(apartmentId);

        Set<LocalDate> existingDates = existingEntries.stream()
                .map(SpecialPriceAndAvailability::getStartDate)
                .collect(Collectors.toSet());

        Set<LocalDate> requestedDates = dates.stream()
                .map(dateString -> {
                    LocalDate date;
                    if (dateString.contains("T")) {
                        date = ZonedDateTime.parse(dateString).toLocalDate();
                    } else {
                        date = LocalDate.parse(dateString, formatter);
                    }
                    return date;
                })
                .collect(Collectors.toSet()); // Eliminacija duplikata

        System.out.println("Postojeći datumi u bazi: " + existingDates);
        System.out.println("Zahtevani datumi: " + requestedDates);

        for (LocalDate date : requestedDates) {
            if (!existingDates.contains(date)) {
                SpecialPriceAndAvailability specialPriceAndAvailability = new SpecialPriceAndAvailability();
                specialPriceAndAvailability.setAccommodation(accommodationService.getAccommodationById(apartmentId));
                specialPriceAndAvailability.setStartDate(date);
                specialPriceAndAvailability.setEndDate(date);
                specialPriceAndAvailability.setPrice(BigDecimal.valueOf(0));
                specialPriceAndAvailability.setAvailability(SpecialPriceAndAvailability.Availability.NOT_AVAILABLE);
                specialPriceAndAvailability.setPricingMethod(PricingMethod.NONE);
                specialPriceAndAvailability.setDeadline(0);

                createSpecialPriceAndAvailability(specialPriceAndAvailability);
                System.out.println("Dodat novi datum: " + date);
            }
        }

        List<SpecialPriceAndAvailability> entriesToRemove = existingEntries.stream()
                .filter(entry -> !requestedDates.contains(entry.getStartDate()))
                .collect(Collectors.toList());

        for (SpecialPriceAndAvailability entry : entriesToRemove) {
            specialPriceAndAvailabilityRepository.delete(entry);
            System.out.println("Obrisan datum: " + entry.getStartDate());
        }
    }








}
