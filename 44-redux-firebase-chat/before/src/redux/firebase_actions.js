import firebase from "./firebase";

export function sendToFirebase(from, text) {
  const msgs = firebase.firestore().collection('messages');
  const created_at = new Date();
  msgs.add({ from, text, created_at });
}