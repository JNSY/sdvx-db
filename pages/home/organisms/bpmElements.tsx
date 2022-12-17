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
import { useMyQueryQuery } from "../../../graphql/generated";
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
    charts(where: {bpm: {_eq: $bpm}}) {
      likes(where: {id_User: {_eq: $uid}}) {
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
    charts(where: {song_name: {_eq: $song_name}}) {
      likes(where: {id_User: {_eq: $uid}}) {
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

  const observeLoginUser = function (user: any) {
    //ログイン状態が変更された時の処理
    if (user) {
      user.getIdToken().then((token: any) => {
        setIdToken(token);
      });
    }
  };

  const notLoginQuery = `query MyQuery($bpm:String!) {
    charts(where: {bpm: {_eq: $bpm}}) {
      song_name
      id
      official_ranking_url
      effector
      lv
    }
  }`;

  const shouldPause = bpm === undefined || bpm === null;

  const [result, reexecuteQuery] = useMyQueryQuery({
    variables: { bpm: bpm!, uid: user?.uid! },
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
      />
    </div>
  );
};

export default DataBaseElements;
