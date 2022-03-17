import React, {useState, useEffect} from "react";
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import InputAdornment from "@mui/material/InputAdornment"
import CircularProgress from "@mui/material/CircularProgress"
import Divider from "@mui/material/Divider"
import InputBase from "@mui/material/InputBase"
import AppBar from "@mui/material/AppBar"
import Stack from "@mui/material/AppBar"
//Icons
import AccountCircle from "@mui/icons-material/AccountCircle"
import Key from "@mui/icons-material/Key"
import Menu from "@mui/icons-material/Menu"
import Search from "@mui/icons-material/Search"
import Send from "@mui/icons-material/Send"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

export default function App(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoging, setIsLoging] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const handleUsername = (e)=>{
    let x = e.target.value;
    setUsername(x)
  }
  
  const handleDrawer = (bool)=>{
    setIsDrawerOpen(book)
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    setIsLoging(true)
    setTimeout(function() {
      setIsLoging(false)
     // alert(JSON.stringify({username,password}, 0, 2))
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
// alert(JSON.stringify(props.x, 0, 2))
  }, [])
  
  return(
<>
  <AppBar sx={{px:1, py:0.6,"& *":{color:"#fff"}}}>
    <div style={{display:"flex"}}>
      <IconButton onClick={()=>setIsDrawerOpen(true)}>
        <Menu />
      </IconButton>
      <div style={{
        padding: "0 45px",
        borderRadius:3,
        backgroundColor:"#fff",
        opacity:0.6,
        marginLeft:2,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        color: "black"
      }}>
        <InputBase placeholder="Search word..." sx={{m:0}}/>
      </div>
    </div>
  </AppBar>
  

  <Paper sx={{
    px:1,
    display: "flex",
    alignItems:"center",
    maxWidth: "80%",
    mx: "auto",
    mt: 8,
    color: "#888"
  }}>
      <Search />
      <Divider orientation="vertical" sx={{height:22, mx:1}} />
      <InputBase placeholder="Search word..." sx={{mr:1}}/>
      <IconButton sx={{ml:"auto"}}>
        <Send />
      </IconButton>
  </Paper>
  
  
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        maxWidth: "90vw",
        py: 3,
        mt:16,
        mx:"auto"
      }}
    >
    <form style={{width: "85%"}}>
      <Typography 
        component="div"
        color="primary"
        variant="h5"
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4
        }}
      >
        Login
      </Typography>
      <TextField
        sx={{
          mb: 2
        }}
        variant="contained"
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
        variant="contained"
        label="Password"
        placeholder="Enter password..."
        type={isPassword?"password":"text"}
        value={password}
        onChange={handlePassword}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Key />
            </InputAdornment>
          ),
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
            boxShadow: `0 25px 27px -8px ${theme.palette.primary.light}`,
          }
        })}
        fullWidth
        onClick={handleSubmit}
      >
       {(isLoging)? <CircularProgress sx={{color:"#eee"}} size={24}/> : "Login"}
      </Button>
    </form>
  </Paper>

<SwipeableDrawer
  anchor="left"
  open={isDrawerOpen}
  onClose={()=>setIsDrawerOpen(false)}
  onOpen={()=>setIsDrawerOpen(true)}
>
<div style={{
    padding: "0 50px",
  }}>
  <h4>Put lists here</h4>
</div>
</SwipeableDrawer>

  </>
    )
}


/*
export async function getStaticPaths(context) { 
  console.log(Object.keys(context), context);
  console.log("====loaded again====");
  console.log(Math.random(), "\n\n\n\n\n\n");
  return ({
    paths: [{age: 26}],
    fallback: true// will be passed to the page component as props
  })
}
*/