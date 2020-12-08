import firebase from "../../../../firebase";

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
    addObjToFirebaseCollection
}