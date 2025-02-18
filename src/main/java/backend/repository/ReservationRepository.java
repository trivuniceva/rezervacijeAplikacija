package backend.repository;

import backend.model.Reservation;
import backend.model.ReservationStatus;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByAccommodationIdAndStatus(Long accommodationId, ReservationStatus reservationStatus);
    List<Reservation> findByGuest(User guest);
    long countByGuestIdAndStatus(Long guestId, ReservationStatus status);


    @Query("SELECT r FROM Reservation r " +
            "WHERE r.accommodation.id = :accommodationId " +
            "AND r.status = :status " +
            "AND ((r.startDate <= :endDate AND r.endDate >= :startDate)) " +
            "AND r.id != :reservationId")  // da izbegneš trenutnu rezervaciju
    List<Reservation> findPendingReservationsByAccommodationAndDateRange(
            @Param("accommodationId") Long accommodationId,
            @Param("status") ReservationStatus status,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("reservationId") Long reservationId);


}
