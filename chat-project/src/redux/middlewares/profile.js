import * as actionTypes from "../consts/action-types";
import {defaultNoPicImage, firebase} from "../../../firebase";
import {getUpdateProfileData} from "./utils/profile";
import * as actions from "../actions";

const auth = ({dispatch}) => next => action => {
    const authActions = [
        actionTypes.UPDATE_PROFILE_FIELDS,
        actionTypes.REMOVE_PROFILE_PICTURE,
        actionTypes.UPDATE_PROFILE_PICTURE,
    ];

    if ( !authActions.includes(action.type)) {
        return next(action);
    }

    /**
     * Common steps, each case adapts for himself.
     * There is code repetition of code very similar for each case, yet with specific data.
     * Currently, I prefer not to generalize as each case still can demand more specific behaviour.
     *
     * 1.1) upload new file to storage if needed
     * 1.2) get new picture URL
     * 1.3) update firebase.auth().currentUser displayName/photoURL - V
     * 2) update current user in users table with new displayName/photoUrl, -V
     * 3) update current user in session, - V
     * 4) update displayName/photoUrl in messages where userId === curUserId - V
     * 5) delete old file from storage
     * 6) update users reducer with updated userDoc - V
     *      country and updatedTime.
     */
    switch(action.type) {
        case actionTypes.UPDATE_PROFILE_FIELDS: {
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
                    return firebase.firestore().collection("users")
                        .doc(authUid).update(userData)
                })
                .then( () => {
                    return firebase.firestore().collection("users")
                        .doc(authUid).get()
                })
                .then((userDoc) => {
                    // to update session
                    action.meta = {
                        userDoc: userDoc.data(),
                    }
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
                .then(() => {
                    return next(action);
                })
                .catch((error) => {
                    console.log(`UPDATE PROFILE FIELDS/PICTURE failed!`);
                    console.log(error);
                    return dispatch(errorAction(error.message));
                })
        }

        case actionTypes.REMOVE_PROFILE_PICTURE: {

            const {
                authUserData,
                userData,
                messageData,
                errorAction,
            } = getUpdateProfileData(action);

            let currentUser = null;
            let authUid = null;
            let currentPhotoUrl = null;

            return Promise.resolve()
                .then( () => {
                    // if fails - error is thrown and errorAction is dispatched.
                    currentUser = firebase.auth().currentUser;
                    authUid = currentUser.uid;
                    currentPhotoUrl = currentUser.photoURL;
                })
                .then(() => {
                    return currentUser.updateProfile(authUserData)
                })
                .then(function () {
                    return firebase.firestore().collection("users")
                        .doc(authUid).update(userData)
                })
                .then( () => {
                    return firebase.firestore().collection("users")
                        .doc(authUid).get()
                })
                .then((userDoc) => {
                    // to update session
                    action.meta = {
                        userDoc: userDoc.data(),
                    }
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
                    if ( currentPhotoUrl !== defaultNoPicImage ) {
                        let httpsReference = firebase.storage().refFromURL(currentPhotoUrl);
                        return httpsReference.delete();
                    }
                })
                .then(() => {
                    return next(action);
                })
                .catch((error) => {
                    console.log(`UPDATE PROFILE FIELDS/PICTURE failed!`);
                    console.log(error);
                    return dispatch(errorAction(error.message));
                })
        }

        case actionTypes.UPDATE_PROFILE_PICTURE: {
            const { newPicture } = action.payload;
            let currentUser = null;
            let authUid = null;
            let currentPhotoUrl = null;
            let fileSnapshot = null;
            let newPictureUrl = null;

            return Promise.resolve()
                .then( () => {
                    // if fails - error is thrown and errorAction is dispatched.
                    currentUser = firebase.auth().currentUser;
                    authUid = currentUser.uid;
                    currentPhotoUrl = currentUser.photoURL;
                })
                .then( () => {
                    const filePath = `users/${authUid}/${newPicture.name}`;
                    return firebase.storage().ref(filePath).put(newPicture);
                })
                .then(function (fileSnapshotObj) {
                    // 3 - Generate a public URL for the file.
                    fileSnapshot = fileSnapshotObj;
                    return fileSnapshot.ref.getDownloadURL()
                })
                .then((url) => {
                    // 4 - Update the chat message placeholder with the image's URL.
                    newPictureUrl = url;
                    const authUserData = {
                        photoURL: newPictureUrl,
                    }
                    return currentUser.updateProfile(authUserData)
                })
                .then(function () {
                    const userData = {
                        photoUrl: newPictureUrl,
                    };
                    return firebase.firestore().collection("users")
                        .doc(authUid).update(userData)
                })
                .then( () => {
                    return firebase.firestore().collection("users")
                        .doc(authUid).get()
                })
                .then((userDoc) => {
                    // to update session
                    action.meta = {
                        userDoc: userDoc.data(),
                    }
                })
                .then(() => {
                    // 4) update displayName in messages where userId === curUserId
                    let messagesQuery = firebase.firestore().collection("messages")
                        .where("userId", "==", authUid);
                    return messagesQuery.get();
                })
                .then((querySnapshot) => {
                    let batch = firebase.firestore().batch();
                    const messageData = {
                        photoUrl: newPictureUrl,
                    };
                    querySnapshot.forEach((messageDoc) => {
                        return batch.update(messageDoc.ref, messageData);
                    });
                    // assuming batch size is less than 500/ max by docs.
                    return batch.commit();
                })
                .then( () => {
                    if ( currentPhotoUrl !== defaultNoPicImage ) {
                        let httpsReference = firebase.storage().refFromURL(currentPhotoUrl);
                        return httpsReference.delete();
                    }
                })
                .then( () => {
                    return next(action);
                })
                .catch((error) => {
                    console.log(`UPDATE PROFILE ${action.type} failed!`);
                    console.log(error);
                    const errorAction = actions.updateProfilePictureError;
                    return dispatch(errorAction(error.message));
                })
        }

        default:
            return;
    }
}

export default auth;