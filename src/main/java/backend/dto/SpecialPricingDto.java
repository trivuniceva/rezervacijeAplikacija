package backend.dto;

import java.util.List;

public class SpecialPricingDto {
    private Long apartmentId;
    private double price;
    private String pricingMethod;
    private String cancellationDeadline;
    private List<String> availabilityList;

    public Long getApartmentId() {
        return apartmentId;
    }

    public void setApartmentId(Long apartmentId) {
        this.apartmentId = apartmentId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getPricingMethod() {
        return pricingMethod;
    }

    public void setPricingMethod(String pricingMethod) {
        this.pricingMethod = pricingMethod;
    }

    public String getCancellationDeadline() {
        return cancellationDeadline;
    }

    public void setCancellationDeadline(String cancellationDeadline) {
        this.cancellationDeadline = cancellationDeadline;
    }

    public List<String> getAvailabilityList() {
        return availabilityList;
    }

    public void setAvailabilityList(List<String> availabilityList) {
        this.availabilityList = availabilityList;
    }

    @Override
    public String toString() {
        return "SpecialPricingDto{" +
                "apartmentId=" + apartmentId +
                ", price=" + price +
                ", pricingMethod='" + pricingMethod + '\'' +
                ", cancellationDeadline='" + cancellationDeadline + '\'' +
                ", availabilityList=" + availabilityList +
                '}';
    }
}

