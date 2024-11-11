package menadzerisanjeuser.menadzerisanjeuser.service;

import menadzerisanjeuser.menadzerisanjeuser.model.UserSession;
import menadzerisanjeuser.menadzerisanjeuser.repository.UserSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SessionService {

    @Autowired
    private UserSessionRepository userSessionRepository;

    // Spremi sesiju u bazu
    public void saveSession(Long userId, String sessionId, String ipAddress) {
        UserSession userSession = new UserSession();
        userSession.setUserId(userId);
        userSession.setSessionId(sessionId);
        userSession.setLoginTime(LocalDateTime.now());
        userSession.setIpAddress(ipAddress);
        userSession.setActive(true);
        userSessionRepository.save(userSession);
    }

    // Pronađi sesiju prema ID-u sesije
    public Optional<UserSession> getSessionBySessionId(String sessionId) {
        return userSessionRepository.findBySessionId(sessionId);
    }

    // Pronađi sve sesije korisnika
    public List<UserSession> getSessionsByUserId(Long userId) {
        return userSessionRepository.findByUserId(userId);
    }

    // Pronađi samo aktivne sesije korisnika
    public List<UserSession> getActiveSessionsByUserId(Long userId) {
        return userSessionRepository.findByUserIdAndActiveTrue(userId);
    }

    // Invalidiraj (zatvori) sesiju
    public void invalidateSession(Long userId, String sessionId) {
        List<UserSession> activeSessions = userSessionRepository.findByUserIdAndSessionIdNot(userId, sessionId);
        for (UserSession session : activeSessions) {
            session.setActive(false);
            userSessionRepository.save(session);
        }
    }
}
