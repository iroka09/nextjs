import React, {useState} from "react"
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


function App(){
  
  const [showBackdrop, setShowBackdrop] = useState(false);
  
  return (
    <>
  <Button onClick={()=>setShowBackdrop(true)}>Show backdrop</Button>

<Backdrop
  sx={{ 
    color: '#fff',
    zIndex: (theme) => {
      let x = theme.zIndex.drawer;
      return x + 1
    }
  }}
  open={showBackdrop}
  onClick={()=>setShowBackdrop(false)}
>
  <CircularProgress color="inherit" size={30} disableShrink/>
</Backdrop>

</>
)}

export default React.memo(App)