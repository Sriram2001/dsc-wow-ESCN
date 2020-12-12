import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDclPK0yeArOX9HL3ve-4aEhrigvTemY-A",
    authDomain: "mysurutourism-7df77.firebaseapp.com",
    projectId: "mysurutourism-7df77",
    storageBucket: "mysurutourism-7df77.appspot.com",
    messagingSenderId: "728506653788",
    appId: "1:728506653788:web:82a761856f0ab14e381a99",
    measurementId: "G-TMTRW85CB6"
};

firebase.initializeApp(config);
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

export const auth = firebase.auth();
export default firebase;
