
import React from "react"
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';


Slide.props = {
  direction: "right"
}


function App(){
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen1 = () =>{
    setOpen1(true)
  }
  const handleClose1 = () =>{
    setOpen1(false)
  }
  const handleOpen2 = () =>{
    setOpen2(true)
  }
  const handleClose2 = () =>{
    setOpen2(false)
  }
  return (
  <>
<Stack spacing={2} sx={{justifyContent: "center"}} direction="row">
<Button color="info" variant="outlined" onClick={handleOpen1} size="small">
 With alert
</Button>
<Button color="info" variant="outlined" onClick={handleOpen2} size="small">
 Only Snackbar
</Button>
</Stack>

<Snackbar 
    anchorOrigin={{ 
      vertical: "bottom", 
      horizontal: "center"
    }}
    open={open1} 
    autoHideDuration={3000}
    onClose={handleClose1} 
    key={865}
    TransitionComponent={Slide}>
      <Alert 
          severity="success" 
          sx={{ width: '100%' }}
          action={
            <IconButton 
              color="success" 
              size="small"
              onClick={handleClose1}>
                <CloseIcon />
            </IconButton>
          }> 
            This is a success message! 
            This is a success message! 
            This is a success message! 
            This is a success message! 
            This is a success message! 
            This is a success message! 
            This is a success message! 
      </Alert>
</Snackbar>

<Snackbar 
    anchorOrigin={{ 
      vertical: "bottom", 
      horizontal: "center"
    }}
    open={open2}
    autoHideDuration={3000}
    onClose={handleClose2} 
    key={6656}
    action={
      <>
        <Button 
          color="inherit" 
          size="small">
              Undo
        </Button>
        <IconButton 
          color="secondary" 
          size="small"
          sx={{ml:0.5}}
          onClick={handleClose2}>
            <CloseIcon />
        </IconButton>
      </>
    }
    message="A snackbar without Alert snackbar without Alert snackbar without Alert snackbar without Alert snackbar without Alert snackbar without Alert snackbar without Alert"
  />
</>)
}

export default React.memo(App)
