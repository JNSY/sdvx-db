import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export const login = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};
