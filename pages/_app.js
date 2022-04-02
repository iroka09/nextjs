
import React from "react";
import Head from "next/head"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import InputBase from "@mui/material/InputBase"
import Alert from "@mui/material/Alert"
import AppBar from "@mui/material/AppBar"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Drawer from '@mui/material/Drawer';
import * as colors from '@mui/material/colors';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Zoom from '@mui/material/Zoom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import TreeItem from '@mui/lab/TreeItem';
import * as Mui from "@mui/material/styles"
import * as Redux from "react-redux"
import reduxStore from "../components/redux/store"
import "../styles/global_style.css";




function App({Component, pageProps}){
  
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  
  const [isCookieDrawerOpen, setIsCookieDrawerOpen] = React.useState(false);
  
  const [acceptedCookie, setAcceptedCookie] = React.useState(false);
  
  const [isDark, setIsDark] = React.useState(false);
  
  const [myColor, setMyColor] = React.useState();
  
  const disableScroll = ()=>{
    document.body.style.overflow = "hidden"
  }
  
  const enableScroll = ()=>{
    document.body.style.overflow = "initial"
  }
  
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const ele = React.useRef();
  const isMenuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(ele.current);
  };
  const handleClose = (byButton,colorCode, i) => {
    if(byButton===true) {
      setMyColor(colorCode)
    }
    setAnchorEl(null);
  };

let list = []
for(let color in colors){
  for(let x = 50; x<1000; ){
    let colorCode = colors[color][x];
    if(colorCode?.trim()){
      list.push({
        colorName: color,
        colorCode
      })
    }
    if(x===50) x = 100;
    else x=x+100;
  }
}

const theme = React.useMemo(()=>{
  return (
Mui.createTheme({
  palette: {
    mode: isDark?"dark":"light",
    ...((myColor)? 
      {
        primary: {
          main: myColor
        }
      } : {})
  }
})
)}, [isDark, myColor]);

  React.useEffect(()=>{
   document.body.style.backgroundColor = theme.palette.mode=="dark"?theme.palette.background.default:"#f3f3f3";
   document.body.style.color = theme.palette.text.secondary;
  },[isDark]);
  
  React.useEffect(()=>{
    if(!acceptedCookie) {
      let fn = setTimeout(function() {
        setIsCookieDrawerOpen(true);
        disableScroll();
      }, 2000);
      return ()=>clearTimeout(fn)
    }
  })
  
  const acceptCookieFn = ()=>{
    setAcceptedCookie(true);
    //setIsCookieDrawerOpen(false)
  }
  
  return (
  <Mui.ThemeProvider theme={theme}>    
  <Redux.Provider store={reduxStore}>    
    <Head>
      <title>{pageProps.title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    </Head>

  <AppBar sx={{
    px:1, 
    py:0.6
  }}>
    <div style={{display:"flex",alignItems:"center"}}>
      <IconButton onClick={()=>setIsDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <div style={{
        padding: "0 20px",
        borderRadius: 4,
        backgroundColor: "rgba(225,225,225,0.1)",
        marginLeft:2,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        color: "black"
      }}>
        <InputBase placeholder="Search word..." sx={{my:"3px"}}/>
      </div>
      <IconButton sx={{ml: "auto"}} onClick={()=>setIsDark(x=>!x)}>
        {isDark? <LightModeIcon/> : <DarkModeIcon/>}
      </IconButton>
    </div>
  </AppBar>
  
<Container>

  <div style={{height:60}}></div>
  

  <noscript style={{display:"block", margin: "2px auto"}}>
    <Alert 
      variant="outlined" 
      severity="error"
      >
      Your browser doesn't support Javascript, some functionalities may not work, please upgrade your browser.
    </Alert>
  </noscript>
  
  <center style={{margin:"10px 0"}}>
  <ButtonGroup>
    <Button sx={{flex: 1}} ref={ele}>
        {myColor||"SELECT"}
    </Button>
    <Button size="small" sx={{px:"1px"}} onClick={handleClick}>
        <KeyboardArrowDownIcon />
    </Button>
    </ButtonGroup>
    <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      transitionComponent={Zoom} 
      >
      {
        list.map((_color, i)=>(
          <MenuItem 
              key={i}
              selected={index===i}
              onClick={()=>handleClose(true,_color.colorCode, i)}
              sx={{color:_color.colorCode}}
          >
          {_color.colorName+" | "+_color.colorCode}
          </MenuItem>
        ))
      }
      </Menu>
    </center>
  
  <Component {...pageProps} />

</Container>

<SwipeableDrawer
  anchor="left"
  open={isDrawerOpen}
  onClose={()=>{
    setIsDrawerOpen(false);
    enableScroll();
  }}
  onOpen={()=>{
    setIsDrawerOpen(true);
    disableScroll()
  }}
>
    <TreeView
      aria-label="multi-select"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
      sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
        <TreeItem nodeId="3" label="Chrome" />
        <TreeItem nodeId="4" label="Webstorm" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="6" label="MUI">
          <TreeItem nodeId="7" label="src">
            <TreeItem nodeId="8" label="index.js" />
            <TreeItem nodeId="9" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
</SwipeableDrawer>

<Drawer
  anchor="bottom"
  open={isCookieDrawerOpen}
  onClose={()=>{
    setIsCookieDrawerOpen(false);
    enableScroll()
  }}
  onOpen={()=>{
    setIsCookieDrawerOpen(true);
    disableScroll()
  }}
>
<div style={{padding: "3px"}}>
<center style={{padding:"10px 0", fontWeight:400}}>Cookie Policy</center>
<Divider />
  <div style={{margin:"30px auto",width: "90%"}}>
   We use Cookies to store our users' choice.
  </div>
  <div style={{display:"flex",justifyContent:"space-around"}} onClick={()=>setIsCookieDrawerOpen(false)}>
    <Button 
      sx={{color:"#aaa"}}
      fullWidth
      sx={{borderRadius:0,color:"#777"}}
      >Cancel</Button>
    <div>
    <Divider orientation="vertical" />
    </div>
    <Button 
      onClick={acceptCookieFn}
      fullWidth
      sx={{borderRadius:0}}
    >Accept</Button>
  </div>
  </div>
</Drawer>

</Redux.Provider>
</Mui.ThemeProvider>
)}

export default App
