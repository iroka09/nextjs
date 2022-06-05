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
  
  return (
    <>
      <Head>
        <title>Timer project</title>
      </Head>
      
      <Stack spacing={4} justifyContent="center" position="fixed" width="100%" bottom="0">
        <IconButton>
          <HistoryIcon />
        </IconButton>
        <Fab>
          {(isRunning)? <PauseIcon/> : <PlayArrowIcon/>}
        </Fab>
      </Stack>
    </>
  )
}


export function getServerSideProps({req}){
  return ({
    props: {
      cookies: req.cookies
    }
  })
}

export default React.memo(App)