import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseConfig";

const PucNumberRankTable = () => {
  const [user, loading, errorOfAuthState] = useAuthState(auth);
  const [idToken, setIdToken] = useState<string>("");
  const searchQueryBasedOnLiked = ``;

  const fetchPucNumber: any = async (uid: string) => {};

  return <></>;
};

export default PucNumberRankTable;
