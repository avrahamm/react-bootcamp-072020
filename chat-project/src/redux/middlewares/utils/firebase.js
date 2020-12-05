import * as actionTypes from "../../consts/action-types";
import firebase from "../../../../firebase";

function fetchCollectionData(collectionData) {
    firebase.firestore().collection(collectionData.collection)
        .orderBy(collectionData.orderColumn)
        .limit(collectionData.limit)
        .onSnapshot(function (qs) {
                const addedDocsBatch = [];
                const modifiedDocsBatch = [];
                qs.docChanges().forEach(function(change) {
                    //@link:https://firebase.google.com/docs/firestore/query-data/listen
                    if (change.type === "added") {
                        console.log(`change.type === "added". New ${collectionData.collection}: `, change.doc.data());
                        addedDocsBatch.push({id: change.doc.id, ...change.doc.data()});
                    }
                    if (change.type === "modified") {
                        console.log(`Modified ${collectionData.collection}: `, change.doc.data());
                        modifiedDocsBatch.push({id: change.doc.id, ...change.doc.data()});
                    }
                    if (change.type === "removed") {
                        console.log(`Removed ${collectionData.collection}: `, change.doc.data());
                    }
                });

                if( addedDocsBatch.length) {
                    /// we have the new item/s in batch
                    dispatch({type: collectionData.action.add, payload: addedDocsBatch});
                }
                if( modifiedDocsBatch.length) {
                    /// modified item/s in batch
                    dispatch({type: collectionData.action.modify, payload: modifiedDocsBatch});
                }
            }
        )
}

function initReceiveDataFromFirebase(dispatch) {
    // Read From Firebase
    const collectionsData = [
        {
            collection: 'rooms', orderColumn: "name", limit: 10,
            action: {
                add: actionTypes.RECEIVED_ROOMS,
                modify: actionTypes.ROOM_MODIFIED,
            }
        },
    ];

    collectionsData.forEach( fetchCollectionData) ;
}

function addObjToFirebaseCollection(collectionName, data={}) {
    const firebaseCollection = firebase.firestore().collection(collectionName);
    const {collection, ...obj} = {...data};
    return firebaseCollection.add(obj)
        .then(function (docRef) {
            console.log(`addObjToFirebaseCollection to ${collectionName}, docRef.id: `, docRef.id);
            return docRef.id;
        });
}

export {
    fetchCollectionData,
    initReceiveDataFromFirebase,
    addObjToFirebaseCollection
}