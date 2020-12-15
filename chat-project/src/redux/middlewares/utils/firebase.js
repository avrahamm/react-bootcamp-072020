import firebase from "../../../../firebase";
// A loading image URL.
const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

function addObjToFirebaseCollection(collectionName, data={}) {
    const firebaseCollection = firebase.firestore().collection(collectionName);
    const {collection, ...obj} = {...data};
    return firebaseCollection.add(obj)
        .then(function (docRef) {
            console.log(`addObjToFirebaseCollection to ${collectionName}, docRef.id: `, docRef.id);
            return docRef;
        });
}

function addMessageDocument(data) {
    const {collection, uploadedFile} = data;
    if ( !uploadedFile) {
        return addObjToFirebaseCollection(collection,data);
    }
    return addMessageDocumentWithImage(data);
}

function addMessageDocumentWithImage(data) {
    const {
        collection: collectionName, userId, displayName,
        photoUrl, roomId, text, uploadedFile, time
    } = data;
    let messageRef = null;
    let fileSnapshot = null;
    // 1 - We add a message with a loading icon that will get updated with the shared image.
    return firebase.firestore().collection(collectionName).add({
        displayName,
        photoUrl,
        userId,
        roomId,
        text,
        imageUrl: LOADING_IMAGE_URL,
        time,
    })
        .then(function (messageRefObj) {
            messageRef = messageRefObj;
            // 2 - Upload the image to Cloud Storage.
            const filePath = `messages/${userId}/${messageRef.id}/${uploadedFile.name}`;
            return firebase.storage().ref(filePath).put(uploadedFile)
        })
        .then(function (fileSnapshotObj) {
            // 3 - Generate a public URL for the file.
            fileSnapshot = fileSnapshotObj;
            return fileSnapshot.ref.getDownloadURL()
        })
        .then((url) => {
            // 4 - Update the chat message placeholder with the image's URL.
            return messageRef.update({
                imageUrl: url,
                storageUri: fileSnapshot.metadata.fullPath
            });
        })
        .catch(function (error) {
            console.error('There was an error uploading a file to Cloud Storage:', error);
        });
}

export {
    addObjToFirebaseCollection,
    addMessageDocument
}