import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  CHART_TABLE_NAME,
  HASURA_ENDPOINT,
  LIKE_TABLE_NAME,
} from "../../constants/constants";
import { auth } from "../../firebaseConfig";
import Footer from "../footer";
import BottomAppBar from "../home/organisms/bottomAppBar";
import TopAppBar from "../home/organisms/topAppBar";
import LikeTable from "./likeComponents/likeTable";

//TODO:ハードコーディング部とリレーション名が適切でない部分が多々あるため要リファクタリング

//NOTE:user情報とidTokenの更新タイミングが違う点に注意。idTokenの最後の更新検知後にしっかりクエリをDBに投げる実装にしないと途中のエラーで止まってしまう可能性が高い。

const MyPage = () => {
  const [user, loading, errorOfAuthState] = useAuthState(auth);
  const [idToken, setIdToken] = useState<string>("");
  const [likedCharts, setLikedCharts] = useState([]); //ここの初期値は気を遣わないと、正しい値がuseEffectでセットされる前にmap関数でエラーになる(そもそもそういう実装はアンチパターンだったり…？)

  const searchQueryBasedOnLiked = `query MyQuery($uid:String!) {
    ${LIKE_TABLE_NAME}(where: {id_User: {_eq: $uid}}) {
      ${LIKE_TABLE_NAME}_to_${CHART_TABLE_NAME} {
        song_name
        id
        lv
      }
    }
  }`;

  const observeLoginUser = function (user: any) {
    if (user) {
      user.getIdToken().then((token: any) => {
        setIdToken(token);
      });
    }
  };

  onAuthStateChanged(getAuth(), observeLoginUser);

  //マイページアクセス時、like取得クエリを投げる以下の関数を実行
  const fetchCharts: any = async (uid: string) => {
    const query2 = {
      query: searchQueryBasedOnLiked,
      variables: { uid: uid },
    };
    console.log("db投げる前にuid確認", idToken);
    fetch(HASURA_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${idToken}` },
      body: JSON.stringify(query2),
    }).then((response) => {
      response.json().then((fetchChartsResult) => {
        console.log("DBから返ってきたデータ", fetchChartsResult);
        if (!fetchChartsResult["errors"]) {
          setLikedCharts(fetchChartsResult["data"]["likes"]);
        }
      });
    });
  };

  useEffect(() => {
    console.log("useEffectが実行されました");
    fetchCharts(user?.uid);
  }, [idToken]);

  //いいねを削除する関数
  const deleteLike: any = (uid: any, songid: string) => {
    console.log("渡ってきたデータ", uid, songid);
    const queryStr = `mutation MyMutation {    delete_likes(where: {id_Chart:{_eq:${songid}} , id_User: {_eq:${uid}}}){returning {
      likes_to_likes_many(where: {id_User: {_eq: ${uid}}}) {
        ${LIKE_TABLE_NAME}_to_${CHART_TABLE_NAME} {
          song_name
          id
        }
      }
    }}
  }`;

    const deleteMutation: any = async () => {
      const query = { query: queryStr };
      fetch(HASURA_ENDPOINT, {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
        body: JSON.stringify(query),
      }).then((response) => {
        response.json().then((fetchChartsResult) => {
          console.log("like削除後の返却データ", fetchChartsResult);
          setLikedCharts(
            fetchChartsResult["data"]["delete_likes"]["returning"][0][
              "likes_to_likes_many"
            ]
          );
        });
      });
    };
    deleteMutation();
  };

  const onDeleteLike = (uid: any, rowsongid: any) => {
    console.log(rowsongid);
    deleteLike(uid, rowsongid);
  };

  return (
    <div className="max-w-0-1 p-8">
      <body>
        <TopAppBar />
        <div className="h-16 m-4"></div>
        <div className="flex max-w-10 justify-center">
          <p>お気に入り譜面一覧</p>
        </div>
        <div className="flex max-w-10 justify-center">
          <LikeTable fetchedData={likedCharts} onDeleteLike={onDeleteLike} />
        </div>
        <Footer />
        <BottomAppBar />
      </body>
    </div>
  );
};

export default MyPage;
