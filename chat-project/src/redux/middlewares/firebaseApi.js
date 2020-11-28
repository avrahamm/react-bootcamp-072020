import * as actionTypes from "../consts/action-types";
import * as actions from "../actions";
const firebase = window.firebase;

import {
    initReceiveDataFromFirebase,
    addObjToFirebaseCollection
} from "./utils/firebase"

// @link:https://www.youtube.com/watch?v=DqWiuvuK_78 30th minute
//https://github.com/500tech/middleware-lecture
const firebaseApi = ({getState,dispatch}) => next => action => {
    const apiActions = [
        actionTypes.FIREBASE_INIT,
        actionTypes.CREATE_ROOM,
        actionTypes.SET_ACTIVE_ROOM,
        actionTypes.RECEIVED_MESSAGE,
        actionTypes.USER_SIGN_UP,
        actionTypes.USER_SIGN_IN,
        actionTypes.USER_SIGN_OUT,
    ];

    if ( !apiActions.includes(action.type)) {
        return next(action);
    }

    if ( action.type === actionTypes.FIREBASE_INIT ) {
        initReceiveDataFromFirebase(dispatch);
        return;
    }

    switch(action.type) {
        case actionTypes.CREATE_ROOM:
        case actionTypes.RECEIVED_MESSAGE: {
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

        case actionTypes.SET_ACTIVE_ROOM: {
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

        case actionTypes.USER_SIGN_UP: {
            const {username, email, password} = action.payload;
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
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
                    const authUid = firebase.auth().currentUser.uid;
                    return firebase.firestore().collection("users").doc(authUid).set({
                            authUid,
                            displayName: username,
                            active: true,
                            roomId: null,
                            imgUrl: "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg",
                        })
                    })
                .then(() => {
                    return dispatch(actions.setCurrentUserId(firebase.auth().currentUser.uid))
                })
                .catch((error) => {
                    console.log(`Sign up failed`);
                    console.log(error);
                    return dispatch(actions.userSignUpError(error.message))
                })
            break;
        }

        case actionTypes.USER_SIGN_IN: {
            const {email, password} = action.payload;
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    // throw({message: "Test error"});
                    console.log("Signed in");
                    const authUid = firebase.auth().currentUser.uid;
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
                    return dispatch(actions.setCurrentUserId(firebase.auth().currentUser.uid))
                })
                .catch((error) => {
                    console.log(`Sign in failed`);
                    console.log(error);
                    return dispatch(actions.userSignInError(error.message));
                });
            break;
        }

        case actionTypes.USER_SIGN_OUT: {
            const authUid = firebase.auth().currentUser.uid;
            let userRef = firebase.firestore().collection('users').doc(authUid);
            userRef.set({
                active: false
            }, {merge: true})
                .then(() => {
                    return firebase.auth().signOut()
                })
                .then(() => {
                    // Sign out
                    console.log("Signed out");
                    dispatch(actions.setCurrentUserId(null));
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(actions.setCurrentUserId(null));
                })
            break;
        }


        case actionTypes.RESET_USER_PASSWORD: {
            const auth = firebase.auth();
            const {email} = action.payload;
            auth.sendPasswordResetEmail(email).then(function() {
                    console.log("Reset Email sent.");
                    return next(action);
                })
                .catch(function(error) {
                    return dispatch(actions.resetUserPasswordError(error.message));
            });
            break;
        }

        default:
            return;
    }
}

export default firebaseApi;