package backend.service;

import backend.dto.ReservationDTO;
import backend.model.*;
import backend.repository.AccommodationRepository;
import backend.repository.ReservationRepository;
import backend.repository.SpecialPriceAndAvailabilityRepository;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import menadzerisanjeuser.menadzerisanjeuser.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private SpecialPriceAndAvailabilityRepository specialPriceAndAvailabilityRepository;

    @Autowired
    private AccommodationRepository accommodationRepository;

    @Autowired
    private UserRepository userRepository;


    public Reservation createReservationRequest(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public Reservation getReservationRequestById(Long id) {
        return reservationRepository.findById(id).orElse(null);
    }

    public List<Reservation> getAllReservationRequests() {
        return reservationRepository.findAll();
    }

    public void deleteReservationRequest(Long id) {
        reservationRepository.deleteById(id);
    }

    public boolean processReservation(ReservationDTO reservationData) {

        BigDecimal fullPrice = calculateTotalPrice(reservationData.getAccommodationId(), reservationData.getSelectedDates(), reservationData.getNumberOfGuests());

        if(!areDatesReserved(reservationData.getAccommodationId(), reservationData.getSelectedDates())){
            if (!areDatesNotAvailable(reservationData.getAccommodationId(), reservationData.getSelectedDates())){
                Long accommodationId = reservationData.getAccommodationId();
                Accommodation accommodation = accommodationRepository.findById(accommodationId).get();

                Long guestId = reservationData.getUserId();
                User guest = userRepository.findById(guestId).get();

                Reservation reservation = new Reservation();

                reservation.setGuest(guest);
                reservation.setAccommodation(accommodation);
                reservation.setStartDate(LocalDate.parse(reservationData.getSelectedDates().get(0))); // Assuming the first date is the start date
                reservation.setEndDate(LocalDate.parse(reservationData.getSelectedDates().get(reservationData.getSelectedDates().size() - 1))); // Assuming the last date is the end date
                reservation.setNumberOfGuests(reservationData.getNumberOfGuests());
                reservation.setPrice(fullPrice);


                if(isManualReservation(accommodation.getReservationType())) {
                    reservation.setStatus(ReservationStatus.PENDING);
                } else {
                    reservation.setStatus(ReservationStatus.ACCEPTED);
                }

                reservationRepository.save(reservation);
            }
        }
        return true;
    }

    private boolean isManualReservation(ReservationType reservationType) {
        if(reservationType.equals(ReservationType.MANUAL)){
            return true;
        }
        return false;
    }


    public BigDecimal calculateTotalPrice(Long accommodationId, List<String> selectedDates, int numberOfGuests) {
        List<SpecialPriceAndAvailability> specialPrices =
                specialPriceAndAvailabilityRepository.findByAccommodationIdAndAvailability(accommodationId, SpecialPriceAndAvailability.Availability.AVAILABLE);
        Accommodation accommodation = accommodationRepository.findById(accommodationId)
                .orElseThrow(() -> new RuntimeException("Accommodation not found"));

        BigDecimal totalPrice = BigDecimal.ZERO;

        for (String dateStr : selectedDates) {
            LocalDate date = LocalDate.parse(dateStr);
            BigDecimal dailyPrice = BigDecimal.ZERO;
            boolean priceFound = false;

            for (SpecialPriceAndAvailability specialPrice : specialPrices) {
                if (!date.isBefore(specialPrice.getStartDate()) && !date.isAfter(specialPrice.getEndDate())) {
                    dailyPrice = specialPrice.getPrice();
                    priceFound = true;
                    if (specialPrice.getPricingMethod().equals(PricingMethod.PER_GUEST)) {
                        dailyPrice = dailyPrice.multiply(BigDecimal.valueOf(numberOfGuests));
                    }
                    break;
                }
            }

            if (!priceFound) {
                dailyPrice = accommodation.getDefaultPrice();
                if (accommodation.getPricingMethod().equals(PricingMethod.PER_GUEST)) {
                    dailyPrice = dailyPrice.multiply(BigDecimal.valueOf(numberOfGuests));
                }
            }

            totalPrice = totalPrice.add(dailyPrice);
        }

        return totalPrice;
    }


    private boolean areDatesReserved(Long accommodationId, List<String> selectedDates) {

        List<LocalDate> selectedLocalDates = selectedDates.stream()
                .map(LocalDate::parse)
                .toList();

        System.out.println("usao");

        List<Reservation> reservations = reservationRepository.findByAccommodationIdAndStatus(accommodationId, ReservationStatus.ACCEPTED);

        for (Reservation reservation : reservations) {
            LocalDate startDate = reservation.getStartDate();
            LocalDate endDate = reservation.getEndDate();

            System.out.println("selectedLocalDates: " + selectedLocalDates);
            for (LocalDate selectedDate : selectedLocalDates) {
                System.out.println("selectedDate: " + selectedDate);
                if (!selectedDate.isBefore(startDate) && !selectedDate.isAfter(endDate)) {
                    return true;
                }
            }
        }

        return false;
    }

    public boolean areDatesNotAvailable(Long accommodationId, List<String> selectedDates) {
        List<SpecialPriceAndAvailability> unavailablePeriods =
                specialPriceAndAvailabilityRepository.findByAccommodationIdAndAvailability(accommodationId, SpecialPriceAndAvailability.Availability.NOT_AVAILABLE);

        System.out.println("unavailablePeriods: " + unavailablePeriods);

        for (String dateStr : selectedDates) {
            LocalDate date = LocalDate.parse(dateStr); // Parsira string u LocalDate
            System.out.println("date: " + date);
            for (SpecialPriceAndAvailability period : unavailablePeriods) {
                if (!date.isBefore(period.getStartDate()) && !date.isAfter(period.getEndDate())) {
                    return true;
                }
            }
        }
        return false;
    }

    public List<Reservation> getReservationsForGuest(User guest) {
        System.out.println("ajm o lutkoooo");
        return reservationRepository.findByGuest(guest);
    }

    public List<Reservation> getReservationsForHost(Long apartmentId) {
        System.out.println("ajm o lutkoooo");
        System.out.println(reservationRepository.findByAccommodationIdAndStatus(apartmentId, ReservationStatus.PENDING));

        return reservationRepository.findByAccommodationIdAndStatus(apartmentId, ReservationStatus.PENDING);
    }

}
