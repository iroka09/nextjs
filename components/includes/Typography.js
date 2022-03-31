
import React from "react"
import Typography from '@mui/material/Typography';

function App(prop){
return (
<Typography 
  variant="h4"
  component="u"
  color="secondary">
   {prop.text}  
</Typography>
)}

export default App