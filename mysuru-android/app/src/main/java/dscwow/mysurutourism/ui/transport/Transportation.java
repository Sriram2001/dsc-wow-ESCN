package dscwow.mysurutourism.ui.transport;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.GeoPoint;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import dscwow.mysurutourism.R;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Transportation#newInstance} factory method to
 * create an instance of this fragment.
 */
public class Transportation extends Fragment implements LocationListener {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private LocationManager locationManager;
    private Location onlyOneLocation;
    private final int REQUEST_FINE_LOCATION = 1234;

    public Transportation() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment Transportation.
     */
    // TODO: Rename and change types and number of parameters
    public static Transportation newInstance(String param1, String param2) {
        Transportation fragment = new Transportation();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View root = inflater.inflate(R.layout.fragment_transportation, container, false);

        if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED)
            ActivityCompat.requestPermissions(getActivity(), new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, REQUEST_FINE_LOCATION);
        else {
            locationManager = (LocationManager) getContext().getSystemService(Context.LOCATION_SERVICE);
            locationManager.requestLocationUpdates("gps", 0, 0, this);
        }


        ArrayList<TransportLoc> tlist = new ArrayList<>();
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        db.collection("Transport").get().addOnSuccessListener(new OnSuccessListener<QuerySnapshot>() {
            @Override
            public void onSuccess(QuerySnapshot queryDocumentSnapshots) {
                for (QueryDocumentSnapshot doc : queryDocumentSnapshots) {
                    TransportLoc obj = new TransportLoc();
                    obj.setName(doc.getString("name"));
                    GeoPoint gp = doc.getGeoPoint("location");
                    obj.setLatitude(gp.getLatitude());
                    obj.setLongitude(gp.getLongitude());
                    Location l = new Location("");
                    l.setLatitude(gp.getLatitude());
                    l.setLongitude(gp.getLongitude());
                    Log.d("abcd",""+obj.getLatitude()+"-"+obj.getLongitude());
                    if (onlyOneLocation == null) {
                        onlyOneLocation = new Location("");
                        onlyOneLocation.setLongitude(12.99153938683669);
                        onlyOneLocation.setLongitude(78.23376948953519);
                    }

                    obj.setDistanceMeters(Math.round(l.distanceTo(onlyOneLocation)/10000));

                    tlist.add(obj);
                }

                Collections.sort(tlist, new Comparator<TransportLoc>() {
                    @Override
                    public int compare(TransportLoc o1, TransportLoc o2) {
                        return Double.valueOf(o1.getDistanceMeters()).compareTo(Double.valueOf(o2.getDistanceMeters()));
                    }
                });

                RecyclerView recyclerView = root.findViewById(R.id.transportation_rv);
                recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
                recyclerView.setAdapter(new TransporationAdapter(getContext(), tlist));
            }
        });

        return root;
    }


    @Override
    public void onLocationChanged(Location location) {
        onlyOneLocation = location;
        locationManager.removeUpdates(this);
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        switch (requestCode) {
            case REQUEST_FINE_LOCATION:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Log.d("gps", "Location permission granted");
                    try {
                        locationManager = (LocationManager) getContext().getSystemService(Context.LOCATION_SERVICE);
                        locationManager.requestLocationUpdates("gps", 0, 0, this);
                    } catch (SecurityException ex) {
                        Log.d("gps", "Location permission did not work!");
                    }
                }
                break;
        }
    }
}