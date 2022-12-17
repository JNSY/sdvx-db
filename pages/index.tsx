import { getAuth, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { createClient, Provider } from "urql";
import { auth } from "../firebaseConfig";
import Footer from "./footer";
import HeadComp from "./head";
import Header from "./header";
import BottomAppBar from "./home/organisms/bottomAppBar";
import BpmElements from "./home/organisms/bpmElements";
import TopAppBar from "./home/organisms/topAppBar";

export default function Home() {
  const [user, loading, errorOfAuthState] = useAuthState(auth);
  const [idToken, setIdToken] = useState<string>("");

  const client = createClient({
    url: "https://sdvxdb-dev.hasura.app/v1/graphql",
    fetchOptions: () => {
      const token = process.env.HASURA_GRAPHQL_ADMIN_SECRET;
      return {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      };
    },
  });

  const observeLoginUser = function (user: any) {
    //ログイン状態が変更された時の処理
    if (user) {
      user.getIdToken().then((token: any) => {
        setIdToken(token);
      });
    }
  };

  useEffect(() => {
    console.log("副作用関数が実行されました！");
    onAuthStateChanged(getAuth(), observeLoginUser);
  }, []);

  return (
    <Provider value={client}>
      <div>
        <HeadComp />
        <body>
          <TopAppBar />
          <div className="p-8 max-w-0-1">
            <div className="flex justify-center">
              <Header />
            </div>
            <div className="flex max-w-10 justify-center clear-left">
              {user ? (
                <BpmElements />
              ) : (
                <div
                  style={{
                    position: "relative",
                    top: 0,
                    width: "500px",
                    height: "500px",
                    clear: "both",
                  }}
                >
                  <Image
                    src="/notlogin.png"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}
            </div>
          </div>
          <Footer />
          <BottomAppBar />
        </body>
      </div>
    </Provider>
  );
}
