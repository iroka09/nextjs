import React from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import MailIcon from '@mui/icons-material/Mail';

function App(props){
 return (
<Box display="flex" justifyContent="center">
 <Badge badgeContent={1000} color="error">
  <MailIcon />
</Badge> &emsp; 
<Badge badgeContent={1000} max={999} 
color="info"
anchorOrigin={{
  vertical: "bottom",
  horizontal: "right"
}}>
  <MailIcon />
</Badge>
</Box>
   )
}

export default React.memo(App)