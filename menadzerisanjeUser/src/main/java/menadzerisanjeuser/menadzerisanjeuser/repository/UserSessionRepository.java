package menadzerisanjeuser.menadzerisanjeuser.repository;

import menadzerisanjeuser.menadzerisanjeuser.model.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface UserSessionRepository extends JpaRepository<UserSession, Long> {

    // Pronaći sve sesije koje pripadaju korisniku
    List<UserSession> findByUserId(Long userId);

    // Pronaći aktivne sesije za korisnika
    List<UserSession> findByUserIdAndActive(Long userId, boolean active);

    // Pronaći sesiju na osnovu sesijskog ID-a
    Optional<UserSession> findBySessionId(String sessionId);

    // Pronaći sesije koje nisu aktivne (ako želiš da prikazuješ istekle sesije)
    List<UserSession> findByActiveFalse();

    // Pronaći sesije koje su aktivne i pripadaju određenom korisniku
    List<UserSession> findByUserIdAndActiveTrue(Long userId);

    // Pronaći sesije koje nisu povezane sa trenutnim sesijskim ID-om
    List<UserSession> findByUserIdAndSessionIdNot(Long userId, String sessionId);
}

