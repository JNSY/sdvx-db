import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as React from "react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { effectors } from "../../../constants/effector_data/effectors";
import { auth } from "../../../firebaseConfig";
import {
  CHART_TABLE_NAME,
  HASURA_ENDPOINT,
  LIKE_TABLE_NAME,
} from "../../constants";
import TextFiedlRhf from "../atoms/textFieldRhf";
import BpmTable from "../molecules/bpmTable";

export type SearchMode = "BPM" | "EFFECTOR" | "SONGNAME";
const DataBaseElements = () => {
  const [user, loading] = useAuthState(auth);
  const [searchMode, setSearchMode] = React.useState("BPM");
  const [bpm, setBpm] = React.useState<string>("256");
  const [effector, setEffector] = React.useState("");
  const [songName, setSongName] = React.useState("");

  // TODO:idTokenを各コンポーネントで用意するかバケツリレーするかの比較検討
  const [idToken, setIdToken] = useState<string>("");

  const handleChangeSearchMode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchMode((event.target as HTMLInputElement).value);
  };

  //TODO:命名をわかりやすいものに変える
  const [langs, setLangs] = useState([
    // example:{ song_name: "a", bpm: "", lv: "", effector: "" }
  ]);
  console.log("現在のlangs", langs);

  //NOTE:テーブル名とリレーション名の区別をきちんとつけること。
  const searchQueryBasedOnBpm = `query MyQuery($bpm:String!,$uid:String!) {
    ${CHART_TABLE_NAME}(where: {bpm: {_eq: $bpm}}) {
      ${CHART_TABLE_NAME}_to_${LIKE_TABLE_NAME}(where: {id_User: {_eq: $uid}}) {
        id
        id_Chart
        id_User
      }
      song_name
      id
      official_ranking_url
      effector
      lv
      bpm
    }
  }`;

  const searchQueryBasedOnSongName = `query MyQuery($song_name:String!,$uid:String!) {
    ${CHART_TABLE_NAME}(where: {song_name: {_eq: $song_name}}) {
      ${CHART_TABLE_NAME}_to_${LIKE_TABLE_NAME}(where: {id_User: {_eq: $uid}}) {
        id
        id_Chart
        id_User
      }
      song_name
      id
      official_ranking_url
      effector
      lv
      bpm
    }
  }`;

  //いいねに追加する関数
  const addLike: any = (user: any, songid: string, idToken: string) => {
    const queryStr = `mutation MyMutation {    insert_${LIKE_TABLE_NAME}(objects: {id_Chart:${songid} , id_User: ${user}}){      returning {
      ${LIKE_TABLE_NAME}_to_${CHART_TABLE_NAME} {
            bpm
            chain
            composer
            effector
            id
          }
        }}
    }`;

    const addLikemutation: any = async () => {
      const query = { query: queryStr };
      fetch("https://sdvxdb-dev.hasura.app/v1/graphql", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
        body: JSON.stringify(query),
      }).then((response) => {
        response.json().then((fetchChartsResult) => {
          console.log("追加時にDBから返ってきたデータ", fetchChartsResult);
          fetchCharts(bpm, user);
        });
      });
    };
    addLikemutation();
  };

  //いいねを削除する関数
  const deleteLike: any = (user: any, songid: string, idToken: string) => {
    const queryStr = `mutation MyMutation {    delete_${LIKE_TABLE_NAME}(where: {id_Chart:{_eq:${songid}} , id_User: {_eq:${user}}}){      returning {
      ${LIKE_TABLE_NAME}_to_${CHART_TABLE_NAME} {
        bpm
        chain
        composer
        effector
        id
      }
    }}
  }`;

    const deleteMutation: any = async () => {
      const query = { query: queryStr };
      fetch("https://sdvxdb-dev.hasura.app/v1/graphql", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
        body: JSON.stringify(query),
      }).then((response) => {
        response.json().then((fetchChartsResult) => {
          console.log("削除試行後、DBから返ってきたデータ", fetchChartsResult);
          fetchCharts(bpm, user);
        });
      });
    };
    deleteMutation();
  };

  const observeLoginUser = function (user: any) {
    //ログイン状態が変更された時の処理
    if (user) {
      user.getIdToken().then((token: any) => {
        setIdToken(token);
      });
    }
  };

  const notLoginQuery = `query MyQuery($bpm:String!) {
    ${CHART_TABLE_NAME}(where: {bpm: {_eq: $bpm}}) {
      song_name
      id
      official_ranking_url
      effector
      lv
    }
  }`;

  //検索フォームから検索を行う際に投げるクエリ
  const fetchCharts: any = async (enteredValue: any, uid: string) => {
    let searchQuery;
    let variables;
    switch (searchMode) {
      case "BPM":
        searchQuery = searchQueryBasedOnBpm;
        variables = { bpm: enteredValue, uid: uid };
        break;
      case "SONGNAME":
        searchQuery = searchQueryBasedOnSongName;
        variables = { song_name: enteredValue, uid: uid };
        break;
    }
    const query = {
      query: user ? searchQuery : notLoginQuery,
      variables: user ? variables : { bpm: enteredValue },
    };
    fetch(HASURA_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${idToken}` },
      body: JSON.stringify(query),
    }).then((response) => {
      response.json().then((fetchChartsResult) => {
        console.log("データ取得後、DBから返ってきたデータ", fetchChartsResult);
        setLangs(fetchChartsResult.data.charts);
      });
    });
  };

  //子コンポーネントに入力された値を親コンポーネント(これ)に伝える関数
  //TODO:any修正。フォームに入力された値。
  const addEnteredValue = (value: any) => {
    const enteredValue = value.example;
    const uid = user ? user!.uid : null; //非ログイン時はnull
    const bpm = value["example"];
    setBpm(bpm);
    fetchCharts(enteredValue, uid);
  };

  const onAddLike = (user: any, rowsongid: any, idToken: any) => {
    addLike(user, rowsongid, idToken);
  };

  const onDeleteLike = (user: any, rowsongid: any, idToken: any) => {
    deleteLike(user, rowsongid, idToken);
  };

  useEffect(() => {
    /* 第1引数には実行させたい副作用関数を記述*/
    console.log("副作用関数が実行されました！");
    onAuthStateChanged(getAuth(), observeLoginUser);
  }, []);

  const ReturnSearchMode: any = () => {
    if (searchMode == "BPM") {
      return (
        <div>
          <TextFiedlRhf onAddEnteredValue={addEnteredValue} />
        </div>
      );
    } else if (searchMode == "SONGNAME") {
      return (
        <div>
          <TextFiedlRhf onAddEnteredValue={addEnteredValue} />
        </div>
      );
    } else if (searchMode == "EFFECTOR") {
      return (
        <div className="flex justify-center ">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={effectors}
            sx={{ width: 300 }}
            inputValue={effector}
            onInputChange={(event, newInputValue) => {
              setEffector(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="effector" />}
          />
        </div>
      );
    }
  };

  return (
    <div>
      <div className="formsWrapper h-16">
        <ReturnSearchMode />
      </div>
      <div className="flex justify-center ">
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={searchMode}
          onChange={handleChangeSearchMode}
        >
          <FormControlLabel value="SONGNAME" control={<Radio />} label="曲名" />
          <FormControlLabel value="BPM" control={<Radio />} label="BPM" />
          <FormControlLabel
            value="EFFECTOR"
            control={<Radio />}
            label="エフェクター"
          />
        </RadioGroup>
      </div>
      <BpmTable
        selectedBpm={bpm}
        selectedEffector={effector}
        searchMode={searchMode}
        fetchedData={langs}
        idToken={idToken}
        onDeleteLike={onDeleteLike}
        onAddLike={onAddLike}
      />
    </div>
  );
};

export default DataBaseElements;
