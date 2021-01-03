import * as actionTypes from "../consts/action-types";
import {firebase} from "../../../firebase";
import {getUpdateProfileData} from "./utils/profile";

const auth = ({dispatch}) => next => action => {
    const authActions = [
        actionTypes.UPDATE_PROFILE_FIELDS,
        actionTypes.REMOVE_PROFILE_PICTURE,
    ];

    if ( !authActions.includes(action.type)) {
        return next(action);
    }

    switch(action.type) {
        case actionTypes.UPDATE_PROFILE_FIELDS: {
            // 1) update firebase.auth().currentUser displayName/photoURL - V
            // 2) update current user in users table with new displayName/photoUrl, -V
            // 3) update current user in session, - V
            // 4) update displayName/photoUrl in messages where userId === curUserId - V
            // 5) update users reducer with updated userDoc - V
            //  country and updatedTime.

            const {
                authUserData,
                userData,
                messageData,
                errorAction,
            } = getUpdateProfileData(action);

            /** TODO! FIX! after refresh on /profile page,
             * firebase is unavailable.
             */
            let currentUser = null;
            let authUid = null;

            return Promise.resolve()
                .then( () => {
                    currentUser = firebase.auth().currentUser;
                    authUid = currentUser.uid;
                })
                .then(() => {
                    return currentUser.updateProfile(authUserData)
                })
                .then(function () {
                    // Update successful.
                    console.log("updateProfile successful.");
                    return firebase.firestore().collection("users")
                        .doc(authUid).update(userData)
                })
                .then(() => {
                    // 4) update displayName in messages where userId === curUserId
                    let messagesQuery = firebase.firestore().collection("messages")
                        .where("userId", "==", authUid);
                    return messagesQuery.get();
                })
                .then((querySnapshot) => {
                    let batch = firebase.firestore().batch();
                    querySnapshot.forEach((messageDoc) => {
                        console.log(messageDoc.id, " => ", messageDoc.data());
                        return batch.update(messageDoc.ref, messageData);
                    });
                    // assuming batch size is less than 500/ max by docs.
                    return batch.commit();
                })
                .then( () => {
                    return firebase.firestore().collection("users")
                        .doc(authUid).get()
                })
                .then((userDoc) => {
                    action.meta = {
                        userDoc: userDoc.data(),
                    }
                    return next(action);
                })
                .catch((error) => {
                    console.log(`UPDATE PROFILE FIELDS/PICTURE failed!`);
                    console.log(error);
                    return dispatch(errorAction(error.message));
                })
        }
        // 1) update firebase.auth().currentUser displayName/photoURL - V
        // 1.1) remove current users profile image from storage
        // 2) update current user in users table with new displayName/photoUrl, -V
        // 3) update current user in session, - V
        // 4) update displayName/photoUrl in messages where userId === curUserId - V
        // 5) update users reducer with updated userDoc - V
        //  country and updatedTime.
        case actionTypes.REMOVE_PROFILE_PICTURE: {

            const {
                authUserData,
                userData,
                messageData,
                errorAction,
            } = getUpdateProfileData(action);

            let currentUser = null;
            let authUid = null;
            let currentPhoto = null;

            return Promise.resolve()
                .then( () => {
                    // if fails - error is thrown and errorAction is dispatched.
                    currentUser = firebase.auth().currentUser;
                    authUid = currentUser.uid;
                    currentPhoto = currentUser.photoURL;
                })
                .then( () => {
                    debugger
                    // const filePath = `users/${authUid}/3d-eggplant.png`;
                    // return firebase.storage().ref(filePath).delete();

                    // Create a reference from an HTTPS URL
                    // Note that in the URL, characters are URL escaped!
                    let httpsReference = firebase.storage().refFromURL(currentPhoto);
                    return httpsReference.delete();
                })
                .then(() => {
                    return currentUser.updateProfile(authUserData)
                })
                .then(function () {
                    // Update successful.
                    console.log("updateProfile successful.");
                    return firebase.firestore().collection("users")
                        .doc(authUid).update(userData)
                })
                .then(() => {
                    // 4) update displayName in messages where userId === curUserId
                    let messagesQuery = firebase.firestore().collection("messages")
                        .where("userId", "==", authUid);
                    return messagesQuery.get();
                })
                .then((querySnapshot) => {
                    let batch = firebase.firestore().batch();
                    querySnapshot.forEach((messageDoc) => {
                        console.log(messageDoc.id, " => ", messageDoc.data());
                        return batch.update(messageDoc.ref, messageData);
                    });
                    // assuming batch size is less than 500/ max by docs.
                    return batch.commit();
                })
                .then( () => {
                    return firebase.firestore().collection("users")
                        .doc(authUid).get()
                })
                .then((userDoc) => {
                    action.meta = {
                        userDoc: userDoc.data(),
                    }
                    return next(action);
                })
                .catch((error) => {
                    console.log(`UPDATE PROFILE FIELDS/PICTURE failed!`);
                    console.log(error);
                    return dispatch(errorAction(error.message));
                })
        }

        case actionTypes.UPDATE_PROFILE_PICTURE: {
            // 1) update firebase.auth().currentUser displayName/photoURL - V
            // 2) update current user in users table with new displayName/photoUrl, -V
            // 3) update current user in session, - V
            // 4) update displayName/photoUrl in messages where userId === curUserId - V
            // 5) update users reducer with updated userDoc - V
            //  country and updatedTime.

            const {
                authUserData,
                userData,
                messageData,
                errorAction,
            } = getUpdateProfileData(action);

            /** TODO! FIX! after refresh on /profile page,
             * firebase is unavailable.
             */
            let currentUser = null;
            let authUid = null;

            return Promise.resolve()
                .then( () => {
                    currentUser = firebase.auth().currentUser;
                    authUid = currentUser.uid;
                })
                .then(() => {
                    return currentUser.updateProfile(authUserData)
                })
                .then(function () {
                    // Update successful.
                    console.log("updateProfile successful.");
                    return firebase.firestore().collection("users")
                        .doc(authUid).update(userData)
                })
                .then(() => {
                    // 4) update displayName in messages where userId === curUserId
                    let messagesQuery = firebase.firestore().collection("messages")
                        .where("userId", "==", authUid);
                    return messagesQuery.get();
                })
                .then((querySnapshot) => {
                    let batch = firebase.firestore().batch();
                    querySnapshot.forEach((messageDoc) => {
                        console.log(messageDoc.id, " => ", messageDoc.data());
                        return batch.update(messageDoc.ref, messageData);
                    });
                    // assuming batch size is less than 500/ max by docs.
                    return batch.commit();
                })
                .then( () => {
                    return firebase.firestore().collection("users")
                        .doc(authUid).get()
                })
                .then((userDoc) => {
                    action.meta = {
                        userDoc: userDoc.data(),
                    }
                    return next(action);
                })
                .catch((error) => {
                    console.log(`UPDATE PROFILE FIELDS/PICTURE failed!`);
                    console.log(error);
                    return dispatch(errorAction(error.message));
                })
        }

        default:
            return;
    }
}

export default auth;