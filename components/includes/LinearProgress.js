import React from "react";
import LinearProgress from "@mui/material/LinearProgress";


function App(props){
 return (
<>
<LinearProgress /> 
<br/>
<LinearProgress variant="determinate" value={80} color="warning"/>
   </>)
}

export default React.memo(App)