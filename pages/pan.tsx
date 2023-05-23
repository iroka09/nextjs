import React, {useState, useEffect, useMemo, useRef, memo} from "react"
import Head from "next/head"
import axios from "axios"
import Image from "next/image"
import {withRouter} from "next/router"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Divider from "@mui/material/Divider"
import SwipeableViews from "react-swipeable-views"

function App(props) {
  const [index, setIndex] = useState(0)
  
  
  return (<>
    <Head>
      <meta charSet="utf-8"/>
      <title>Pan sample</title>
    </Head>
    
    <Button 
      color="#a82"
      variant="contained"
      >Test</Button>
  </>)
}


export default memo(App) 