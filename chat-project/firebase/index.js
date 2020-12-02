// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBG60kusZLkAyfhyjgR7H0RpGZ64VWaJag",
    authDomain: "redux-ynonp-chat-project.firebaseapp.com",
    databaseURL: "https://redux-ynonp-chat-project.firebaseio.com",
    projectId: "redux-ynonp-chat-project",
    storageBucket: "redux-ynonp-chat-project.appspot.com",
    messagingSenderId: "1033997878027",
    appId: "1:1033997878027:web:3fb10e89789381be22580e"
};
firebase.initializeApp(firebaseConfig);

export {firebaseConfig};
export default firebase;
