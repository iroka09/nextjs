import React from "react"
//import SwipeableViews from "react-swipeable-views"
import SwipeableViews from "react-swipeable-views"
import AppBar from "@mui/material/AppBar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import {useLocation, useParams} from "react-router"

function App() {
  const [index,
    setIndex] = React.useState(0);
  const handleChange = (e, value)=> {
    setIndex(value)
  }
  const handleChangeIndex = (value)=> {
    setIndex(value)
  }

  return (
    <>
    <AppBar position="fixed" sx={{bgcolor: "white"}}>
     <Tabs value={index} onChange={handleChange} variant="fullWidth">
          <Tab icon={<AccountCircleIcon/>} label="User" iconPosition="start"/>
<Tab icon={<MailIcon/>} label="Mail" iconPosition="start"/>
     <Tab icon={<InboxIcon/>} label="Inbox" iconPosition="start"/>
     </Tabs>
    </AppBar>
    
    <SwipeableViews index={index} onChangeIndex={handleChangeIndex} resistance showBtn showSelect options={{type:"carousel",rewind: true}}>
    <div className="h-screen flex justify-center items-center bg-red-500">
    User J Cole slaw I have been waiting for ur birthday is on my phone is ringing me to take care of myself financially stable and I have t I love you so very 
    </div>
    <div className="h-screen flex justify-center items-center bg-blue-500">
    Balance between the lines and wrinkles and I have to be there at like midnight to be there at like midnight release for the day I love u 
    </div>
    <div className="h-screen flex justify-center items-center bg-green-500">
    Settings Hm you must wrap my arms around you I was like I don't have any of that I have been there before I go to the store and get a chance to 
    </div>
    </SwipeableViews> 
    </>
  )
}

export default App;