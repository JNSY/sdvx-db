import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const login = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};
