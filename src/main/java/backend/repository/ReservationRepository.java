package backend.repository;

import backend.model.Reservation;
import backend.model.ReservationStatus;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByAccommodationIdAndStatus(Long accommodationId, ReservationStatus reservationStatus);
    List<Reservation> findByGuest(User guest);
}
