package backend.repository;

import backend.model.SpecialPriceAndAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialPriceAndAvailabilityRepository extends JpaRepository<SpecialPriceAndAvailability, Long> {
}
