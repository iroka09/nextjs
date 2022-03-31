import React, {useState} from "react"
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';

function App(){
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  
  function loadSkeleton(){
  setTimeout(function() {
    setLoadingSkeleton((x)=>!x)
  }, 2000);
}
  
return (
<>
{(loadingSkeleton)? (
  <>
<Skeleton variant="text" width={210} />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width={210} height={118} animation="wave"/>
<br/>
<h6>Loading...</h6>
</>
) : (
  <>
<h4>Loaded (Done)</h4>
</>
)}
<Button variant="outlined" color="secondary" onClick={loadSkeleton}>
Toggle Load
</Button>
</>
)}

export default React.memo(App)