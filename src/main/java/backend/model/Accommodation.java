package backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import menadzerisanjeuser.menadzerisanjeuser.model.User;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "accommodations")
public class Accommodation {
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    private String location;

    @ElementCollection
    private List<String> amenities;  // wifi, klima, itd.

    @Column(name = "photos")
    private String photos;

    private int minGuests;
    private int maxGuests;

    @Enumerated(EnumType.STRING)
    private AccommodationType type;

    private boolean approved;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @Column(name = "default_price", nullable = false)
    private BigDecimal defaultPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "pricing_method")
    private PricingMethod pricingMethod;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<String> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }

    public String getPhotos() {
        return photos;
    }

    public void setPhotos(String photos) {
        this.photos = photos;
    }

    public int getMinGuests() {
        return minGuests;
    }

    public void setMinGuests(int minGuests) {
        this.minGuests = minGuests;
    }

    public int getMaxGuests() {
        return maxGuests;
    }

    public void setMaxGuests(int maxGuests) {
        this.maxGuests = maxGuests;
    }

    public AccommodationType getType() {
        return type;
    }

    public void setType(AccommodationType type) {
        this.type = type;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public BigDecimal getDefaultPrice() {
        return defaultPrice;
    }

    public void setDefaultPrice(BigDecimal defaultPrice) {
        this.defaultPrice = defaultPrice;
    }

    public PricingMethod getPricingMethod() {
        return pricingMethod;
    }

    public void setPricingMethod(PricingMethod pricingMethod) {
        this.pricingMethod = pricingMethod;
    }

    @Override
    public String toString() {
        return "Accommodation{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", amenities=" + amenities +
                ", photos='" + photos + '\'' +
                ", minGuests=" + minGuests +
                ", maxGuests=" + maxGuests +
                ", type=" + type +
                ", approved=" + approved +
                ", owner=" + owner +
                ", defaultPrice=" + defaultPrice +
                '}';
    }
}

