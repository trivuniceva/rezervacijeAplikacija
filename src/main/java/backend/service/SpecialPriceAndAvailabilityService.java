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

        // Definisanje formata datuma (d.M.yyyy)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d.M.yyyy");

        // Preuzimanje svih datuma iz baze za dati apartman
        List<SpecialPriceAndAvailability> existingEntries = specialPriceAndAvailabilityRepository.findByAccommodation_Id(apartmentId);

        // Lista koja sadrži datume koji su u bazi
        List<LocalDate> existingDates = existingEntries.stream()
                .map(SpecialPriceAndAvailability::getStartDate)
                .collect(Collectors.toList());

        // Lista koja sadrži datume koji su u zahtevima (dates)
        List<LocalDate> requestedDates = dates.stream()
                .map(dateString -> {
                    // Ako je datum u formatu sa vremenskim delom (ISO 8601), koristi ZonedDateTime
                    LocalDate date;
                    if (dateString.contains("T")) {
                        // Ako datum sadrži vreme (u formatu sa T), koristi ZonedDateTime da bi uzeo samo datum
                        ZonedDateTime zonedDateTime = ZonedDateTime.parse(dateString); // Format: "2024-12-15T00:00:00.000Z"
                        date = zonedDateTime.toLocalDate(); // Dobijanje samo datuma
                    } else {
                        // Ako je datum u formatu "d.M.yyyy", koristi LocalDate
                        date = LocalDate.parse(dateString, formatter);
                    }
                    return date;
                })
                .collect(Collectors.toList());

        // Dodavanje novih datuma koji nisu u bazi
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

        // Brisanje datuma koji su u bazi, a nisu u listi requestedDates
        List<SpecialPriceAndAvailability> entriesToRemove = existingEntries.stream()
                .filter(entry -> !requestedDates.contains(entry.getStartDate()))
                .collect(Collectors.toList());

        for (SpecialPriceAndAvailability entry : entriesToRemove) {
            // Brisanje zapisa iz baze koji nisu u listi requestedDates
            specialPriceAndAvailabilityRepository.delete(entry);
            System.out.println("Obrisan datum: " + entry.getStartDate());
        }
    }


    public List<SpecialPriceAndAvailability> getSpecialPricesByAccommodationId(Long accommodationId) {
        List<SpecialPriceAndAvailability> lst = repository.findByAccommodationIdAndAvailability(accommodationId, SpecialPriceAndAvailability.Availability.AVAILABLE);

        for(SpecialPriceAndAvailability l : lst) {
            System.out.println(l);
        }

        System.out.println("baj id");

        return lst;
    }

}
