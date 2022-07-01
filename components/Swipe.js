import React, {useState, useMemo} from "react"
import Image from "next/image"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import SwipeableViews from "react-swipeable-views"
import {autoPlay, virtualize, bindKeyboard} from "react-swipeable-views-utils"

const Swipe = bindKeyboard(autoPlay(SwipeableViews));


export default function App(props){
  
  const [index, setIndex] = useState(0);
  const [randomImage, setRandomImage] = useState();
  
  const handleChangeIndex = (i)=>{
    setIndex(i)
  }
 
  const list = useMemo(()=>{
    let num = (props.isProd)? 6 : 3;
    return Array.from(Array(num)).map((x, i)=>({
      src: "https://picsum.photos/400/300/?random="+Math.random(),
      src2: "/pic"+(i+1)+".jpg"
    }))
  }, [randomImage]);
  
  return (
    <>
    <div
      style={{
        position:"relative",
        borderRadius: 3,
        boxShadow: "0 2px 3px #222",
        overflow: "hidden",
        margin: "10px auto",
        maxWidth: 700,
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
        {(index+1)+"/"+(list.length)}
      </span>
    <Swipe
      resistance
      enableMouseEvents
      animateHeight
      style={{
        //  border:"5px solid blue",
        padding: "0 30px"
      }}
      slideStyle={{
        // border:"5px solid green",
        padding: "0 10px"
      }}
      containerStyle={{
        // border:"5px solid red",
      }}
      onChangeIndex={handleChangeIndex}
      interval={4000}
      >
      {list.map((obj, i)=>(
      <div
        style={{
          position:"relative",
          height: 300,
        }}
      >
        <MyImage
          obj={obj}
          loader={(_obj)=> _obj.src}
          priority={true}
          isProd={props.isProd}
          layout='fill'
          objectFit= "cover"
          placeholder="blur"
          quality={100}
        />
      </div>
      ))}
    </Swipe>
  </div>
  {/*<Button
    variant="outlined"
    color="error"
    onClick={()=>{
      setRandomImage(Math.random())
    }}
    sx={{
      my: 2
    }}
  >
    Change Pictures
  </Button>*/}
  </>)
}

function MyImage(props){
  return(
    (props.isProd)? 
    <Image src={props.obj.src} {...props} /> :
    <img src={props.obj.src2} style={{height:"100%", width:"100%"}} />
  )
}