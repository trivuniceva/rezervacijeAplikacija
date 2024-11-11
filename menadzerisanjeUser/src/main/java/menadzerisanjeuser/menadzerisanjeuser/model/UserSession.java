package menadzerisanjeuser.menadzerisanjeuser.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_session")

public class UserSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")  // Dodato ime kolone
    private Long id;

    @Column(name = "user_id")  // Dodato ime kolone
    private Long userId;  // ID korisnika koji je prijavljen

    @Column(name = "session_id")  // Dodato ime kolone
    private String sessionId;  // ID sesije

    @Column(name = "login_time")  // Dodato ime kolone
    private LocalDateTime loginTime;  // Vreme kada je korisnik prijavljen

    @Column(name = "ip_address")  // Dodato ime kolone
    private String ipAddress;  // IP adresa korisnika

    @Column(name = "active")  // Dodato ime kolone
    private boolean active; // Da li je sesija aktivna

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;

    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public LocalDateTime getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(LocalDateTime loginTime) {
        this.loginTime = loginTime;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}

