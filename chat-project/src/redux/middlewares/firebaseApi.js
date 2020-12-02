import * as actionTypes from "../consts/action-types";
import firebase from "../../../firebase";

import {
    initReceiveDataFromFirebase,
    addObjToFirebaseCollection
} from "./utils/firebase"

// @link:https://www.youtube.com/watch?v=DqWiuvuK_78 30th minute
//https://github.com/500tech/middleware-lecture
const firebaseApi = ({getState,dispatch}) => next => action => {
    const apiActions = [
        actionTypes.USER_SIGN_UP,
        actionTypes.USER_SIGN_IN,
        actionTypes.CREATE_ROOM,
        actionTypes.SET_ACTIVE_ROOM,
        actionTypes.RECEIVED_MESSAGE
    ];

    if ( !apiActions.includes(action.type)) {
        return next(action);
    }

    switch(action.type) {
        case actionTypes.USER_SIGN_UP:
        case actionTypes.USER_SIGN_IN: {
            initReceiveDataFromFirebase(dispatch);
            return next(action);
        }

        case actionTypes.CREATE_ROOM:
        case actionTypes.RECEIVED_MESSAGE: {
            const {collection, ...data} = action.payload;
            return addObjToFirebaseCollection(action.payload.collection, data);
            // store will be updated by firestore update
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

        default:
            return;
    }
}

export default firebaseApi;