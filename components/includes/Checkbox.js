import React from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

const VALS = {
    success: false, 
    error: false
  }

function App(){
  const [values, setValues] = 
  React.useState([]);
  const handler = (e) =>{
    let key = e.target.value;
    let val = e.target.checked;
    VALS[key] = val
    let arr = [];
    Object.entries(VALS)
      .forEach(([key, val])=>{
      if(val === true) {
        arr.push(key)
      }
    })
    setValues(arr)
  }
  return (
  <FormControl  
    error={values.includes("error")
  }>
    <FormLabel>A checkbox</FormLabel>
    <FormGroup
      onChange={handler}>
        <FormControlLabel
          value="success"
          control={<Checkbox />} 
          label="Success" />
        <FormControlLabel 
          value="error"
          control={<Checkbox />} 
          label="Error" />
    </FormGroup> 
    <FormHelperText>A checkbox error</FormHelperText>
  </FormControl>
  )
}

export default React.memo(App)