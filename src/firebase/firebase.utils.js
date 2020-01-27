import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAc4bpQRo7_sV-91rzQ-eyCTqY3Pu9N8QE",
  authDomain: "fab-wear.firebaseapp.com",
  databaseURL: "https://fab-wear.firebaseio.com",
  projectId: "fab-wear",
  storageBucket: "fab-wear.appspot.com",
  messagingSenderId: "33927868147",
  appId: "1:33927868147:web:4e30872ff1623f8c92d186",
  measurementId: "G-5V799YG7BR"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
