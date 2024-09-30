import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { initializeApp } from "firebase/app";
import { getAuth,} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxCA7oUb1SDKSB0cHHOlplk8x4ojABsw8",
  authDomain: "netflix-clone-3c016.firebaseapp.com",
  projectId: "netflix-clone-3c016",
  storageBucket: "netflix-clone-3c016.appspot.com",
  messagingSenderId: "866605448003",
  appId: "1:866605448003:web:95e34f87a18d5e888acdf6"
};
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export const Firebase = firebase.initializeApp(firebaseConfig);
export {auth}
