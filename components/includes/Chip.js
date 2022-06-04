import React, {useState} from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

function App({mypic}){
  const [show, setShow] = useState(true)
  return (
 <Box display="flex" justifyContent="center" backgroundColor="#f5f5f5">
 <Paper sx={{
   p: 4,
   m: 8,
   display: "flex",
   justifyContent: "space-around",
   flexWrap: "wrap"
 }}>
 <Chip avatar={<Avatar>T</Avatar>} label="Show Tochukwu" onClick={()=>{setShow(true)}} sx={{m:0.3}} />
 { show && (
 <Chip sx={{m:0.3}} avatar={<Avatar alt="reacJs" src={mypic}/>} label="Ntomchukwu" onClick={()=>{}} onDelete={()=>setShow(false)} variant="outlined"/>
  )}
 </Paper>
 </Box>
 )
}

export default React.memo(App)