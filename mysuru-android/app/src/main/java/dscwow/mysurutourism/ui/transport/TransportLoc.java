package dscwow.mysurutourism.ui.transport;

import com.google.firebase.firestore.GeoPoint;

public class TransportLoc {
    private String name;
    private double latitude;

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    private double longitude;

    public double getDistanceMeters() {
        return distanceMeters;
    }

    public void setDistanceMeters(double distanceMeters) {
        this.distanceMeters = distanceMeters;
    }

    private double distanceMeters;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



}
