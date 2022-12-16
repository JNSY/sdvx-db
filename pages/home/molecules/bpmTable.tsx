import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMutation } from "urql";
import {
  CHART_TABLE_NAME,
  LIKE_TABLE_NAME,
} from "../../../constants/constants";
import { auth } from "../../../firebaseConfig";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(elm: any) {
  const songid = elm["id"];
  const song_name = elm["song_name"];
  const lv = elm["lv"];
  const bpm = elm["bpm"];
  const effector = elm["effector"];
  const official_ranking_url = elm["official_ranking_url"];
  //TODO:↓これはテーブル部分を変数にする
  const like = elm[`${CHART_TABLE_NAME}_to_${LIKE_TABLE_NAME}`];
  return {
    songid: songid,
    song_name: song_name,
    lv: lv,
    bpm: bpm,
    effector: effector,
    official_ranking_url: official_ranking_url,
    like: like,
  };
}

// TODO:デバイス別にminWidthを変えられないか探る。PCだと広めに設定したいため(MUIとtailwindごっちゃにするからこうなる…)

export default function BpmTable({
  selectedBpm,
  selectedEffector,
  searchMode,
  fetchedData,
  idToken,
  onDeleteLike,
}: {
  selectedBpm: any;
  selectedEffector: any;
  searchMode: any; //TODO:タイプをSearchModeにするとエラーになる謎の解消
  fetchedData: any;
  idToken: string;
  onDeleteLike: (user: any, rowsongid: any, idToken: any) => void;
}) {
  const [user, loading] = useAuthState(auth);
  const [likeState, setLikeState] = useState([]); //中身はオブジェクト。。
  const [bpmDataRows, setBpmDataRows] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState();

  const queryStr = `mutation MyMutation($songid:Int! ,$uid:String!) {insert_likes(objects: {id_Chart:$songid, id_User: $uid}){returning {
      likes_to_charts {
            bpm
            chain
            composer
            effector
            id
          }
        }}
    }`;

  const [updateLikeResult, updateLike] = useMutation(queryStr);

  useEffect(() => {
    console.log("ふぇっちど", fetchedData);
    if (fetchedData) {
      setBpmDataRows(fetchedData["charts"].map((elm: any) => createData(elm)));
    }
  }, [fetchedData]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "324px" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>曲名</StyledTableCell>
            <StyledTableCell>LV</StyledTableCell>
            {searchMode == "BPM" || searchMode == "SONGNAME" ? (
              <StyledTableCell align="right">BPM</StyledTableCell>
            ) : (
              <StyledTableCell align="right">EFFECTOR</StyledTableCell>
            )}
            {user ? <StyledTableCell>FAV</StyledTableCell> : undefined}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* TODO:エフェクターモードその他の追加 */}
          {bpmDataRows.map((row: any, index: number) =>
            searchMode == "BPM" || searchMode == "SONGNAME" ? (
              <StyledTableRow key={row.song_name}>
                <StyledTableCell component="th" scope="row">
                  <a
                    href={row.official_ranking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {row.song_name}
                  </a>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.lv}
                </StyledTableCell>
                <StyledTableCell align="right">{row.bpm}</StyledTableCell>
                {user ? (
                  <StyledTableCell align="right">
                    {console.log(row)}
                    {row.like.length > 0 ? (
                      <button
                        onClick={() => {
                          onDeleteLike(user!.uid, row.songid, idToken);
                        }}
                      >
                        <div className="text-red-500">★</div>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          updateLike({
                            songid: row.songid,
                            uid: user!.uid,
                          });
                        }}
                      >
                        <div className="text-black-500">★</div>
                      </button>
                    )}
                  </StyledTableCell>
                ) : undefined}
              </StyledTableRow>
            ) : undefined
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
