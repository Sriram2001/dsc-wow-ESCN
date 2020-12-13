package dscwow.mysurutourism.ui.transport;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.text.Html;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import dscwow.mysurutourism.R;
import dscwow.mysurutourism.ui.volunteerList.Volunteer;

public class TransporationAdapter extends RecyclerView.Adapter<TransporationAdapter.ViewHolder> {

    private ArrayList<TransportLoc> mData;
    private LayoutInflater mInflater;
    Context context;

    TransporationAdapter(Context context, ArrayList<TransportLoc> data) {
        this.context = context;
        this.mInflater = LayoutInflater.from(context);
        this.mData = data;
    }


    @NonNull
    @Override
    public TransporationAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.transportation_recycler, parent, false);
        return new TransporationAdapter.ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
            holder.name.setText(mData.get(position).getName().toString());
            holder.dist.setText(""+mData.get(position).getDistanceMeters() + "km");
            holder.gmap.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    String uri = String.format(Locale.ENGLISH, "http://maps.google.com/maps?daddr=%f,%f (%s)", mData.get(position).getLatitude(), mData.get(position).getLongitude(), mData.get(position).getName());
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
                    intent.setPackage("com.google.android.apps.maps");
                    context.startActivity(intent);
                }
            });
    }





    @Override
    public int getItemCount() {
        return mData.size();
    }


    // stores and recycles views as they are scrolled off screen
    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView name, dist;
        ImageView gmap;
        ViewHolder(View itemView) {
            super(itemView);
            name = itemView.findViewById(R.id.tname);
            dist = itemView.findViewById(R.id.tdist);
            gmap = itemView.findViewById(R.id.gmap);
        }


    }


}