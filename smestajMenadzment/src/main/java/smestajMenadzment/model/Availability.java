package smestajMenadzment.model;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "availability")
public class Availability {

    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "accommodation_id")
    private Accommodation accommodation;

    private LocalDate startDate;
    private LocalDate endDate;

    private BigDecimal pricePerGuest;
    private BigDecimal pricePerUnit;

    private boolean reserved;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Accommodation getAccommodation() {
        return accommodation;
    }

    public void setAccommodation(Accommodation accommodation) {
        this.accommodation = accommodation;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getPricePerGuest() {
        return pricePerGuest;
    }

    public void setPricePerGuest(BigDecimal pricePerGuest) {
        this.pricePerGuest = pricePerGuest;
    }

    public BigDecimal getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(BigDecimal pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public boolean isReserved() {
        return reserved;
    }

    public void setReserved(boolean reserved) {
        this.reserved = reserved;
    }


}

