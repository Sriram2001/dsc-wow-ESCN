

import  firebase from "../Components/Firebase/firebase"


const PlacesService = {

    getuser: function() {
        const db = firebase.firestore();
        return db.collection('places').get();
      
    }
};


export default PlacesService

     