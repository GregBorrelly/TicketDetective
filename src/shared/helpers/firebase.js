import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

export default firebase;
