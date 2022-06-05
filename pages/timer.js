import React, {useState, useEffect, useRef, useMemo, useCallback} from "react"
import moment from "moment"
import Head from "next/head"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Fab from "@mui/material/Fab"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import HistoryIcon from "@mui/icons-material/History"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"


function renderTime(str=""){
  return str
  .split(":")
  .map(val=>(
    (Number(val)<10)? "0"+val : val
  ))
  .join(":")
}


function App(){
  
  const hRef = useRef()
  const mRef = useRef()
  const sRef = useRef()
  
  const [anchor, setAnchor] = useState({
    el: null,
    timeType: "",
    timeMax: 0,
  })
  
  const [time, setTime] = useState({
    h: 0, m: 0, s: 0
  });
  
  const [isRunning, setIsRunning] = useState(false);
  
  const handleSetAnchor = (type, ref)=>{
    setAnchor(x=>({
      ...x,
      [type]: ref
    }))
  }
 
  useEffect(()=>{
    let tm;
    if(isRunning && Object.values(time).some(x=>x>0)){
      tm = setInterval(()=>{
        setTime(obj=>{
          let s = obj.s;
          let m = obj.m;
          let h = obj.h;
          if(h===0 && m === 0 && s === 0){
            clearInterval(tm)
            setIsRunning(false)
          }
          s--
          m = (s<1)? --m : m;
          h = (m<1)? --h : h;
          //==
          s = (h<0&&m<0&&s<1)? 0 : (s<1)? 59 : s;
          m = (h<0&&m<1)? 0 : (m<1)? 59 : m;
          h = (h<0)? 0 : h;
          //==
          return {s, m, h}
        })
      }, 1000);
    }
    return ()=>clearInterval(tm)
  }, [isRunning])
  
  return (
  <>
    <Head>
      <title>Timer</title>
    </Head>
    
    <Box 
      position="relative" 
      height="78vh"
      boxSizing="border-box"
      >
      
      <Typography color="primary" variant="h3" sx={{
        display:"flex",
        justifyContent:"center",
        my:8,
      }} fontWeight="300">
        {renderTime(`${time.h}:${time.m}:${time.s}`)}
      </Typography>
      
    {isRunning ||
      <Stack justifyContent="center" spacing={1} direction="row" sx={{mt:20}}>
      {[{
        type: "h",
        ref: hRef,
        max: 99
      },
      {
        type: "m",
        ref: mRef,
        max: 59
      },
      {
        type: "s",
        ref: sRef,
        max: 59
      }].map((obj,i)=>(
        <Chip
          key={i}
          ref= {obj.ref}
          onClick={()=>{
            setAnchor(x=>({
              el: obj.ref,
              timeType: obj.type,
              timeMax: obj.max,
            }))
          }}
          avatar={(obj.type===anchor.timeType && anchor.el)?
            <ExpandLessIcon/> : <ExpandMoreIcon/>
          }
          label={time[obj.type]} 
        />
      ))}
      </Stack>
    }
      
    <Menu
      anchorEl={anchor.el?.current}
      open={!!anchor.el}
      onClose={()=>{
        setAnchor(x=>({
          ...x,
          el: null
        }))
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      sx={{maxHeight: 200}}
    >
      {[...new Array(anchor.timeMax+1)].map((a,k)=>(
        <li 
          key={k}
          className="hover_effect"
          style={{
            padding: "5px 20px",
            borderBottom:"1px solid #555",
          }}
          onClick={()=>{
            setTime(x=>({
              ...x,
              [anchor.timeType]: k
            }));
            setAnchor(x=>({
              ...x,
              el: null
            }))
          }}
        >
          {k}
        </li>
      ))}
    </Menu>
    
      
      
      
    <Stack spacing={4} justifyContent="center" position="absolute" width="100%" bottom="20px" direction="row">
      <Grid container>
        <Grid item xs={4} 
          sx={{
            display:"flex", 
            justifyContent:"flex-end"}}
          >
          <IconButton color="primary" onClick={()=>{
              setIsRunning(false);
              setTime({
                s:0, m:0, h:0
              })
            }}>
            <HistoryIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4} sx={{display:"flex", justifyContent:"center"}}>
          <Fab color="primary" onClick={()=>setIsRunning(x=>!x)}>
            {(isRunning)? <PauseIcon/> : <PlayArrowIcon/>}
          </Fab>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid> 
    </Stack>
  </Box>

  </>)
}


export default React.memo(App)

export function getServerSideProps({req}){
  return ({
    props: {
      cookies: req.cookies
    }
  })
}
