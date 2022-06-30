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
      slideStyle={{
        boxShadow: "0 2px 1px -1px black",
      }}
      >
      {Array.from(Array(5)).map((x, i)=>(
      <Box
        sx={{
          flexGrow: 1,
          height: 200,
          position: "relative",
        }}
      >
        <Image
          key={i} 
          src="http://picsum.photos/?random" 
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
