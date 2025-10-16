//package backend.service;
//
//import backend.model.*;
//import backend.repository.ReservationRepository;
//import backend.repository.SpecialPriceAndAvailabilityRepository;
//import backend.service.AccommodationService;
//import backend.service.SpecialPriceAndAvailabilityService;
//import backend.dto.SpecialPricingDto;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.time.LocalDate;
//import java.util.Arrays;
//import java.util.Collections;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.anyLong;
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//
//
//@ExtendWith(MockitoExtension.class)
//public class SpecialPriceAndAvailabilityServiceTest {
//
//    // Ispravljeni nazivi mock-ova da se poklapaju sa servisom
//    @Mock
//    private SpecialPriceAndAvailabilityRepository repository;
//
//    @Mock
//    private ReservationRepository reservationRepository;
//
//    @Mock
//    private AccommodationService accommodationService;
//
//    @InjectMocks
//    private SpecialPriceAndAvailabilityService specialPriceAndAvailabilityService;
//
//    private Accommodation accommodation;
//
//    @BeforeEach
//    void setUp() {
//        accommodation = new Accommodation();
//        accommodation.setId(1L);
//    }
//
//    // Pozitivni test slučajevi
//    @Test
//    void getSpecialPrice_shouldReturnSpecialPricesForApartment() {
//        SpecialPriceAndAvailability specialPrice = new SpecialPriceAndAvailability();
//        when(repository.findByAccommodation_Id(1L)).thenReturn(List.of(specialPrice));
//
//        List<SpecialPriceAndAvailability> result = specialPriceAndAvailabilityService.getSpecialPrice(1L);
//
//        assertFalse(result.isEmpty());
//        assertEquals(1, result.size());
//        verify(repository, times(1)).findByAccommodation_Id(1L);
//    }
//
//    @Test
//    void getUnavailableDates_shouldReturnCorrectDates() {
//        SpecialPriceAndAvailability unavailablePeriod = new SpecialPriceAndAvailability();
//        unavailablePeriod.setAvailability(SpecialPriceAndAvailability.Availability.NOT_AVAILABLE);
//        unavailablePeriod.setStartDate(LocalDate.of(2025, 12, 1));
//        unavailablePeriod.setEndDate(LocalDate.of(2025, 12, 5));
//
//        when(repository.findByAccommodation_Id(1L)).thenReturn(List.of(unavailablePeriod));
//
//        List<LocalDate[]> unavailableDates = specialPriceAndAvailabilityService.getUnavailableDates(1L);
//
//        assertFalse(unavailableDates.isEmpty());
//        assertEquals(1, unavailableDates.size());
//        assertEquals(LocalDate.of(2025, 12, 1), unavailableDates.get(0)[0]);
//    }
//
//    @Test
//    void getReservedDatesByApartmentId_shouldReturnCorrectDates() {
//        Reservation reservation = new Reservation();
//        Accommodation apartment = new Accommodation();
//        apartment.setId(1L);
//        reservation.setAccommodation(apartment);
//        reservation.setStatus(ReservationStatus.ACCEPTED);
//        reservation.setStartDate(LocalDate.of(2025, 11, 10));
//        reservation.setEndDate(LocalDate.of(2025, 11, 15));
//
//        when(reservationRepository.findAll()).thenReturn(List.of(reservation));
//
//        List<LocalDate[]> reservedDates = specialPriceAndAvailabilityService.getReservedDatesByApartmentId(1L);
//
//        assertFalse(reservedDates.isEmpty());
//        assertEquals(1, reservedDates.size());
//        assertEquals(LocalDate.of(2025, 11, 10), reservedDates.get(0)[0]);
//    }
//
//    @Test
//    void updatePricing_shouldSaveNewPricing() {
//        SpecialPricingDto dto = new SpecialPricingDto();
//        dto.setApartmentId(1L);
//        dto.setPrice(150.0);
//        dto.setPricingMethod("PER_GUEST");
//        dto.setCancellationDeadline("48");
//        dto.setAvailabilityList(Arrays.asList("2025-12-01", "2025-12-02", "2025-12-03"));
//
//        when(accommodationService.getAccommodationById(1L)).thenReturn(accommodation);
//
//        specialPriceAndAvailabilityService.updatePricing(dto);
//
//        // Očekujemo poziv save() metode za svaki datum u listi
//        verify(repository, times(dto.getAvailabilityList().size())).save(any(SpecialPriceAndAvailability.class));
//    }
//
//    // Negativni i granični test slučajevi
//    @Test
//    void getSpecialPrice_shouldReturnEmptyListForNonExistingApartment() {
//        when(repository.findByAccommodation_Id(anyLong())).thenReturn(Collections.emptyList());
//
//        List<SpecialPriceAndAvailability> result = specialPriceAndAvailabilityService.getSpecialPrice(999L);
//
//        assertTrue(result.isEmpty());
//    }
//
//}
