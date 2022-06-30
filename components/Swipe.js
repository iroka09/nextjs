import React, {useState} from "react"
import Image from "next/image"
import Box from "@mui/material/Box"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import SwipeableViews from "react-swipeable-views"
import {autoPlay, virtualize, bindKeyboard} from "react-swipeable-views-utils"

const Swipe = bindKeyboard(autoPlay(SwipeableViews));

const list = Array.from(Array(5))
  .map(()=>({
    src: "https://picsum.photos/400/400/?random="+Math.random(),
  }));


export default function App(props){
  const [index1, setIndex1] = useState(0);
  //const [index2, setIndex2] = useState(0);
  
  const handleChangeIndex1 = (i)=>{
    setIndex1(i)
  }
  
 /* const handleChangeIndex2 = (i)=>{
    setIndex2(i)
  }*/
  
  return (
    <div
      style={{
        position:"relative",
        borderRadius: 3,
        boxShadow: "0 1px 2px #222",
        overflow: "hidden",
        height: 300,
        maxWidth: 700,
        margin: "10px auto",
      }}
    >
      <span
        style={{
          display:"inline-block",
          position: "absolute",
          top: 10,
          left: 10,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 10,
          color: "white",
          borderRadius: 2,
          padding: "2px 8px",
        }}
      >
        {(index1+1)+"/"+(list.length)}
      </span>
    <Swipe
      resistance
      onChangeIndex={handleChangeIndex1}
      >
      {list.map((obj, i)=>(
      <div key={i} style={{position:"absolute", top:0, left:0, right:0, bottom:0, border:"1px solid red"}}>
        <Image
          src={obj.src}
          loader={(_obj)=> _obj.src}
          priority={true}
          layout='fill'
          objectFit= "cover"
          placeholder="blur"
          quality={100}
        />
      </div>
      ))}
    </Swipe>
    
  </div>)
}
