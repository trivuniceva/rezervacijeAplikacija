package backend.service;

import backend.dto.SpecialPricingDto;
import backend.model.*;
import backend.repository.ReservationRepository;
import backend.repository.SpecialPriceAndAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import java.sql.Date;

@Service
public class SpecialPriceAndAvailabilityService {

    @Autowired
    private SpecialPriceAndAvailabilityRepository repository;

    @Autowired
    private ReservationRepository reservationRequestRepository;

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


    public List<LocalDate[]> getReservedDatesByApartmentId(Long apartmentId) {
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

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public List<SpecialPriceAndAvailability> getSpecialPricesByAccommodationId(Long accommodationId) {
        List<SpecialPriceAndAvailability> lst = repository.findByAccommodationIdAndAvailability(accommodationId, SpecialPriceAndAvailability.Availability.AVAILABLE);

        for(SpecialPriceAndAvailability l : lst) {
            System.out.println(l);
        }
        return lst;
    }

    public List<Reservation> getReservationsByGuestId(Long guestId) {
        return null;
    }


    private PricingMethod convertPricingMethod(String pricingMethodStr) {
        if (!StringUtils.hasText(pricingMethodStr)) {
            throw new IllegalArgumentException("Pricing method cannot be empty");
        }

        try {
            System.out.println(pricingMethodStr);

            if(pricingMethodStr.toUpperCase().equals("PERUNIT")){
                return PricingMethod.PER_UNIT;
            } else if (pricingMethodStr.toUpperCase().equals("PERGUEST")) {
                return PricingMethod.PER_GUEST;
            } else {
                return PricingMethod.NONE;
            }
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid pricing method: " + pricingMethodStr); // More specific exception
        }
    }

    public void updatePricing(SpecialPricingDto specialPricing) {
        Accommodation accommodation = accommodationService.getAccommodationById(specialPricing.getApartmentId());

        System.out.println(specialPricing.getPricingMethod());

        PricingMethod pricingMethod = convertPricingMethod(specialPricing.getPricingMethod()); // Use the conversion method

        System.out.println(pricingMethod);


        List<LocalDate> specialPriceDates = specialPricing.getAvailabilityList().stream()
                .map(dateString -> LocalDate.parse(dateString, formatter))
                .collect(Collectors.toList());

        for (LocalDate date : specialPriceDates) {
            SpecialPriceAndAvailability existingEntry = repository.findByAccommodation_IdAndStartDate(specialPricing.getApartmentId(), date);

            if (existingEntry != null) {
                existingEntry.setPrice(BigDecimal.valueOf(specialPricing.getPrice()));
                existingEntry.setPricingMethod(pricingMethod);
                existingEntry.setDeadline(Integer.parseInt(specialPricing.getCancellationDeadline()));
                existingEntry.setAvailability(SpecialPriceAndAvailability.Availability.AVAILABLE);
                repository.save(existingEntry);
                System.out.println("snimljenoooooo <3333");
            } else {
                SpecialPriceAndAvailability newEntry = new SpecialPriceAndAvailability();
                newEntry.setAccommodation(accommodation);
                newEntry.setStartDate(date);
                newEntry.setEndDate(date);
                newEntry.setPrice(BigDecimal.valueOf(specialPricing.getPrice()));
                newEntry.setPricingMethod(pricingMethod);
                newEntry.setDeadline(Integer.parseInt(specialPricing.getCancellationDeadline()));
                newEntry.setAvailability(SpecialPriceAndAvailability.Availability.AVAILABLE); // Or handle availability as needed
                repository.save(newEntry);
                System.out.println("snimljen");
            }
        }
    }

}
