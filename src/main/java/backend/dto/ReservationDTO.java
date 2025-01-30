package backend.dto;

import java.util.List;

public class ReservationDTO {
    private Long accommodationId;
    private Long userId;
    private Double fullPrice;
    private List<String> selectedDates;
    private int numberOfGuests;


    public Long getAccommodationId() {
        return accommodationId;
    }

    public void setAccommodationId(Long accommodationId) {
        this.accommodationId = accommodationId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Double getFullPrice() {
        return fullPrice;
    }

    public void setFullPrice(Double fullPrice) {
        this.fullPrice = fullPrice;
    }

    public List<String> getSelectedDates() {
        return selectedDates;
    }

    public void setSelectedDates(List<String> selectedDates) {
        this.selectedDates = selectedDates;
    }

    public int getNumberOfGuests() {
        return numberOfGuests;
    }

    public void setNumberOfGuests(int numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }

    @Override
    public String toString() {
        return "ReservationDTO{" +
                "accommodationId=" + accommodationId +
                ", userId=" + userId +
                ", fullPrice=" + fullPrice +
                ", selectedDates=" + selectedDates +
                ", numberOfGuests=" + numberOfGuests +
                '}';
    }
}
