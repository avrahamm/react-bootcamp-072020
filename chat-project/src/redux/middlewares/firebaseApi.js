import * as actions from "../consts/action-types";
const firebase = window.firebase;

import {
    initReceiveDataFromFirebase,
    addObjToFirebaseCollection
} from "./utils/firebase"

// @link:https://www.youtube.com/watch?v=DqWiuvuK_78
// 30th minute
const firebaseApi = ({getState,dispatch}) => next => action => {
    const apiActions = [
        actions.FIREBASE_INIT,
        actions.CREATE_ROOM,
        actions.SET_ACTIVE_ROOM,
        actions.RECEIVED_MESSAGE,
        actions.SET_USERNAME
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
        case actions.RECEIVED_MESSAGE:
            addObjToFirebaseCollection(action)
                .then( (docId) => {
                    action.meta = {
                        docId
                    }
                    next(action)
                });
            break;

        case actions.SET_ACTIVE_ROOM:
            const firebaseCollection = firebase.firestore().collection(action.payload.collection);
            const {collection, ...updateData} = action.payload;
            const curUserId = getState().users.curUserId;
            let curUserRef = firebaseCollection.doc(curUserId);
            curUserRef.update(updateData)
                .then( () => next(action))
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            break;
    }
}

export default firebaseApi;