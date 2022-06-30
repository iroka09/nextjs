import React, {useState} from "react"
import Image from "next/image"
import Box from "@mui/material/Box"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import SwipeableViews from "react-swipeable-views"
import {autoPlay, virtualize, bindKeyboard} from "react-swipeable-views-utils"

const Swipe = bindKeyboard(autoPlay(SwipeableViews));

const list = Array.from(Array(5));

export default function App(props){
  const [index1, setIndex1] = useState(0);
  //const [index2, setIndex2] = useState(0);
  
  const handleChangeIndex1 = (i)=>{
    setIndex1(i)
  }
  
 /* const handleChangeIndex2 = (i)=>{
    setIndex2(i)
  }*/
  
  return ( <div>
    <Swipe
      resistance
      onChangeIndex={handleChangeIndex1}
      containerStyle={{
        position: "relative",
        borderRadius: 2,
      }}
      slideStyle={{
        boxShadow: "0 5px 4px -1px black",
      }}
      >
      
      <span
        style={{
          display:"inline-block",
          position: "absolute",
          top: 10,
          left: 10,
          backgroundColor: "rgba(0,0,0,0.8)",
          zIndex: 1,
          borderRadius: 2,
          padding: "2px 5px",
        }}
      >
        {(index1+1)+"/"+(list.length)}
      </span>
      
      {list.map((x, i)=>(
      <Box
        key={i}
        sx={{
          flexGrow: 1,
          height: 250,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          key={i} 
          src={"https://picsum.photos/400/400/?random="+Math.random()}
          loader={(obj)=> obj.src}
          priority={true}
          layout='fill'
          objectFit= "cover"
          placeholder="blur"
          quality={100}
        />
      </Box>
      ))}
    </Swipe>
    
  </div>)
}
