import React, {useState} from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';


function App(){
  const [age, setAge] = useState("");
  return (
    <>
 <FormControl variant="standard">
        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          name="myAge"
          component="div"
          value={age}
          onChange={(e)=>setAge(e.target.value)}
          label="Age"
          autoWith
          inputProps={{
            readOnly: false
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={34}>Thirty Four</MenuItem>
        </Select>
    </FormControl>
      
    <TextField
          select
          disableCloseOnSelect
          label="Select"
          value={age}
          onChange={(e)=>setAge(e.target.value)}
          helperText="Please select your age"
          variant="outlined"
          SelectProps={{
            autoWith: true
          }}
        >
         <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </TextField>
</>
  )}
  
  export default React.memo(App)