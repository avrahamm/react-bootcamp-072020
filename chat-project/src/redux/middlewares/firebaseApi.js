import * as actions from "../consts/action-types";
const firebase = window.firebase;

import {
    initReceiveDataFromFirebase,
    addObjToFirebaseCollection
} from "./utils/firebase"

// @link:https://www.youtube.com/watch?v=DqWiuvuK_78 30th minute
//https://github.com/500tech/middleware-lecture
const firebaseApi = ({getState,dispatch}) => next => action => {
    const apiActions = [
        actions.FIREBASE_INIT,
        actions.CREATE_ROOM,
        actions.SET_ACTIVE_ROOM,
        actions.RECEIVED_MESSAGE,
        actions.SET_USERNAME,
        actions.USER_SIGN_UP,
        actions.USER_SIGN_IN,
    ];

    if ( !apiActions.includes(action.type)) {
        return next(action);
    }

    if ( action.type === actions.FIREBASE_INIT ) {
        initReceiveDataFromFirebase(dispatch);
        return;
    }

    switch(action.type) {
        case actions.CREATE_ROOM:
        case actions.SET_USERNAME:
        case actions.RECEIVED_MESSAGE: {
            const {collection, ...data} = action.payload;
            addObjToFirebaseCollection(action.payload.collection, data)
                .then((docId) => {
                    action.meta = {
                        docId
                    }
                    return next(action)
                });
            break;
        }

        case actions.SET_ACTIVE_ROOM: {
            const firebaseCollection = firebase.firestore().collection(action.payload.collection);
            const {collection, ...data} = action.payload;
            const curUserId = getState().users.curUserId;
            let curUserRef = firebaseCollection.doc(curUserId);
            curUserRef.update(data)
                .then(() => next(action))
                .catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            break;
        }

        case actions.USER_SIGN_UP: {
            const {username, email, password} = action.payload;
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    // Signed in
                    console.log(`Signed up!`);
                    const currentUser = firebase.auth().currentUser;
                    return currentUser.updateProfile({
                        displayName: username,
                    })
                })
                .then(function () {
                    // Update successful.
                    console.log("updateProfile successful.");
                    action.meta = {
                        authUid: firebase.auth().currentUser.uid
                    }
                    // temporary, to confirm to existing code
                    action.payload.collection = "users";
                    return addObjToFirebaseCollection(action, {
                        active: true,
                        roomId: null,
                        imgUrl: "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg",
                    })

                })
                .then(() => {
                    return next(action)
                })
                .catch((error) => {
                    console.log(`Sign up failed`);
                    console.log(error);
                    throw error;
                });
            break;
        }

        case actions.USER_SIGN_IN: {
            const {email, password} = action.payload;
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    console.log("Signed in");
                    const authUid = firebase.auth().currentUser.uid;
                    firebase.firestore().collection("users")
                        .where("authUid", "==", authUid)
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                // doc.data() is never undefined for query doc snapshots
                                console.log(doc.id, " => ", doc.data());
                            });
                        })
                    let userRef = firebase.firestore().collection('users').doc(authUid);
                    console.log("userRef = ");
                    console.log(userRef);
                    return userRef.set({
                        active: true
                    }, { merge: true });
                })
                .then(function (userRef) {
                    console.log("userRef = ");
                    console.log(userRef);
                    console.log("Signed in");
                    return next(action)
                })
                .catch((error) => {
                    console.log(`Sign in failed`);
                    console.log(error);
                });
            break;
        }

        default:
            return;
    }
}

export default firebaseApi;