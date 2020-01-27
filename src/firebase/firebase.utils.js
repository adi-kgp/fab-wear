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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);
  if (!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName, email, createdAt, ...additionalData 
      })
    } catch (error){
        console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
