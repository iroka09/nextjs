
import React, {useState, useEffect} from "react";
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
import TextField from '@mui/material/TextField';
import * as colors from '@mui/material/colors';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Zoom from '@mui/material/Zoom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import TreeItem from '@mui/lab/TreeItem';
import {ThemeProvider, createTheme} from "@mui/material/styles"
import {Provider} from "react-redux"
import {CookiesProvider, useCookies} from "react-cookie"
import reduxStore from "../components/redux/store"
import "../styles/global_style.css";




function App({Component, pageProps}){
  
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  
  const [themeCode, setThemeCode] = React.useState(pageProps.cookies?.themeCode.split("_index=")[0]);
  
  const [appliedTheme, setAppliedTheme] = React.useState(themeCode)
  
  const [selectedThemeCodeIndex, setSelectedThemeCodeIndex] = React.useState(+(pageProps.cookies?.themeCode.split("_index=")[1] || Infinity));
  
  const [isCookieDrawerOpen, setIsCookieDrawerOpen] = React.useState(false);
  
  const [acceptedCookiePolicy, setAcceptedCookiePolicy] = React.useState(pageProps.cookies?.acceptedCookiePolicy);
  
  const [isDarkMode, setDarkMode] = useState(pageProps.cookies?.isDarkMode);
  
  const [cookies, setCookie, removeCookie] = useCookies([]) //dependency array of cookie names that should re-render this component when changed. e.g ["isDarkMode", "themeCode"]

  const [anchorEl, setAnchorEl] = React.useState();
  
  const ele = React.useRef();
  const isThemeCodesMenuOpen = Boolean(anchorEl);
  const handleThemeCodesMenu = (event) => {
    setAnchorEl(ele.current);
  };
  
  const handleAppliedTheme = ()=>{
    setAppliedTheme(themeCode)
  }
  
  const handleCloseThemeCodesMenu = (byButton,hex,i) => {
    if(byButton===true) {
      setSelectedThemeCodeIndex(i)
      setThemeCode(hex)
      setCookie("themeCode", hex+"_index="+i)
    }
    setAnchorEl(null);
  };
  
  const handleAcceptCookiePolicy = ()=>{
    setAcceptedCookiePolicy(true);
    setCookie("acceptedCookiePolicy", "yes");
  }

const list = React.useMemo(()=>{
let myList = []
for(let color in colors){
  for(let x = 700; x<1000; ){
    let colorCode = colors[color][x];
    if(colorCode?.trim()){
      myList.push({
        colorName: color,
        colorCode
      })
    }
    x += 100;
  }
}
return myList
}, []);

const theme = React.useMemo(()=>{ 
  return createTheme({
  palette: {
    mode: (isDarkMode)? "dark" : "light",
    ...((appliedTheme)? 
      {
        primary: {
          main: appliedTheme
        }
      } : {})
  }
})
}, [isDarkMode, appliedTheme]);
    
  const disableScroll = ()=>{
    document.body.style.overflow = "hidden"
  }
  
  const enableScroll = ()=>{
    document.body.style.overflow = "initial"
  }
  
  

//apply dark mode on <body> tag
  React.useLayoutEffect(()=>{
   document.body.style.backgroundColor = theme.palette.mode==="dark"?theme.palette.background.default:"#F1F1F1";
   document.body.style.color = theme.palette.text.secondary;
  },[isDarkMode]);
  
  
  //accept cookie policy prompt
  React.useEffect(()=>{
    if(!acceptedCookiePolicy) {
      let fn = setTimeout(function() {
        setIsCookieDrawerOpen(true);
        disableScroll();
      }, 2000);
      return ()=>clearTimeout(fn)
    }
  })
  
  return (
  <ThemeProvider theme={theme}>    
  <Provider store={reduxStore}>    
  <CookiesProvider>    
    <Head>
      <title>{pageProps.title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    </Head>

  <AppBar sx={{
    px: 1, 
    py: 0.6
  }}>
    <div style={{display:"flex",alignItems:"center"}}>
      <IconButton sx={{color: "primary.contrastText"}} onClick={()=>setIsDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <div style={{
        padding: "0 20px",
        borderRadius: 4,
        backgroundColor: "rgba(225,225,225,0.14)",
        marginLeft:2,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
      }}>
        <InputBase placeholder="Search word..." sx={{my:"3px", color: "primary.contrastText"}}/>
      </div>
      <IconButton 
        sx={{ml: "auto", color: "primary.contrastText"}} 
        onClick={()=>{
          if(isDarkMode){
            setDarkMode(false)
            removeCookie("isDarkMode")
          }
          else {
            setDarkMode(true)
            setCookie("isDarkMode", "yes")
          }
      }}>
        {(isDarkMode)? <LightModeIcon/> : <DarkModeIcon/>}
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
      Your browser doesn't support Javascript, some functionalities won't work, please upgrade your browser.
    </Alert>
  </noscript>
  
  <div style={{
    margin:"10px 0 30px", 
    display:"flex", 
    alignItems:"center",
    flexDirection:"column"
  }}>
  <code style={{color:themeCode||"black",marginBottom:10}}>
  {(themeCode||"Please select theme")?.toUpperCase()}
  </code>
  <ButtonGroup
    variant="text"
  >
    <Button 
      sx={{flex: 1}} 
      ref={ele}
      onClick={handleAppliedTheme}
      >
      Apply
    </Button>
    <Button size="small" sx={{px:"1px"}} onClick={handleThemeCodesMenu}>
       {(isThemeCodesMenuOpen)? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon />}
    </Button>
    </ButtonGroup>
    <Menu
        anchorEl={anchorEl}
        open={isThemeCodesMenuOpen}
        onClose={handleCloseThemeCodesMenu}
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
              selected={selectedThemeCodeIndex===i}
              onClick={()=>handleCloseThemeCodesMenu(true,_color.colorCode, i)}
              sx={{color:_color.colorCode}}
          >
          {_color.colorName+" | "+_color.colorCode}
          </MenuItem>
        ))
      }
      </Menu>
    <p>After selecting theme from the theme menu, press on the APPLY button to apply.</p>
    </div>
  
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
      onClick={handleAcceptCookiePolicy}
      fullWidth
      sx={{borderRadius:0}}
    >Accept</Button>
  </div>
  </div>
</Drawer>

</CookiesProvider>
</Provider>
</ThemeProvider>
)}

export default App
