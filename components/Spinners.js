
import React, {useEffect, useMemo, memo} from "react"
import random from "random"
import * as spinners from "react-spinners";

function App(props){
  const  MyLoader = useMemo(()=>{
    let arr = [];
    for(let x in spinners) {
      arr.push(spinners[x])
    }
    let length = arr.length-0;
    return arr[random.int(0, length)];
  }, [])
  
  useEffect(()=>{
    alert("spin loaded")
    return ()=> alert("spin unmount")
  }, [])
  
  return (
    <MyLoader {...props} />
  )
}

export default memo(App)