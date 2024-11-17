package menadzerisanjeuser.menadzerisanjeuser.dto;

import menadzerisanjeuser.menadzerisanjeuser.model.AccommodationType;

import java.util.List;

public class ApartmentRequest {

    private String name;
    private String description;
    private String location;
    private List<String> amenities;
//    private String photos;
    private int minGuests;
    private int maxGuests;
    private AccommodationType type;
    private boolean approved;

    public ApartmentRequest() {
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

//    public String getPhotos() {
//        return photos;
//    }

//    public void setPhotos(String photos) {
//        this.photos = photos;
//    }

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

    @Override
    public String toString() {
        return "ApartmentRequest{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", amenities=" + amenities +

                ", minGuests=" + minGuests +
                ", maxGuests=" + maxGuests +
                ", type=" + type +
                ", approved=" + approved +
                '}';
    }
}