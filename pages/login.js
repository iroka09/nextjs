import React, {useState, useEffect} from "react";
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import InputAdornment from "@mui/material/InputAdornment"
import CircularProgress from "@mui/material/CircularProgress"
import AccountCircle from "@mui/icons-material/AccountCircle"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

function App(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoging, setIsLoging] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  
  const handleUsername = (e)=>{
    let x = e.target.value;
    setUsername(x)
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    setIsLoging(true)
    setTimeout(function() {
      setIsLoging(false)
      alert(JSON.stringify({username,password}, 0, 2))
    }, 3000);
  }
  
  const handlePassword = (e)=>{
    let x = e.target.value;
    setPassword(x)
  }
  
  const handlePasswordVisibility = ()=>{
    setIsPassword(x=>!x)
  }
  
  useEffect(()=>{
 //   alert(document.documentElement.innerHTML)
 alert(JSON.stringify(props.headers, 0, 2))
  }, [])
  
  return(
  <div 
    style={{
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        maxWidth: "90vw",
        py: 3
      }}
    >
    <form style={{width: "90%"}}>
      <Typography 
        component="div"
        color="primary"
        variant="h5"
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        Login
      </Typography>
      <TextField
        sx={{
          mb: 2
        }}
        variant="standard"
        label="Username"
        placeholder="Enter username..."
        value={username}
        onChange={handleUsername}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        sx={{
          mb: 2
        }}
        variant="standard"
        label="Password"
        placeholder="Enter password..."
        type={isPassword?"password":"text"}
        value={password}
        onChange={handlePassword}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                onClick={handlePasswordVisibility}
                sx={(theme)=>({
                  color: theme.palette.primary.main
                })}>
                {isPassword? <Visibility sx={{color: "#777"}} /> : <VisibilityOff sx={{color: "#777"}}/>}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button 
        variant="contained"
        type="submit"
        sx={(theme)=>({
          mt: 1,
          boxShadow: `0 2px 1px ${theme.palette.primary.light}`,
          "&:hover": {
            boxShadow: `0 15px 24px -6px ${theme.palette.primary.light}`,
          }
        })}
        fullWidth
        onClick={handleSubmit}
      >
       {(isLoging)? <CircularProgress sx={{color:"#eee"}} size={24}/> : "Login"}
      </Button>
    </form>
    </Paper>
  </div>
    )
}


export default App


export async function getServerSideProps({req,res}) {
  return ({
    props: {headers: req.headers}, // will be passed to the page component as props
  })
}