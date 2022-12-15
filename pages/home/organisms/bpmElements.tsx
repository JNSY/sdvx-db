import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as React from "react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "urql";
import {
  CHART_TABLE_NAME,
  LIKE_TABLE_NAME,
} from "../../../constants/constants";
import { effectors } from "../../../constants/effector_data/effectors";
import { auth } from "../../../firebaseConfig";
import TextFiedlRhf from "../atoms/textFieldRhf";
import BpmTable from "../molecules/bpmTable";

export type SearchMode = "BPM" | "EFFECTOR" | "SONGNAME";
const DataBaseElements = () => {
  const [user, loading] = useAuthState(auth);
  const [searchMode, setSearchMode] = React.useState("BPM");
  const [bpm, setBpm] = React.useState<string>();
  const [effector, setEffector] = React.useState("");
  const [songName, setSongName] = React.useState("");

  // TODO:idTokenを各コンポーネントで用意するかバケツリレーするかの比較検討
  const [idToken, setIdToken] = useState<string>("");

  const handleChangeSearchMode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchMode((event.target as HTMLInputElement).value);
  };

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

  const shouldPause = bpm === undefined || bpm === null;

  const [result, reexecuteQuery] = useQuery({
    query: searchQueryBasedOnBpm,
    variables: { bpm: bpm, uid: user?.uid },
    pause: shouldPause,
  });
  const { data, fetching, error } = result;

  //子コンポーネントに入力された値を親コンポーネント(これ)に伝える関数
  const addEnteredValue = (value: any) => {
    const uid = user ? user!.uid : null;
    const bpm = value["example"];
    setBpm(bpm);
    console.log("addEnteredValueが実行されました。BPMは", bpm, uid);
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  const onDeleteLike = (user: any, rowsongid: any, idToken: any): void => {
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
          {/* <FormControlLabel
            value="EFFECTOR"
            control={<Radio />}
            label="エフェクター"
          /> */}
        </RadioGroup>
      </div>
      <BpmTable
        selectedBpm={bpm}
        selectedEffector={effector}
        searchMode={searchMode}
        fetchedData={data}
        idToken={idToken}
        onDeleteLike={onDeleteLike}
      />
    </div>
  );
};

export default DataBaseElements;
