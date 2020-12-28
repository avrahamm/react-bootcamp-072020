import * as actionTypes from "../consts/action-types";
import * as actions from "../actions";
import firebase from "../../../firebase";

const auth = ({dispatch}) => next => action => {
    const authActions = [
        actionTypes.USER_SIGN_UP,
        actionTypes.USER_SIGN_IN,
        actionTypes.USER_SIGN_OUT,
        actionTypes.RESET_USER_PASSWORD,
        actionTypes.UPDATE_PROFILE_FIELDS,
    ];

    if ( !authActions.includes(action.type)) {
        return next(action);
    }

    switch(action.type) {
        case actionTypes.USER_SIGN_UP: {
            const {username, email, password} = action.payload;
            return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .then( () => {
                    return firebase.auth().createUserWithEmailAndPassword(email, password)
                })
                .then(() => {
                    // Signed in
                    console.log(`Signed up!`);
                    const currentUser = firebase.auth().currentUser;
                    return currentUser.updateProfile({
                        displayName: username,
                        // TODO! Temporary image, apply firebase storage
                        photoURL: "https://firebasestorage.googleapis.com/v0/b/redux-ynonp-chat-project.appspot.com/o/no-pic1.webp?alt=media&token=da1d7f5e-e3b7-476d-9e14-62b4a76fb432"
                    })
                })
                .then(function () {
                    // Update successful.
                    console.log("updateProfile successful.");
                    const currentUser = firebase.auth().currentUser;
                    const authUid = currentUser.uid;
                    return firebase.firestore().collection("users").doc(authUid).set({
                            uid: authUid,
                            displayName: username,
                            active: true,
                            roomId: null,
                            photoUrl: currentUser.photoURL,
                            country: "",
                        })
                    })
                .then( () => {
                    const currentUser = firebase.auth().currentUser;
                    const authUid = currentUser.uid;
                    return firebase.firestore().collection("users")
                        .doc(authUid).get()
                })
                .then((userDoc) => {
                    console.log("userDoc = ", userDoc);
                    console.log("userDoc.data() = ", userDoc.data());
                    action.meta = {
                        currentUser: firebase.auth().currentUser,
                        userDoc: userDoc.data(),
                    }
                    return next(action);
                })
                .catch((error) => {
                    console.log(`Sign up failed`);
                    console.log(error);
                    return dispatch(actions.userSignUpError(error.message))
                })
        }

        case actionTypes.USER_SIGN_IN: {
            let userRef = null;
            const {email, password} = action.payload;
            return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .then( () => {
                    return firebase.auth().signInWithEmailAndPassword(email, password);
                })
                .then(() => {
                    // throw({message: "Test error"});
                    console.log("Signed in");
                    const authUid = firebase.auth().currentUser.uid;
                    userRef = firebase.firestore().collection('users').doc(authUid);
                    return userRef.set({
                        active: true,
                        roomId: null
                    }, { merge: true });
                })
                .then( () => {
                    return userRef.get()
                })
                .then(function(userDoc) {
                    // console.log("userDoc.data() = ", userDoc.data());
                    action.meta = {
                        currentUser: firebase.auth().currentUser,
                        userDoc: userDoc.data(),
                    }
                    return next(action);
                })
                .catch((error) => {
                    console.log(`Sign in failed`);
                    console.log(error);
                    return dispatch(actions.userSignInError(error.message));
                });
        }

        case actionTypes.USER_SIGN_OUT: {
            const authUid = action.payload.curUserId;
            let userRef = firebase.firestore().collection('users').doc(authUid);
            return userRef.set({
                active: false,
                roomId: null
            }, {merge: true})
                .then( () => {
                    let userRef = firebase.firestore().collection('users').doc(authUid);
                    return userRef.set({
                        active: false,
                        roomId: null
                    }, {merge: true})
                })
                .then(() => {
                    return firebase.auth().signOut()
                })
                .then(() => {
                    // Sign out
                    console.log("Signed out");
                    return next(action);
                })
                .catch((error) => {
                    console.log(error);
                    return dispatch(actions.userSignOutError(error.message));
                })
        }


        case actionTypes.RESET_USER_PASSWORD: {
            const auth = firebase.auth();
            const {email} = action.payload;
            return auth.sendPasswordResetEmail(email)
                .then(function() {
                    console.log("Reset Email sent.");
                    return next(action);
                })
                .catch(function(error) {
                    return dispatch(actions.resetUserPasswordError(error.message));
            });
        }

        case actionTypes.UPDATE_PROFILE_FIELDS: {
            // 1) update firebase.auth().currentUser displayName
            // 2) update current user in users table with new displayName,
            // 3) update displayName in messages where userId === curUserId
            // 4) update users reducer with updated fields
            //  country and updatedTime.
            const {displayName, country, updatedTime,} = action.payload;
            const currentUser = firebase.auth().currentUser;
            return currentUser.updateProfile({
                displayName,
            })
                .then(function () {
                    // Update successful.
                    console.log("updateProfile successful.");
                    const authUid = currentUser.uid;
                    return firebase.firestore().collection("users")
                        .doc(authUid).set({
                            displayName,
                            country,
                            updatedTime,
                    }, { merge: true })
                })
                // .then(() => {
                //     // 4) update users reducer with updated fields
                //     return next(action);
                // })
                .catch((error) => {
                    console.log(`UPDATE_PROFILE_FIELDS failed!`);
                    console.log(error);
                    // return dispatch(actions.userSignUpError(error.message))
                })
        }
        default:
            return;
    }
}

export default auth;