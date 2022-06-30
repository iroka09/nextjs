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
  
  return ( <>
    <Swipe
      resistance
      onChangeIndex={handleChangeIndex1}
      containerStyle={{
        position: "relative",
      }}
      slideStyle={{
        boxShadow: "0 3px 1px -1px black",
      }}
      >
      
      <div
        style={{
          display:"inline-block",
          position: "absolute",
          top: 10,
          left: 10,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 2,
          padding: 4,
        }}
      >
        {(index+1)+"/"+(list.length)}
      </div>
      
      {list.map((x, i)=>(
      <Box
        key={i}
        sx={{
          flexGrow: 1,
          height: 250,
          position: "relative",
          borderRadius: 3,
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
    
  </>)
}
