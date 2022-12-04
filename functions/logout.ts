import { getAuth, signOut } from "firebase/auth";
import router from "next/router";

export const logout = function () {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      //ログアウトした時の処理
      router.reload();
    })
    .catch((error) => {
      //ログアウトに失敗した時の処理
      console.log("ログアウト失敗");
    });
};
