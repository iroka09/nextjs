import React, {
  useState,
  useEffect
} from "react";
import Head from "next/head"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import InputBase from "@mui/material/InputBase"
import Alert from "@mui/material/Alert"
import Typography from "@mui/material/Typography"
import AppBar from "@mui/material/AppBar"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Drawer from '@mui/material/Drawer';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import * as colors from '@mui/material/colors';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Zoom from '@mui/material/Zoom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PaletteIcon from '@mui/icons-material/Palette';
import MenuIcon from '@mui/icons-material/Menu';
import TreeItem from '@mui/lab/TreeItem';
import {
  ThemeProvider,
  createTheme,
  experimental_sx as sx
} from "@mui/material/styles"
import {
  Provider
} from "react-redux"
import {
  CookiesProvider,
  useCookies
} from "react-cookie"
import reduxStore from "../components/redux/store"

import "../styles/global_style.css";
import "../styles/calendar.css";

const cookieOptions = {
  maxAge: 60*60*24*30 //1 month
}



function App( {
  Component, pageProps
}) {

  const [isDrawerOpen,
    setIsDrawerOpen] = React.useState(false);
  
  const [isPaletteIn, setIsPaletteIn] = React.useState(false);
  
  const [themeCode,
    setThemeCode] = React.useState(pageProps.cookies?.themeCode);

  const [appliedTheme,
    setAppliedTheme] = React.useState(themeCode?.split("_index=")[0])

  const [selectedThemeCodeIndex,
    setSelectedThemeCodeIndex] = React.useState(+(themeCode?.split("_index=")[1] || Infinity));

  const [isCookieDrawerOpen,
    setIsCookieDrawerOpen] = React.useState(false);

  const [acceptedCookiePolicy,
    setAcceptedCookiePolicy] = React.useState(pageProps.cookies?.acceptedCookiePolicy);

  const [isDarkMode,
    setDarkMode] = useState(pageProps.cookies?.isDarkMode);

  const [cookies,
    setCookie,
    removeCookie] = useCookies([]) //dependency array of cookie names that should re-render this component when changed. e.g ["isDarkMode", "themeCode"]

  const [anchorEl,
    setAnchorEl] = React.useState();

  const ele = React.useRef();

  const isThemeCodesMenuOpen = Boolean(anchorEl);

  const handleThemeCodesMenu = () => {
    setAnchorEl(ele.current);
  };

  const handleAppliedTheme = ()=> {
    setAppliedTheme(themeCode?.split("_index=")[0]);
    setCookie("themeCode", themeCode, cookieOptions);
  }

  const handleCloseThemeCodesMenu = (byButton, hex, i) => {
    if (byButton === true) {
      setSelectedThemeCodeIndex(i)
      setThemeCode(hex+"_index="+i)
    }
    setAnchorEl(null);
  };

  const handleAcceptCookiePolicy = ()=> {
    setAcceptedCookiePolicy(true);
    setCookie("acceptedCookiePolicy", "yes", cookieOptions);
  }

  const Stack = React.useMemo(()=> {
    let myStack = []
    for (let color in colors) {
      for (let x = 100; x < 1000;) {
        let hex = colors[color][x];
        if (hex?.trim()) {
          myStack.push({
            colorName: color,
            colorCode: hex,
          })
        }
        x += 100;
      }
    }
    return myStack
  },
    []);

  const theme = React.useMemo(()=>(
    createTheme({
      palette: {
        mode: isDarkMode? "dark": "light",
        ...(appliedTheme?
          {
            primary: {
              main: appliedTheme
            }
          }: {})
      },
      typography: {
        fontFamily: '"Dosis", "Smooch Sans", "Roboto", "Helvetica", "Arial", sans-serif',
        button: {
          textTransform: "initial"
        }
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              border: "none"
            }
          }
        },
        MuiButton: {
          defaultProps: {
            disableRipple: false,
            //variant: "outlined"
          }
        }
      }
    })
  ),
    [isDarkMode,
      appliedTheme]);

  const disableScroll = ()=> {
    document.body.style.overflow = "hidden"
  }

  const enableScroll = ()=> {
    document.body.style.overflow = "initial"
  }

  //accept cookie policy prompt
  React.useEffect(()=> {
    if (!acceptedCookiePolicy) {
      let fn = setTimeout(function() {
        setIsCookieDrawerOpen(true);
        disableScroll();
      }, 6000);
      return ()=>clearTimeout(fn)
    }
  });

  const appBarColor = sx((x)=> {
    //console.log(x);
    return ({
      color: (theme.palette.mode === "dark")? "#888": "primary.contrastText"
    })
  })

  return (
    <ThemeProvider theme={theme}>
  <Provider store={reduxStore}>
  <CookiesProvider>
    <Head>
      <title>{pageProps.title}</title>
      {
        (pageProps.title?.toLowerCase()==="e-commerce") && 
          <>
            <meta property="og:image" content="http://irokanextapp.herokuapp.com/ecommerce/shirt1.jpg" /> 
            <meta property="og:type" content="article" />
            <meta property="og:locale" content="en_GB" />
            <meta property="og:description" content="Reactjs Project on E-Commerce using NextJS and Material-UI by Iroka Tochukwu C" />
          </>
        }
    </Head>
    <CssBaseline />

  <AppBar sx={ {
      px: 1,
      py: 0.6
    }}>
    <div style={ { display: "flex",
        alignItems: "center" }}>
      <IconButton sx={appBarColor} onClick={()=>setIsDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <div style={ {
          padding: "0 20px",
          borderRadius: 4,
          maxWidth: "70%",
          backgroundColor: "rgba(225,225,225,0.14)",
          marginLeft: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <InputBase placeholder="Search word..." sx={appBarColor} />
      </div>
      <IconButton
        sx={{ml:"auto", ...appBarColor}}
        onClick={()=> {
          if (isDarkMode) {
            setDarkMode(false)
            removeCookie("isDarkMode")
          } else {
            setDarkMode(true)
            setCookie("isDarkMode", "yes", cookieOptions)
          }
        }}>
        {(isDarkMode)? <LightModeIcon />: <DarkModeIcon />}
      </IconButton>
      <Divider sx={ { m: "0 3px",
          backgroundColor: appBarColor.color,
          height: 22 }} orientation="vertical" />
      <IconButton onClick={()=>setIsPaletteIn(x=>!x)}>
        <PaletteIcon/>  
      </IconButton>
    </div>
    <Collapse in={isPaletteIn}>
  <div style={ {
        margin: "10px 0 30px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        color: "white"
      }}>
  <ButtonGroup
        variant="text"
        >
    <Button
          sx={ { flex: 1, color: "white" }}
          ref={ele}
          onClick={handleAppliedTheme}
          >
      Apply
    </Button>
    <Button size="small" sx={ { px: "1px" }} onClick={handleThemeCodesMenu}>
      <span style={ { color: themeCode?.split("_index=")[0] || "black",
            marginBottom: 10, textShadow: "0.5px 0.5px 1px white" }}>
        <span style={{color:"#fff"}}>
        {(isThemeCodesMenuOpen)? <KeyboardArrowUpIcon />: <KeyboardArrowDownIcon />}
        </span>
      {(themeCode?.split("_index=")[0] || "select theme")?.toUpperCase()}
      </span>
    </Button>
    </ButtonGroup>
    <Menu
        anchorEl={anchorEl}
        open={isThemeCodesMenuOpen}
        onClose={handleCloseThemeCodesMenu}
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={ {
          vertical: 'top',
          horizontal: 'center',
        }}
        transitionComponent={Zoom}
        >
      {
        Stack.map((_color, i)=>(
          <li
            key={i}
            style={ {
              color: _color.colorCode,
              padding: "3px 5px",
              ...((selectedThemeCodeIndex === i)? {
                backgroundColor: "#eee"
              }: {})}}
            onClick={()=>handleCloseThemeCodesMenu(true, _color.colorCode, i)}
            >
          {_color.colorName+" | "+_color.colorCode}
          </li>
        ))
        }
      </Menu>
    </div>
    </Collapse>
  </AppBar>
      <Container>

  <div style={ { height: 60 }}></div>

  <noscript style={ { display: "block",
        margin: "5px auto" }}>
    <Alert
        variant="outlined"
        severity="error"
        >
      Your browser doesn't support Javascript, some functionalities won't work, please upgrade your browser.
    </Alert>
  </noscript>
  <Component {...pageProps} />
  </Container>
  <footer style={ { backgroundColor: theme.palette.divider,
      padding: "5px" }}>
    <Typography color="primary">
      Customer Care
    </Typography>
    <Typography>
      +2349014864168
    </Typography>
    <br /> <br />
   <div style={{display:"flex", justifyContent:"center"}}> &copy; 2021 - {new Date().getFullYear()} </div>
    </footer>


      <SwipeableDrawer
      anchor="left"
      open={isDrawerOpen}
      onClose={()=> {
        setIsDrawerOpen(false);
        enableScroll();
      }}
      onOpen={()=> {
        setIsDrawerOpen(true);
        disableScroll()
      }}
      >
    
        <Button href="/" >Home</Button>
        <Button href="/calendar" >Calendar</Button>
        <Button href="/login" >Login</Button>
        <Button href="/ecommerce" >E-Commerce</Button>
    
      </SwipeableDrawer>

      <Drawer
      anchor="bottom"
      open={isCookieDrawerOpen}
      onClose={()=> {
        setIsCookieDrawerOpen(false);
        enableScroll()
      }}
      onOpen={()=> {
        setIsCookieDrawerOpen(true);
        disableScroll()
      }}
      >
        <div style={ { padding: "3px" }}>
          <center style={ { padding: "10px 0",
        fontWeight: 400 }}>Accept Cookies</center>
          <Divider />
  <div style={ { margin: "30px auto",
        width: "90%" }}>
   We use Cookies to remember our users' settings preference.
      </div>
  <div style={ { display: "flex",
          justifyContent: "space-around" }} onClick={()=>setIsCookieDrawerOpen(false)}>
    <Button
          sx={ { color: "#aaa" }}
          fullWidth
          sx={ { borderRadius: 0,
            color: "#777" }}
          >Cancel</Button>
    <div>
    <Divider orientation="vertical" />
        </div>
    <Button
          onClick={handleAcceptCookiePolicy}
          fullWidth
          sx={ { borderRadius: 0 }}
          >Accept</Button>
      </div>
      </div>
      </Drawer>

    </CookiesProvider>
    </Provider>
    </ThemeProvider>
  )}

export default App