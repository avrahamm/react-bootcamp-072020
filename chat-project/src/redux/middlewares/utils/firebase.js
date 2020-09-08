import * as actions from "../../consts/action-types";
const firebase = window.firebase;

function initReceiveDataFromFirebase(dispatch) {
    // Read From Firebase
    const collectionsData = [
        { collection: 'rooms', action: actions.RECEIVED_ROOMS },
        { collection: 'users', action: actions.RECEIVED_USERS }
    ];
    collectionsData.forEach( collectionData => {
        firebase.firestore().collection(collectionData.collection)
            .orderBy('name')
            .onSnapshot(function (qs) {
                    const batch = [];
                    qs.forEach(function (doc) {
                        batch.push({id: doc.id, ...doc.data()});
                    });
                    /// we have the new items in batch
                    dispatch({type: collectionData.action, payload: batch});
                }
            )
    })
}

function addObjToFirebaseCollection(action) {
    const firebaseCollection = firebase.firestore().collection(action.payload.collection);
    const {collection, ...obj} = action.payload;
    return firebaseCollection.add(obj)
        .then(function (docRef) {
            console.log("User written with ID: ", docRef.id);
            action.meta = {
                userId: docRef.id
            }
        });
}

export {
    initReceiveDataFromFirebase,
    addObjToFirebaseCollection
}