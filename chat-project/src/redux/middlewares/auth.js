import * as actionTypes from "../consts/action-types";
import * as actions from "../actions";
import firebase from "../../../firebase";

const auth = ({dispatch}) => next => action => {
    const authActions = [
        actionTypes.USER_SIGN_UP,
        actionTypes.USER_SIGN_IN,
        actionTypes.USER_SIGN_OUT,
        actionTypes.RESET_USER_PASSWORD,
        actionTypes.SET_CURRENT_USER,
    ];

    if ( !authActions.includes(action.type)) {
        return next(action);
    }

    switch(action.type) {
        case actionTypes.FIREBASE_INIT: {
            firebase.auth().onAuthStateChanged(function(user) {
                dispatch(actions.setCurrentUser(user));
            });
            return;
        }

        case actionTypes.SET_CURRENT_USER: {
            if ( Boolean(action.payload.user)) {
                sessionStorage.setItem("currentUser", JSON.stringify(action.payload.user));
            }
            else {
                sessionStorage.removeItem("currentUser");
            }
            return next(action);
        }

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
                    })
                })
                .then(function () {
                    // Update successful.
                    console.log("updateProfile successful.");
                    const curUserId = firebase.auth().currentUser.uid;
                    return firebase.firestore().collection("users").doc(curUserId).set({
                            id:curUserId,
                            name: username,
                            active: true,
                            roomId: null,
                            imgUrl: "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg",
                        })
                    })
                .then(() => {
                    return dispatch(actions.setCurrentUser(firebase.auth().currentUser));
                })
                .catch((error) => {
                    console.log(`Sign up failed`);
                    console.log(error);
                    return dispatch(actions.userSignUpError(error.message))
                })
        }

        case actionTypes.USER_SIGN_IN: {
            const {email, password} = action.payload;
            return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .then( () => {
                    return firebase.auth().signInWithEmailAndPassword(email, password);
                })
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
                    return dispatch(actions.setCurrentUser(firebase.auth().currentUser));
                })
                .catch((error) => {
                    console.log(`Sign in failed`);
                    console.log(error);
                    return dispatch(actions.userSignInError(error.message));
                });
        }

        case actionTypes.USER_SIGN_OUT: {
            return Promise.resolve()
                .then( () => {
                    const authUid = firebase.auth().currentUser.uid;
                    let userRef = firebase.firestore().collection('users').doc(authUid);
                    return userRef.set({
                        active: false
                    }, {merge: true})
                })
                .then(() => {
                    return firebase.auth().signOut()
                })
                .then(() => {
                    // Sign out
                    console.log("Signed out");
                    return dispatch(actions.setCurrentUser(null));
                })
                .catch((error) => {
                    console.log(error);
                    return dispatch(actions.setCurrentUser(null));
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

        default:
            return;
    }
}

export default auth;