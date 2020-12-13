package dscwow.mysurutourism.ui.gallery;

import android.net.wifi.hotspot2.pps.HomeSp;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import dscwow.mysurutourism.R;

import static android.widget.Toast.LENGTH_SHORT;

public class GalleryFragment extends Fragment {

    FirebaseFirestore db = FirebaseFirestore.getInstance();
    EditText desc, email, name, phone, place;
    Button submit;

    public boolean emailValidator(String email)
    {
        Pattern pattern;
        Matcher matcher;
        final String EMAIL_PATTERN = "^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
        pattern = Pattern.compile(EMAIL_PATTERN);
        matcher = pattern.matcher(email);
        return matcher.matches();
    }
    public boolean isValidMobile(String phone) {
        if(!Pattern.matches("[a-zA-Z]+", phone)) {
            return phone.length() > 6 && phone.length() <= 13;
        }
        return false;
    }
    public boolean valid(String desc, String email, String name, String phone, String place)
    {
        if(desc.isEmpty() || email.isEmpty() || name.isEmpty() || phone.isEmpty() || place.isEmpty())
        {
            Toast.makeText(getActivity(), "No field should be blank", LENGTH_SHORT).show();
            return false;
        }
        else if(!emailValidator(email))
        {
            Toast.makeText(getActivity(), "Email Invalid", LENGTH_SHORT).show();
            return false;
        }
        else if(!isValidMobile(phone))
        {
            Toast.makeText(getActivity(), "Phone Number Invalid", LENGTH_SHORT).show();
            return false;
        }
        return true;
    }
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        getActivity().getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);

        View root = inflater.inflate(R.layout.fragment_volunteer_form, container, false);
        desc  = root.findViewById(R.id.text_description);
        email = root.findViewById(R.id.text_email);
        name = root.findViewById(R.id.text_name);
        phone = root.findViewById(R.id.text_phone);
        place = root.findViewById(R.id.text_place);
        submit = root.findViewById(R.id.submit);




        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(!valid(desc.getText().toString(),email.getText().toString(),name.getText().toString(),phone.getText().toString(),place.getText().toString()))
                {
                    return;
                }
                Map<String,String> volunteer = new HashMap<>();
                volunteer.put("description",desc.getText().toString());
                volunteer.put("email",email.getText().toString());
                volunteer.put("name",name.getText().toString());
                volunteer.put("phone",phone.getText().toString());
                volunteer.put("place",place.getText().toString());
                db.collection("volunteers").add(volunteer).addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                    @Override
                    public void onSuccess(DocumentReference documentReference) {
                        Toast.makeText(getActivity(), "Your information was stored successfully", LENGTH_SHORT).show();
                        desc.setText("");
                        email.setText("");
                        name.setText("");
                        phone.setText("");
                        place.setText("");
                    }
                });
            }
        });




        return root;
    }
}