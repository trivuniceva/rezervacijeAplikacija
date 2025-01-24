package backend.repository;

import backend.model.Accommodation;
import backend.model.SpecialPriceAndAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SpecialPriceAndAvailabilityRepository extends JpaRepository<SpecialPriceAndAvailability, Long> {
    List<SpecialPriceAndAvailability> findByAvailability(SpecialPriceAndAvailability.Availability availability);
    List<SpecialPriceAndAvailability> findByAccommodation_Id(Long accommodationId);
    boolean existsByStartDateAndEndDateAndAccommodation_Id(LocalDate startDate, LocalDate dateEnd, Long accommodationId);

    List<SpecialPriceAndAvailability> findByAccommodationIdAndAvailability(Long accommodationId, SpecialPriceAndAvailability.Availability availability);





}

