import React, {useState} from "react"
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


function App() {
  const [switched, setSwitch] = useState(true);
     //check=true or defaultChecked
  return (
  <FormControlLabel
          control={
            <Switch 
            checked={switched} 
            onChange={(e,v)=>{
            setSwitch(v)
            }} 
            name="accepted" />
          }
          label="Accept terms"
        />)
}

export default React.memo(App)