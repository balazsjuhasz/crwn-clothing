import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBL5Ru0UTbRn2WfgBkOzuxrwk8-uFe8NIU',
  authDomain: 'crwn-db-9cc9f.firebaseapp.com',
  databaseURL: 'https://crwn-db-9cc9f.firebaseio.com',
  projectId: 'crwn-db-9cc9f',
  storageBucket: 'crwn-db-9cc9f.appspot.com',
  messagingSenderId: '730008840395',
  appId: '1:730008840395:web:d13424c09eb9224cba534e',
  measurementId: 'G-8WRS8GJ57P',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
