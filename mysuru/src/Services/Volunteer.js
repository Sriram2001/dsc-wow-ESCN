import firebase from "../Components/Firebase/firebase"


const VolunteerService = {
    adduser: function (params) {
        console.log(params)
        const db = firebase.firestore();
        return db.collection("volunteers").add({
            email: params.email,
            name: params.firstname + " " + params.lastname,
            place: params.place,
            phone: params.phone,
            description: params.description
        })
    },
    getuser: function () {
        const db = firebase.firestore();

        return db.collection('volunteers').get(data => {
            console.log(data);
        })
    }
};


export default VolunteerService





