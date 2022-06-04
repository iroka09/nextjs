import React, {useRef, useState, useEffect} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//import SaveIcon from "@mui/material/Save";
import CircularProgress from "@mui/material/CircularProgress";

function App(props){
  //let totalHeightToUse = useRef();
  
  const [scrolled, setScrolled] = useState(5);
 
 /* 
const Scroll = (e)=>{
 setScrolled(Math.floor((window.pageYOffset/totalHeightToUse.current)*100))
}

useEffect(()=>{
  
  totalHeightToUse.current = document.body.scrollHeight - window.innerHeight
   window.addEventListener("scroll", Scroll);
   return ()=> window.removeEventListener("scroll", Scroll)
  }, [])
*/

let value = props.value||scrolled;


 return (
 <Box position="relative" display="inline-flex" marginTop="5px">
  <CircularProgress variant="determinate" value={value} thickness={4} color={value===100?"success":"warning"} size={60} />
 <Box position="absolute" left={0} top={0} right={0} bottom={0} display="flex" justifyContent="center" alignItems="center">
  <Typography>{value}%</Typography>
  </Box>
</Box>)
}

export default React.memo(App)