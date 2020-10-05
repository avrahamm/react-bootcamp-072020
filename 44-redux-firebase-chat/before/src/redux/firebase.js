import * as firebaseModule from 'firebase';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBCBkcVvH98qk8TbcQ8s0o7cl0ie3kAY4",
    authDomain: "my-redux-chat-lesson44.firebaseapp.com",
    databaseURL: "https://my-redux-chat-lesson44.firebaseio.com",
    projectId: "my-redux-chat-lesson44",
    storageBucket: "my-redux-chat-lesson44.appspot.com",
    messagingSenderId: "595026916507",
    appId: "1:595026916507:web:79a1b7efce40721a98023e"
};
// Initialize Firebase
const firebase = firebaseModule.initializeApp(firebaseConfig);
export default firebase;
