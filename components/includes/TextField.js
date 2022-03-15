import React from "react"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const menuLists = "One, Two, Three, Four, Five, Six".split(", ");


function App(){
  //select prop
  const [selectData, setSelectedData] = React.useState([menuLists[3]])
  //password
  const [hidden, setHidden] = React.useState(true);
  const [error, setError] = React.useState({
    isError: false, 
    reason: "",
  });
  const handlePassword = (e)=>{
    let v = e.target.value;
    let isError = false, reason: error.reason;
    if(v.trim()!==""){
    if(!((/[0-9]/i).test(v) && (/[a-z]/i).test(v) && !(/[^a-z0-9]/).test(v) )){
      isError = true;
      reason = "You must enter only alphanumeric."
    }
  if(!(/^.{2,10}$/).test(v)){
    isError = true;
    reason = "Password must range from 2 to 10 characters long."
      }
    }
  if(error.isError !== isError || error.reason !== reason) {
      setError({isError, reason})
    }
  }
  const handleSelect = (e)=>{
    let val = e.target.value;
    setSelectedData(val)
  }
return (
<>
    <TextField 
      label="First Name" 
      defaultValue="Iroka"
      variant="standard"
      InputProps={{
          readOnly: false,
          shrink: false,
          startAdornment: (
            <InputAdornment position="start">
             <IconButton>
              <AccountCircleIcon />
             </IconButton>
            </InputAdornment>
          ),
      }}/>
      
  <br />
  
    <TextField 
      label="password" 
      error={error.isError}
      color={error.isError?"error":"primary"}
      type={hidden?"password":"text"}
      defaultValue=""
      variant="outlined"
      placeholder="Enter password"
      helperText={error.isError? error.reason : ""}
      onKeyUp={handlePassword}
      InputProps={{
          readOnly: false,
          shrink: false,
          endAdornment: (
            <InputAdornment position="center">
             <IconButton onClick={()=>setHidden(x=>!x)}>
              {hidden?<VisibilityIcon /> : <VisibilityOffIcon/>}
             </IconButton>
            </InputAdornment>
          ),
      }}/>

  <br />
  
      <TextField 
      label="multiline prop" 
      type="text" 
      multiline
      maxRows={5}
      placeholder="Textarea"
      variant="outlined"
      />
  <br />
  
  <TextField 
      select
      SelectProps={{
        multiple: true,
        value: selectData,
        renderValue: (arr)=>(
          arr.map((x, i)=>(
            <Chip 
              label={x} 
              sx={{mx:"2px"}}
              />
          ))
        ),
        onChange: handleSelect,
        MenuProps: {
          sx: {maxWidth: "20%"}
        }
      }}
      label="select prop" 
      placeholder="select something"
      variant="outlined"
      >
      {
        menuLists.map(x=>(
          <MenuItem key={x} value={x} selected={selectData.includes(x)}>
            <ListItemIcon>
              <Checkbox checked={selectData.includes(x)}/>
            </ListItemIcon>
            {x}
          </MenuItem>
        ))
      }
  </TextField>
</>
)}

export default React.memo(App)