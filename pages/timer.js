import React, {useState, useEffect, useMemo, useCallback} from "react"
import moment from "moment"
import Head from "next/head"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Fab from "@mui/material/Fab"
import IconButton from "@mui/material/IconButton"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import HistoryIcon from "@mui/icons-material/History"


function renderTime(str){
  return str.split(":")
  .map(val=> val<10? "0"+val : val)
  .join(":")
}



function App(){
  
  const [time, setTime] = useState({
    s: 0, 
    m: 0, 
    h: 0
  });
  
  const [isRunning, setIsRunning] = useState(false);
  
  const handleTimeSetting = (type, val)=>{
    switch(type){
      case "s":
        setTime(obj=>({
          ...obj,
          s: val
        }))
      break;
      case "m":
        setTime(obj=>({
          ...obj,
          m: val
        }))
      break;
      case "h":
        setTime(obj=>({
          ...obj,
          h: val
        }))
      break;
      default:
    }
  }
  
  useEffect(()=>{
    let tm = setInterval(()=>{
      setTime(obj=>({
        ...obj,
        s: ++obj.s
      }))
    }, 1000);
    
    return ()=>clearInterval(tm)
  })
  
  return (
  <>
    <Head>
      <title>Timer project</title>
    </Head>
    
    <Box 
      position="relative" 
      height="90vh"
      boxSizing="border-box"
      >
      
      <Typography color="primary" variant="h3" sx={{
        display:"flex",
        justifyContent:"center",
        mt:4,
      }} fontWeight="300">
        {renderTime(`${time.h}:${time.m}:${time.s}`)}
      </Typography>
      
      <Stack spacing={4} justifyContent="center" position="absolute" width="100%" bottom="20px" direction="row">
        <IconButton color="primary">
          <HistoryIcon />
        </IconButton>
        <Fab color="primary" onClick={()=>setIsRunning(x=>!x)}>
          {(isRunning)? <PauseIcon/> : <PlayArrowIcon/>}
        </Fab>
        <IconButton color="primary">
          <HistoryIcon />
        </IconButton>
      </Stack>
    </Box>
  </>)
}



export function getServerSideProps({req}){
  return ({
    props: {
      cookies: req.cookies
    }
  })
}

export default React.memo(App)