import React, {useState} from "react"
import Image from "next/image"
import Box from "@mui/material/Box"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import SwipeableViews from "react-swipeable-views"
import {autoPlay, virtualize, bindKeyboard} from "react-swipeable-views-utils"

const Swiper = bindKeyboard(autoPlay(SwipeableViews));

export default function App(props){
  const [index, setIndex] = useState(0);
  const handleChangeIndex = (i)=>{
    setIndex(i)
  }
  return ( <>
    <h1> {index} </h1>
    <Swiper
      resistance
      onChangeIndex={handleChangeIndex}
      slideStyle={{position: "relative"}}
      >
      {Array.from(Array(5)).map((x, i)=>(
        <img 
          key={i} 
          src="http://picsum.photos?random" 
          layout="responsive"
          layout='fill'
          objectFit= "cover"
          placeholder="blur"
          quality={100}
        />
      ))}
    </Swiper>
  </>)
}
