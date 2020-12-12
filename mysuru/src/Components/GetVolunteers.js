

import VolunteerService from "../Services/Volunteer"

export default function GetVolunteers() {


    const volunteer_list = [];
    const volunteer_list_id = []

    VolunteerService.getuser().then((snapshot) => {
        snapshot.forEach(doc=>{
            
            volunteer_list.push(doc.data());
            volunteer_list_id.push(doc.id);
    })
    console.log(volunteer_list);
    console.log(volunteer_list_id)
    
    })

    return (
    null
    )
}


