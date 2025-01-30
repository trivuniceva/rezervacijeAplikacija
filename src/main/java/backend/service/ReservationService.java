package backend.service;

import backend.dto.ReservationDTO;
import backend.model.*;
import backend.repository.AccommodationRepository;
import backend.repository.ReservationRepository;
import backend.repository.SpecialPriceAndAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private SpecialPriceAndAvailabilityRepository specialPriceAndAvailabilityRepository;

    @Autowired
    private AccommodationRepository accommodationRepository;


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

        System.out.println(reservationData.toString());

        // TODO 3: proveri da li je prosledjena dobra cena

        BigDecimal fullPrice = calculateTotalPrice(reservationData.getAccommodationId(), reservationData.getSelectedDates(), reservationData.getNumberOfGuests());
        System.out.println("fullPriceeeeeeeee + " + fullPrice);

        if(!areDatesReserved(reservationData.getAccommodationId(), reservationData.getSelectedDates())){
            System.out.println("regulara sve");
        if (!areDatesNotAvailable(reservationData.getAccommodationId(), reservationData.getSelectedDates())){
            System.out.println("dobre dane izabroo");

            // TODO 4: rezervisi



        }

        }


        return true;
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


}
