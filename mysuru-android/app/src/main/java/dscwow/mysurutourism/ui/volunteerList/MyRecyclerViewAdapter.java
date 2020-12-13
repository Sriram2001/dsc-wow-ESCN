package dscwow.mysurutourism.ui.volunteerList;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.text.Html;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import dscwow.mysurutourism.R;

public class MyRecyclerViewAdapter extends RecyclerView.Adapter<MyRecyclerViewAdapter.ViewHolder> {

    private ArrayList<Volunteer> mData;
    private LayoutInflater mInflater;
    Context context;

    MyRecyclerViewAdapter(Context context, ArrayList<Volunteer> data) {
        this.context = context;
        this.mInflater = LayoutInflater.from(context);
        this.mData = data;
    }


    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.volunteer_list_recycler, parent, false);
        return new ViewHolder(view);
    }

    // binds the data to the TextView in each row
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Log.d("omething","cometh oo lord");
        Volunteer volunteer = mData.get(position);
        String src1 = "<b>"+"Name - "+"</b>"+volunteer.getName();
        String src2 = "<b>"+"Phone - "+"</b>"+volunteer.getPhone();
        String src3 = "<b>"+"Place - "+"</b>"+volunteer.getPlace();
        String src4 = "<b>"+"Description - "+"</b>"+volunteer.getDescription();
        String src5 = "<b>"+"Email - "+"</b>"+volunteer.getEmail();
        holder.name.setText(Html.fromHtml(src1));
        holder.phone.setText(Html.fromHtml(src2));
        holder.place.setText(Html.fromHtml(src3));
        holder.desc.setText(Html.fromHtml(src4));
        holder.email.setText(Html.fromHtml(src5));

        holder.phone.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_DIAL);
                intent.setData(Uri.parse("tel:"+volunteer.getPhone()));
                context.startActivity(intent);
            }
        });

        holder.layout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.isVis = !holder.isVis;
                if(holder.isVis)
                {
                    holder.desc.setVisibility(View.VISIBLE);
                    holder.place.setVisibility(View.VISIBLE);
                }
                else
                {
                    holder.desc.setVisibility(View.GONE);
                    holder.place.setVisibility(View.GONE);
                }
            }
        });
    }



    @Override
    public int getItemCount() {
        Log.d("omething","asd"+mData.size());
        return mData.size();
    }


    // stores and recycles views as they are scrolled off screen
    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView name, phone, email, desc, place;
        ConstraintLayout layout;
        boolean isVis;
        ViewHolder(View itemView) {
            super(itemView);
            name = itemView.findViewById(R.id.vname);
            phone = itemView.findViewById(R.id.vphone);
            email = itemView.findViewById(R.id.vemail);
            desc = itemView.findViewById(R.id.vdesc);
            place = itemView.findViewById(R.id.vabout);
            layout = itemView.findViewById(R.id.clickable_volunteer_list_layout);
            isVis = false;
        }


    }


}