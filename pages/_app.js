
//this wraps around all the pages


import React from "react";
import Head from "next/head"
import IconButton from "@mui/material/IconButton"
import InputBase from "@mui/material/InputBase"
import AppBar from "@mui/material/AppBar"
import Menu from "@mui/icons-material/Menu"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as colors from '@mui/material/colors';
import {ThemeProvider, createTheme} from "@mui/material/styles"
// import "../components/tailwind/output.css"
// import "../components/tailwind/mycustom.css"


const theme = createTheme({
  palette: {
    primary: {
      main: colors.red[800]
    }
  }
})

function App({Component, pageProps}){
  
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  React.useEffect(()=>{
  //  alert(JSON.stringify(pageProps,0,2))
  },[]);
  
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Testing NextJS</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@524&display=swap" rel="stylesheet" />
        <link href="/global_style.css" rel="stylesheet" />
      </Head>
      
      
  <AppBar sx={{
    px:1, 
    py:0.6
  }}>
    <div style={{display:"flex",alignItems:"center"}}>
      <IconButton onClick={()=>setIsDrawerOpen(true)}>
        <Menu />
      </IconButton>
      <div style={{
        padding: "0 20px",
        borderRadius:4,
        backgroundColor: theme.palette.primary.light,
        marginLeft:2,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        color: "black"
      }}>
        <InputBase placeholder="Search word..." sx={{my:"3px"}}/>
      </div>
    </div>
  </AppBar>
  

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

      
      <Component {...pageProps} />
    
    </ThemeProvider>
    )
}

export default App
