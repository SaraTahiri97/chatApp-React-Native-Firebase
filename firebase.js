
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
//import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBGMWD_dj3mepEF06sEJO8a1B7r5Flg6ao",
    authDomain: "chatapp-f6f56.firebaseapp.com",
    projectId: "chatapp-f6f56",
    storageBucket: "chatapp-f6f56.appspot.com",
    messagingSenderId: "351767698542",
    appId: "1:351767698542:web:0448b202e8740a72e91a7f"
};
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);

} else {
    app = firebase.app()
}
const db = app.firestore();
const auth = firebase.auth();
export { db, auth }