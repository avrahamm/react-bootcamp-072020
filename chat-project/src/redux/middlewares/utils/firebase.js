import * as actions from "../../consts/action-types";
const firebase = window.firebase;

function initReceiveDataFromFirebase(dispatch) {
    // Read From Firebase
    const collectionsData = [
        { collection: 'rooms', orderColumn: "name", action: actions.RECEIVED_ROOMS },
        { collection: 'users', orderColumn: "name", action: actions.RECEIVED_USERS },
        { collection: 'messages', orderColumn: "time", action: actions.RECEIVED_MESSAGES },
    ];
    collectionsData.forEach( collectionData => {
        firebase.firestore().collection(collectionData.collection)
            .orderBy(collectionData.orderColumn)
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
            console.log(`addObjToFirebaseCollection to ${action.payload.collection}, docRef.id: `, docRef.id);
            return docRef.id;
        });
}

export {
    initReceiveDataFromFirebase,
    addObjToFirebaseCollection
}