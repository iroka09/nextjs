import React, {useState} from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {blue} from "@mui/material/colors";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
//icons
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {useSelector} from 'react-redux';

const anchor = "left"


function App(props){
  const {value: reduxValue} = useSelector(state=>state.myCounter)
  //alert("appbar")
const toggleDrawer = (anchor, val, x) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) return;
    setState({ ...state, [anchor]: val });
  };
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  
  const [ele, setEle] = useState(null)
  const handleOptionsOpen = (e)=>{
    setEle(e.currentTarget)
  }
  const handleOptionsClose = (e)=>{
    setEle(null)
  }

  return (
<>
<AppBar position="fixed">
  <Toolbar>
    <IconButton edge="start" color="inherit" onClick={toggleDrawer(anchor, true)}>
      <MenuIcon />
    </IconButton>
    <Typography variant="body2" color="inherit" component="div" sx={{flexGrow:1}} noWrap>
      reduxValue ({reduxValue})
    </Typography>
    <Box 
      sx={{
        display: {
          xs: "none",
          md: "block"
        }
      }}>
    <IconButton sx={{color: "white"}}>
      <AccountCircleIcon />
    </IconButton>
    <IconButton sx={{ml:1, color: "white"}}>
      <LogoutIcon />
    </IconButton>
    </Box>
    <IconButton 
      edge="end" 
      color="inherit"
      sx={{
        display: {
          sm: "block",
          md: "none"
        }
      }}
      onClick={handleOptionsOpen}>
        <MoreVertIcon />
    </IconButton>
  </Toolbar>
</AppBar>


  <SwipeableDrawer
    anchor={anchor} //i.e left side
    open={state[anchor]}//if true, the bar Will show
    onClose={toggleDrawer(anchor, false)}
    onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor, toggleDrawer)}
  </SwipeableDrawer>
  <MenuOptions ele={ele} handleOptionsClose={handleOptionsClose} />
</>
)}



const list = (anchor, toggleDrawer) => (
  <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
  SwipeableDrawer
<List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <>
          <ListItem 
            button 
            key={index} 
            sx={{alignItems:"flex-start"}}
            secondaryAction={
              <MailIcon />
            }>
            <ListItemIcon sx={{mt: 1}}>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText 
              primary={text} 
              secondary={
                <Typography variant="body2" noWrap>
                secondaryAction prop for the MailIcon
                </Typography>
              }/>
          </ListItem>
      <Divider variant="inset" />
      </>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={index}>
            <ListItemAvatar>
              <Avatar>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  
  const menus = [{
    icon: <AccountCircleIcon sx={{color: blue[600]}}/>,
    text: "Profile",
  },
  {
    icon:  <LogoutIcon sx={{color: blue[600]}}/>,
    text: "Logout"
  }]
  
  
  
  
const MenuOptions = ({ele, handleOptionsClose})=>(
    <Menu
        dense
        anchorEl={ele}
        open={Boolean(ele)}
        onClose={handleOptionsClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transitionComponent={Zoom}
      >
        <List >
          {menus.map( item => (
          <ListItem 
           key={item.text}
           button
           sx={{pr: 4}}
           >
            <ListItemIcon>
            <Avatar
              sx={{bgcolor: blue[100], mr:2}}>
              {item.icon}              
            </Avatar>
            </ListItemIcon>
            <ListItemText>
              {item.text}
            </ListItemText>
          </ListItem>)
          )}
      </List>
      </Menu>
  )


export default React.memo(App)