import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import CircularProgressWithLabel from "./CircularProgressWithLabel"


function App(props){
 return (
   <Stack direction="row" spacing={4} sx={{justifyContent: "center", alignItems: "center"}}>
  <CircularProgress /> 
  <CircularProgress disableShrink/> 
  <CircularProgressWithLabel />
  </Stack> )
}

export default React.memo(App)