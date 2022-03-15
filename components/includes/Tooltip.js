
import React from "react";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';

function App(){
  return (
    <>
 <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="Add"
        arrow
        onOpen={null}
        onClose={null}
      >
        <Button>Fade</Button>
      </Tooltip>
      <Tooltip placement="bottom" TransitionComponent={Zoom} title="Add" sx={{background: "#eee"}}>
        <Button>Bottom Zoom</Button>
      </Tooltip>
    </>)
}

export default React.memo(App)