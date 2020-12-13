package dscwow.mysurutourism.ui.volunteerList;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;

import dscwow.mysurutourism.R;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link VolunteerList#newInstance} factory method to
 * create an instance of this fragment.
 */
public class VolunteerList extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public VolunteerList() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment VolunteerList.
     */
    // TODO: Rename and change types and number of parameters
    public static VolunteerList newInstance(String param1, String param2) {
        VolunteerList fragment = new VolunteerList();
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
        View root =  inflater.inflate(R.layout.fragment_volunteer_list, container, false);

        FirebaseFirestore db = FirebaseFirestore.getInstance();

        ArrayList<Volunteer> vlist = new ArrayList<>();
        db.collection("volunteers").get().addOnSuccessListener(new OnSuccessListener<QuerySnapshot>() {
            @Override
            public void onSuccess(QuerySnapshot queryDocumentSnapshots) {
                for(QueryDocumentSnapshot doc : queryDocumentSnapshots)
                {
                    Volunteer v = new Volunteer();
                    v.setName(doc.getString("name"));
                    v.setEmail(doc.getString("email"));
                    v.setPhone(doc.getString("phone"));
                    v.setDescription(doc.getString("description"));
                    v.setPlace(doc.getString("place"));
                    vlist.add(v);
                }
                RecyclerView recyclerView = root.findViewById(R.id.rvlist);
                recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
                recyclerView.setAdapter(new MyRecyclerViewAdapter(getContext(),vlist));

            }
        });


        return root;
    }
}