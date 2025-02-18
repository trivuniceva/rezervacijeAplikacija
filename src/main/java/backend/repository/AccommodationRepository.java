package backend.repository;

import backend.model.Accommodation;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findByApproved(boolean approved);
    List<Accommodation> findByType(String type);
    List<Accommodation> findByLocation(String location);
    List<Accommodation> findByOwnerId(Long ownerId);
    Optional<Accommodation> findById(Long id);

    @Modifying
    @Transactional
    @Query("UPDATE Accommodation a SET a.isDeleted = true WHERE a.owner.id = :ownerId")
    void updateIsDeletedByOwnerId(@Param("ownerId") Long ownerId);
}
