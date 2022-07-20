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
import Stack from "@mui/material/Stack"
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import {useTheme} from "@mui/material/styles"
//Icons
import AccountCircle from "@mui/icons-material/AccountCircle"
import Key from "@mui/icons-material/Key"
import Menu from "@mui/icons-material/Menu"
import Search from "@mui/icons-material/Search"
import Send from "@mui/icons-material/Send"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { LoremIpsum } from "lorem-ipsum";
import Highlight from "react-highlight"

const lorem = new LoremIpsum();
import dynamic from "next/dynamic";

const useGoogleOneTapLogin = dynamic(()=> import('react-google-one-tap-login').then(x=>x.useGoogleOneTapLogin), {
  ssr: false,
  loading: "Loading..."
})



export default function App(props) {
  const theme = useTheme();
  const [googleUser, setGoogleUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoging, setIsLoging] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [googleLoginError, setGoogleLoginError] = useState();
  
  
  
  useGoogleOneTapLogin({
    onError: error=> setGoogleLoginError(error),
    onSuccess: user=> setGoogleUser(user),
    googleAccountConfigs: {
      client_id: "910193991072-542kbb03f4b1o8th2k2bui06u8eh9jng.apps.googleusercontent.com",
    },
  });
  
  const handleUsername = (e)=>{
    let x = e.target.value;
    setUsername(x)
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
  
  const myLorem = React.useMemo(()=>(
    lorem.generateSentences(15)
    ), [])
  
  return(
<>
<h1>{props.name}</h1>
  <Paper sx={{
    px:1,
    display: "flex",
    alignItems:"center",
    maxWidth: {
      xs: "100%",
      sm: "500px",
    },
    mx: "auto",
    mt: 0,
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
        maxWidth: "500px",
        pt: 3,
        pb: 2,
        my:8,
        mx:"auto"
      }}
    >
    <form style={{width: "85%"}} action="/login" method="post" encType="multipart/form-data">
      <TextField
        sx={{
          mb: 2
        }}
        variant="outlined"
        label="Username"
        placeholder="Enter username..."
        value={username}
        onChange={handleUsername}
        fullWidth
      />
      <TextField
        sx={{
          mb: 2
        }}
        variant="outlined"
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
      <FormControlLabel 
        label="Remember me" 
        arial-label="remember-user"
        control={<Switch onClick={(e)=>setRememberMe(x=>!x)} checked={rememberMe}/>} 
      />
      <Button 
        variant="contained"
        type="submit"
        sx={{
          mt: 1,
        }}
        fullWidth
        onClick={handleSubmit}
      >
       {(isLoging)? <CircularProgress sx={{color:"#eee"}} size={24}/> : "Login"}
      </Button>
      <Divider sx={{my: 3}}>OR</Divider>
      <Button
        color="success"
        fullWidth
        href="/"
      >
        Create Account
      </Button>
    </form>
  </Paper>
  <p>{/*myLorem*/}</p>
  {(Object.keys(googleUser).length > 0)?
  <Highlight>{googleUser}</Highlight> :
  <h3>Login first</h3>
  }
  <italic>{googleLoginError}</italic>
  </>
    )
}


export async function getServerSideProps({req, res, ...context}) {
  // let date = new Date("1/jan/2021").toUTCString();
 // res.setHeader("Set-Cookie","myName=; expires="+date)
 //  console.log(req)
  return ({
    props: {
      title: context.resolvedUrl.substr(1).toUpperCase(),
      cookies: req.cookies,
      name: req.name || "No name"
    }
  })
}




/*
export async function getStaticProps(context) { 
console.log("\n\nstatic\n",context)
  return ({
    props: {
      server: Math.random() // this cannot be object{} but can be any other data type
    }
  })
}
*/