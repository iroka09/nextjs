import React from "react";
import Pagination from "@mui/material/Pagination";


function App(props){
  const [value, setValue] = React.useState(30)
 return (
<>
<center>{value}</center>
<br />
<Pagination 
    count={100} 
    showFirstButton 
    showLastButton 
    color="secondary" 
    defaultPage={value} 
    siblingCount={3} 
    boundaryCount={5} 
    onChange={(e, val)=>setValue(val)}
    />
   </>)
}

export default React.memo(App)