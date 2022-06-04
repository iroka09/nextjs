
import React, {useState} from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

function App(){
  const [value, setValue] = useState("end");
  return (
  <>
<FormControl component="fieldset" error={true}>
<FormLabel component="legend">Gender</FormLabel>
  <RadioGroup
    row
    name="gender"
    defaultValue="male"
    value={value}
    onChange={(e,v)=>setValue(v)}
  >
      <FormControlLabel 
        value="top" 
        control={<Radio />} 
        label="top"
        labelPlacement="top"
        />
      <FormControlLabel 
        value="end" 
        control={<Radio />} 
        label="end" 
        />
  </RadioGroup>
  <FormHelperText>A helper text </FormHelperText>
</FormControl> 
    </>)
}

export default React.memo(App)