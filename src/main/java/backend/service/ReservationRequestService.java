package backend.service;

import backend.repository.ReservationRequestRepository;
import backend.model.ReservationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationRequestService {

    @Autowired
    private ReservationRequestRepository reservationRequestRepository;

    public ReservationRequest createReservationRequest(ReservationRequest reservationRequest) {
        return reservationRequestRepository.save(reservationRequest);
    }

    public ReservationRequest getReservationRequestById(Long id) {
        return reservationRequestRepository.findById(id).orElse(null);
    }

    public List<ReservationRequest> getAllReservationRequests() {
        return reservationRequestRepository.findAll();
    }

    public void deleteReservationRequest(Long id) {
        reservationRequestRepository.deleteById(id);
    }
}
