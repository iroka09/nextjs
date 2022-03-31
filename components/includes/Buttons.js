
import React from "react";
import {styled} from "@mui/material/styles";
import {orange} from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonGroup from "@mui/material/ButtonGroup";
//import Input from "@mui/material/Input";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LoginIcon from '@mui/icons-material/Login';
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

/*color: success, warning, info, error, primary, secondary. variant:text, outlined, contained*/
const MyButton = styled(Button)((theme)=>({
    margin: "8px",
  }))
  

function App(props){
  const [files, setFiles] = React.useState([])
 return (
  <>
      <MyButton 
      variant="contained"
      href="/">
        href Button
      </MyButton> 
      
 <MyButton 
      sx={{color:"#aaa", borderColor:"#aaa"}}
      variant="outlined"
      size="small"
      startIcon={<CircularProgress sx={{color:"#aaa"}} thickness={4} size={15}/>}
      >
      Submitting...
    </MyButton>
      
<label htmlFor="contained-button-file">
  <input 
    accept="image/*" 
    id="contained-button-file" 
    multiple 
    type="file" 
    style={{display: "none"}} 
    onChange={e=>setFiles(e.target.files)}
  />
  <Button 
    variant="contained" 
    component="span" 
    fullWith
    startIcon={<PhotoCameraIcon/>}
    endIcon={(files.length > 0)? (
      <Avatar 
        size="small" 
        sx={{
          height: 20,
          width:20,
          bgcolor: orange[500]
        }}>
          <span style={{fontSize: "60%"}}> {files.length<99?files.length:99}</span>
      </Avatar>) : null
    }>
      Upload
  </Button>
</label>

      
      <Divider sx={{my:2}}>
        <Chip label="Chip"/>
      </Divider>
      
      <ButtonGroup orientation="vertical" color="primary" variant="contained">
        <Button startIcon={<AccountCircleIcon/>}>Profile</Button>
        <Button startIcon={<LoginIcon/>}>Login</Button>
      </ButtonGroup>
</>)
}

export default React.memo(App)