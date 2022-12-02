import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const BasicSelect = ({bpm,handleChange}:{bpm:any,handleChange:any}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">BPM</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={bpm}
          label="Bpm"
          onChange={handleChange}
        >
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={256}>256</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
