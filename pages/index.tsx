import { getAuth, onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { createClient, Provider } from "urql";
import { auth } from "../firebaseConfig";
import Footer from "./footer";
import Header from "./header";
import BottomAppBar from "./home/organisms/bottomAppBar";
import BpmElements from "./home/organisms/bpmElements";
import TopAppBar from "./home/organisms/topAppBar";

const GA_TRACKING_ID = process.env.GA_TRACKING_ID || "";

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

  //MEMO:ログイン後、observeLoginUserが8回くらい一気に発火するのはなんでだろう
  const observeLoginUser = function (user: any) {
    //ログイン状態が変更された時の処理
    if (user) {
      user.getIdToken().then((token: any) => {
        setIdToken(token);
      });
    }
  };

  useEffect(() => {
    /* 第1引数には実行させたい副作用関数を記述*/
    console.log("副作用関数が実行されました！");
    onAuthStateChanged(getAuth(), observeLoginUser);
  }, []);

  return (
    <Provider value={client}>
      <div>
        <Head>
          <title>SDVX BPM DB</title>
          <link rel="icon" href="/favicon.ico" />
          {GA_TRACKING_ID != null && (
            <>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });`,
                }}
              />
            </>
          )}
          <meta property="og:title" content="SDVX DB" />
          <meta property="og:description" content="SDVX DB" />
          {/* <meta
          property="og:image"
          content="../public/sdvx_bpm_database_logo_for_twitter.png"
        /> */}
          <meta
            name="twitter:image"
            content="../public/sdvx_bpm_database_logo_for_twitter.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="SDVX DB" />
          <meta name="twitter:description" content="SDVX DB" />
        </Head>
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
