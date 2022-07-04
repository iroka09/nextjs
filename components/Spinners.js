
import React, {useEffect, useMemo, memo} from "react"
import random from "random"
import {useTheme} from "@mui/material/styles"
import * as spinners from "react-spinners";

function App(props){
  
  const theme = useTheme();
  
  const  MyLoader = useMemo(()=>{
    let arr = [];
    for(let x in spinners) {
      arr.push(spinners[x])
    }
    let length = arr.length - 0;
    return arr[random.int(0, length)];
  }, [])
  
  return (
    <MyLoader color={theme.palette.primary.main} {...props}/>
  )
}

App.developer = "tochi ooo"

export default memo(App)