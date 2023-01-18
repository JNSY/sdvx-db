import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseConfig";

export default function LikeTable({
  fetchedData,
  onDeleteLike,
}: {
  fetchedData: any;
  onDeleteLike: any;
}) {
  const [user, loading] = useAuthState(auth);
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
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  function createData(elm: any) {
    elm = elm.charts;
    const songid = elm["id"];
    const song_name = elm["song_name"];
    const lv = elm["lv"];
    const bpm = elm["bpm"];
    const effector = elm["effector"];
    const official_ranking_url = elm["official_ranking_url"];
    const like = elm[`like`];
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

  console.log(fetchedData, "ふぇっちど");

  let bpm_data_rows = [];
  if (fetchedData) {
    bpm_data_rows = fetchedData.map((elm: any) => createData(elm));
  }

  console.log(bpm_data_rows);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "324px" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>曲名</StyledTableCell>
              <StyledTableCell>LV</StyledTableCell>
              <StyledTableCell>FAV</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <p>loading...</p>
            ) : (
              bpm_data_rows.map((row: any) =>
                row ? (
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
                    <StyledTableCell align="right">
                      <button
                        onClick={() => {
                          onDeleteLike(user!.uid, row.songid);
                        }}
                      >
                        <div className="text-red-500">★</div>
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ) : undefined
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
