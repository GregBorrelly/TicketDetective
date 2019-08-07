import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { async } from "q";

const firebaseConfig = {
  apiKey: "AIzaSyBDgxbtQ_ii7Za8tEubQudNxmyUgPdK3wM",
  authDomain: "parkingdetective.firebaseapp.com",
  databaseURL: "https://parkingdetective.firebaseio.com",
  projectId: "parkingdetective",
  storageBucket: "",
  messagingSenderId: "1035604323816",
  appId: "1:1035604323816:web:01736077198a314b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const signout = () => auth.signOut();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUser = async user => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    try {
      await userRef.set({
        photoUrl: user.photoURL,
        id: user.uid,
        displayName: user.displayName,
        userRecords: []
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  return getUser(user.uid);
};

export const getUser = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore
      .collection("users")
      .doc(uid)
      .get();
    return {
      ...userDocument.data()
    };
  } catch (error) {
    console.error(error.message);
  }
};

export default firebase;
