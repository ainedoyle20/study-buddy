import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCm0-R4qbSuD6xhsWyYOJUzhm2_NtLnbaQ",
  authDomain: "study-buddy-a7187.firebaseapp.com",
  projectId: "study-buddy-a7187",
  storageBucket: "study-buddy-a7187.appspot.com",
  messagingSenderId: "542760849020",
  appId: "1:542760849020:web:c6ebdb92ca262d863983f9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
