import * as actionTypes from "../consts/action-types";
import * as actions from "../actions";
import { firebase, defaultNoPicImage } from "../../../firebase";

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
            // 1) update firebase.auth().currentUser displayName - V
            // 2) update current user in users table with new displayName, -V
            // 3) update current user in session, - V
            // 4) update displayName in messages where userId === curUserId - V
            // 5) update users reducer with updated fields - V
            //  country and updatedTime.

            const {displayName, country, updatedTime,} = action.payload;
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
                    return currentUser.updateProfile({
                        displayName,
                    })
                })
                .then(function () {
                    // Update successful.
                    console.log("updateProfile successful.");
                    return firebase.firestore().collection("users")
                        .doc(authUid).update({
                            displayName,
                            country,
                            updatedTime,
                    })
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
                        return batch.update(messageDoc.ref, {displayName});
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
                        currentUser: firebase.auth().currentUser,
                        userDoc: userDoc.data(),
                    }
                    return next(action);
                })
                .catch((error) => {
                    console.log(`UPDATE_PROFILE_FIELDS failed!`);
                    console.log(error);
                    return dispatch(actions.updateProfileFieldsError(error.message));
                })
        }
        case actionTypes.REMOVE_PROFILE_PICTURE: {
            // 1) update firebase.auth().currentUser photoURL - V
            // 2) update current user in users table with new photoURL, -V
            // 3) update displayName in messages where userId === curUserId - V
            // 4) update authUser reducer with updated fields - V
            // 3) update current user in session, - V
            //  country and updatedTime.
            let currentUser = null;
            let authUid = null;

            return Promise.resolve()
                .then( () => {
                    currentUser = firebase.auth().currentUser;
                    authUid = currentUser.uid;
                })
                .then(() => {
                    return currentUser.updateProfile({
                        photoURL: defaultNoPicImage,
                    })
                })
                .then(function () {
                    // Update successful.
                    console.log("updateProfile successful.");
                    return firebase.firestore().collection("users")
                        .doc(authUid).update({
                            photoUrl: defaultNoPicImage,
                        })
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
                        return batch.update(messageDoc.ref, {photoUrl: defaultNoPicImage,});
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
                        photoUrl: defaultNoPicImage,
                    }
                    return next(action);
                })
                .catch((error) => {
                    console.log(`REMOVE_PROFILE_PICTURE failed!`);
                    console.log(error);
                    return dispatch(actions.updateProfilePictureError(error.message));
                })
        }
        default:
            return;
    }
}

export default auth;