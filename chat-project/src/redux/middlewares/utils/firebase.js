import * as actions from "../../consts/action-types";
const firebase = window.firebase;

function initReceiveDataFromFirebase(dispatch) {
    // Read From Firebase
    const collectionsData = [
        {
            collection: 'rooms', orderColumn: "name",
            action: {
                add: actions.RECEIVED_ROOMS,
                modify: actions.ROOM_MODIFIED,
            }
        },
        {
            collection: 'users', orderColumn: "name",
            action: {
                add: actions.RECEIVED_USERS,
                modify: actions.USER_MODIFIED,
            }
        },
        {
            collection: 'messages', orderColumn: "time",
            action: {
                add: actions.RECEIVED_MESSAGES,
                modify: actions.MESSAGE_MODIFIED,
            }
        },
    ];

    collectionsData.forEach( collectionData => {
        firebase.firestore().collection(collectionData.collection)
            .orderBy(collectionData.orderColumn)
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
    })
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
    initReceiveDataFromFirebase,
    addObjToFirebaseCollection
}