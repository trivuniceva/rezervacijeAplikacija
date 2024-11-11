package menadzerisanjeuser.menadzerisanjeuser.repository;

import menadzerisanjeuser.menadzerisanjeuser.model.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSessionRepository extends JpaRepository<UserSession, Long> {
    void deleteBySessionId(String sessionId);
}

