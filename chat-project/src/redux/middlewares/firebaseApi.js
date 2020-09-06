import * as actions from "../consts/action-types";
const firebase = window.firebase;

const firebaseApi = ({dispatch}) => next => action => {
    const apiActions = [
        actions.FIREBASE_INIT,
        actions.CREATE_ROOM,
        // actions.RECEIVED_MESSAGE,
        // actions.SET_USERNAME
    ];

    if ( !apiActions.includes(action.type)) {
        return next(action);
    }

    if (action.type === actions.FIREBASE_INIT) {
        // Read From Firebase
        firebase.firestore().collection('rooms')
            .orderBy('name')
            .onSnapshot(function (qs) {
                    const batch = [];
                    qs.forEach(function (doc) {
                        batch.push({id: doc.id, ...doc.data()});
                    });
                    /// we have the new messages in batch
                    dispatch({type: actions.RECEIVED_ROOMS, payload: batch});
                }
            )
        return;
    }

    const firebaseCollection = firebase.firestore().collection(action.payload.collection);
    const {collection, ...obj} = action.payload;
    firebaseCollection.add(obj);
}

export default firebaseApi;