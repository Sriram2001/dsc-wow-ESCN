import PlacesService from "../Services/Places"

export default function GetVolunteers() {


    const places_list = [];
    const places_id = []

    VolunteerService.getuser().then((snapshot) => {
        snapshot.forEach(doc=>{
            
            places_list.push(doc.data());
            places_id.push(doc.id);
    })
    console.log(places_list);
    console.log(places_id)
    })

    return (
    null
    )
}