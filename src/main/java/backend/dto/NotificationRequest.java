package backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class NotificationRequest {

    private Long id;
    private String message;
    private boolean isRead;
    private LocalDateTime timestamp;
    private String info;
    private ApartmentDTO apartment;
    private UserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public ApartmentDTO getApartment() {
        return apartment;
    }

    public void setApartment(ApartmentDTO apartment) {
        this.apartment = apartment;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "NotificationRequest{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", isRead=" + isRead +
                ", timestamp=" + timestamp +
                ", info='" + info + '\'' +
                ", apartment=" + apartment +
                ", user=" + user +
                '}';
    }
}
