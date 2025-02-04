package backend.controller;

import backend.dto.ReservationDTO;
import backend.model.Reservation;
import backend.model.ReservationStatus;
import backend.model.ResponseMessage;
import backend.service.ReservationService;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ReservationController {

    @Autowired
    private ReservationService service;

    @PostMapping("/reserve")
    public ResponseEntity<?> confirmReservation(@RequestBody ReservationDTO reservationData) {
        try {
            boolean success = service.processReservation(reservationData);
            if (success) {
                return ResponseEntity.ok().body(new ResponseMessage("Rezervacija uspešno potvrđena."));
            } else {
                return ResponseEntity.status(400).body(new ResponseMessage("Greška pri potvrdi rezervacije."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ResponseMessage("Interna greška servera: " + e.getMessage()));
        }
    }

    @GetMapping("/reservations/guest/{guestId}")
    public List<Reservation> getReservationsForGuest(@PathVariable Long guestId) {
        User guest = new User();
        guest.setId(guestId);
        return service.getReservationsForGuest(guest);
    }

    @GetMapping("/reservations/host/{apartmentId}")
    public List<Reservation> getReservationsForHost(@PathVariable Long apartmentId) {
        return service.getReservationsForHost(apartmentId);
    }

    @PostMapping("/reservations/update-status/{reservationId}/{status}")
    public ResponseEntity<?> updateReservationStatus(
            @PathVariable Long reservationId,
            @PathVariable String status) {
        try {
            boolean success = service.updateReservationStatus(reservationId, status);
            if (success) {
                return ResponseEntity.ok().body(new ResponseMessage("Rezervacija je uspešno ažurirana."));
            } else {
                return ResponseEntity.status(400).body(new ResponseMessage("Greška pri ažuriranju rezervacije."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ResponseMessage("Interna greška servera: " + e.getMessage()));
        }
    }

    @PostMapping("/reservations/delete-card/{reservationId}")
    public ResponseEntity<?> updateReservationStatus(
            @PathVariable Long reservationId) {
        try {
            boolean success = service.deleteCard(reservationId);
            if (success) {
                return ResponseEntity.ok().body(new ResponseMessage("Rezervacija je uspešno ažurirana."));
            } else {
                return ResponseEntity.status(400).body(new ResponseMessage("Greška pri ažuriranju rezervacije."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ResponseMessage("Interna greška servera: " + e.getMessage()));
        }
    }

    @PostMapping("/reservations/guest-declined/{guestId}")
    public ResponseEntity<?> fetchGuestDeclinedCount(@PathVariable Long guestId) {
        System.out.println("NAJJACA SI MACKO MAJKE MI ");
        try {
            long declinedCount = service.fetchGuestDeclinedCount(guestId);  // Poziv servisne metode koja vraća broj odbijenih rezervacija
            if (declinedCount >= 0) {
                return ResponseEntity.ok().body(declinedCount);  // Poslati samo broj odbijenih rezervacija
            } else {
                return ResponseEntity.status(400).body(new ResponseMessage("Greška pri prebrojavanju odbijenih rezervacija."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ResponseMessage("Interna greška servera: " + e.getMessage()));
        }
    }




}
