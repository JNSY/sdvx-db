import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { SearchMode } from "../organisms/bpmElements";

const BasicTextField = ({
  parameter,
  handleChange,
  label,
}: {
  parameter: any;
  handleChange: any;
  label: SearchMode;
}) => {
  return (
    <div className="flex justify-center">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="justify-center">
          <TextField
            id="outlined-basic"
            label={label}
            variant="outlined"
            value={parameter}
            onChange={handleChange}
          />
        </div>
      </Box>
    </div>
  );
};

export default BasicTextField;
