package backend.controller;

import backend.dto.ReservationDTO;
import backend.model.Reservation;
import backend.model.ResponseMessage;
import backend.service.ReservationService;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
        System.out.println("usoooo");


        // Pretpostavljamo da je User servis na backendu koji prepoznaje korisnika
        User guest = new User(); // Logika za pretragu korisnika sa guestId
        guest.setId(guestId);
        return service.getReservationsForGuest(guest);
    }

    @GetMapping("/reservations/host/{apartmentId}")
    public List<Reservation> getReservationsForHost(@PathVariable Long apartmentId) {
        System.out.println("usoooo");

        return service.getReservationsForHost(apartmentId);
    }


}
