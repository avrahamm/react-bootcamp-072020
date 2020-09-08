// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/firestore");

function initFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyBG60kusZLkAyfhyjgR7H0RpGZ64VWaJag",
        authDomain: "redux-ynonp-chat-project.firebaseapp.com",
        databaseURL: "https://redux-ynonp-chat-project.firebaseio.com",
        projectId: "redux-ynonp-chat-project",
        storageBucket: "redux-ynonp-chat-project.appspot.com",
        messagingSenderId: "1033997878027",
        appId: "1:1033997878027:web:3fb10e89789381be22580e"
    };

// Initialize Firebase with a "default" Firebase project
    firebase.initializeApp(firebaseConfig);
}

function sendRoomsToFirebase() {
    const initialRooms = [
        'Loby','JavaScript Chats','Java Chats',
        'Python Chats', 'Coffee room','Chess fans',
    ];

    const rooms = firebase.firestore().collection('rooms');
    const users = firebase.firestore().collection('users');
    initialRooms.forEach( ( name, index) => {
        return rooms.add({ name})
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                const username = `user${Math.floor(Math.random()*100*(index + 1))}`;
                const roomId = docRef.id;
                const active = Math.random()*10 > 5;
                return users.add(
                    {name: username, roomId, active},
                )
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
    } )
}

initFirebase();
sendRoomsToFirebase();
