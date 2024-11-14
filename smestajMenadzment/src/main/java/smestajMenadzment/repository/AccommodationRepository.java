package smestajMenadzment.repository;

import smestajMenadzment.model.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findByApproved(boolean approved);
    List<Accommodation> findByType(String type);
    List<Accommodation> findByLocation(String location);
    List<Accommodation> findByOwnerId(Long ownerId);
}
