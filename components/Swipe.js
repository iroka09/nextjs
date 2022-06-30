import React, {useState} from "react"
import Image from "next/image"
import Box from "@mui/material/Box"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import SwipeableViews from "react-swipeable-views"
import {autoPlay, virtualize, bindKeyboard} from "react-swipeable-views-utils"

const Swiper = bindKeyboard(autoPlay(SwipeableViews));

export default function App(props){
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  
  const handleChangeIndex1 = (i)=>{
    setIndex1(i)
  }
  const handleChangeIndex2 = (i)=>{
    setIndex2(i)
  }
  return ( <>
    <h1> {index1} </h1>
    <Swiper
      resistance
      onChangeIndex={handleChangeIndex1}
      slideStyle={{
        boxShadow: "0 3px 1px -1px black",
      }}
      >
      {Array.from(Array(5)).map((x, i)=>(
      <Box
        sx={{
          flexGrow: 1,
          height: 250,
          position: "relative",
        }}
      >
        <Image
          key={i} 
          src="https://picsum.photos/400/400/?random"
          loader: {(obj)=> obj.src}
          layout='fill'
          objectFit= "cover"
          placeholder="blur"
          quality={100}
        />
      </Box>
      ))}
    </Swiper>
    
    <h1> {index2} </h1>
    <Swiper
      resistance
      onChangeIndex={handleChangeIndex2}
      slideStyle={{
        boxShadow: "0 3px 1px -1px black",
      }}
      >
      {Array.from(Array(5)).map((x, i)=>(
      <Box
        sx={{
          flexGrow: 1,
          height: 250,
          position: "relative",
        }}
      >
        <img
          key={i} 
          src="https://picsum.photos/400/400/?random"
          loader: {(obj)=> obj.src}
          layout='fill'
          objectFit= "cover"
          placeholder="blur"
          quality={100}
        />
      </Box>
      ))}
    </Swiper>
  </>)
}
