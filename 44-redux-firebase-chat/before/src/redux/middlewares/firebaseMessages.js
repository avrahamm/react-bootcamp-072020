import firebase from "../firebase";

const firebaseMessages = ({dispatch }) => next => action => {
    if (action.type === 'FIREBASE_INIT') {
        // Read From Firebase
        firebase.firestore().collection('messages')
            .orderBy('created_at')
            .onSnapshot(function (qs) {
                    const batch = [];
                    qs.forEach(function (doc) {
                        batch.push({id: doc.id, ...doc.data()});
                    });
                    /// we have the new messages in batch
                    dispatch({type: 'RESET_MESSAGES', payload: batch});
                }
            )
        return;
    }

    return next(action);
}

export default firebaseMessages;