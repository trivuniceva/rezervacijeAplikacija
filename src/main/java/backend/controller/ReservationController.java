package backend.controller;

import backend.dto.ReservationDTO;
import backend.model.ResponseMessage;
import backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
