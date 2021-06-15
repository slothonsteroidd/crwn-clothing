import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDFQn5KtHKNlAxiDg9qclv2Uqesx4tRFUg",
  authDomain: "crwn-db-b74b9.firebaseapp.com",
  projectId: "crwn-db-b74b9",
  storageBucket: "crwn-db-b74b9.appspot.com",
  messagingSenderId: "596021830931",
  appId: "1:596021830931:web:5bddef390c810733fa66e6",
  measurementId: "G-CFHTPEHJB1",
};

firebase.initializeApp(config);
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
    } catch (err) {
      console.log(err.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
