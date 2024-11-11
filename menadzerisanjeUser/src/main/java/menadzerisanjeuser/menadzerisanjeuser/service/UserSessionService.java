package menadzerisanjeuser.menadzerisanjeuser.service;

import menadzerisanjeuser.menadzerisanjeuser.model.UserSession;
import menadzerisanjeuser.menadzerisanjeuser.repository.UserSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserSessionService {

    @Autowired
    private UserSessionRepository userSessionRepository;

    public void loginUser(String email, String sessionId) {
        UserSession userSession = new UserSession();
        userSession.setEmail(email);
        userSession.setSessionId(sessionId);
        userSession.setLoginTime(LocalDateTime.now());

        userSessionRepository.save(userSession);
    }

    public void logoutUser(String sessionId) {
        userSessionRepository.deleteBySessionId(sessionId);
    }
}

