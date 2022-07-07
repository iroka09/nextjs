import React, {useState, useMemo, memo} from "react"
import Image from "next/image"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
/*import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"*/
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SwipeableViews from "react-swipeable-views"
import {makeStyles} from "@mui/styles"
import {autoPlay, virtualize, bindKeyboard} from "react-swipeable-views-utils"


const Swipe = bindKeyboard(autoPlay(SwipeableViews));

const useStyle = makeStyles({
  normal: {
    width: 10,
    height: 10,
    border: "1px solid #66f",
    borderRadius: "50%",
    boxShadow: "0 0 0 0 blue",
    margin: "0 5px",
    backgroundColor: "transparent",
    transition: "0.6s",
  },
  active: {
    borderColor: "blue",
    boxShadow: "0 0 15px 5px blue",
    backgroundColor: "#33f",
  },
})

function App(props){
  
  const [index, setIndex] = useState(0);
  const [randomImage, setRandomImage] = useState();
  const dotsStyle = useStyle()
  
  const handleChangeIndex = (i)=>{
    setIndex(i)
  }
 
 const handleNext = ()=>{
    setIndex(prev=>{
     if(prev >= list.length-1){
       return 0
     }
     return ++prev
    })
 }
 
 const handlePrev = ()=>{
   setIndex(prev=>{
     if(prev <= 0){
       return list.length-1
     }
     return --prev
   })
 }
 
  const list = useMemo(()=>{
    let num = (props.isProd)? 6 : 3;
    return Array.from(Array(num)).map((x, i)=>({
      src: "https://picsum.photos/400/300/?random="+Math.random(),
      src2: "/pic"+(i+1)+".jpg"
    }))
  }, []);
  
  return (
    <>
    <div
      style={{
        position:"relative",
        borderRadius: 3,
        boxShadow: "0 2px 3px #222",
        overflow: "hidden",
        margin: "10px auto",
        maxWidth: 500,
      }}
    >
      <span
        style={{
          display:"inline-block",
          position: "absolute",
          top: 10,
          left: 10,
          backgroundColor: "rgba(200,200,200,0.2)",
          backdropFilter: "blur(3px)",
          zIndex: 1,
          color: "black",
          borderRadius: 2,
          padding: "2px 8px",
        }}
      >
        {(index+1)+"/"+(list.length)}
      </span>
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          top: "50%",
          transform: "translateY(-50%)",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: "0 2px",
        }}
      >
      <IconButton
        onClick={handlePrev}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        onClick={handleNext}
      >
        <ChevronRightIcon />
      </IconButton>
    </div> 
    <div 
      style={{
        position: "absolute",
        zIndex: 1,
        left: "50%",
        transform: "translateX(-50%)",
        padding: "7px 10px",
        bottom: 15,
        backgroundColor: "rgba(211,211,211,0.6)",
        backdropFilter: "blur(3px)",
        borderRadius: 3,
        display: "flex",
        justifyContent:"center",
      }}
    >
      {list.map((_,i)=>(
          <div
            key={i}
            className={`${dotsStyle.normal} ${(index===i)? dotsStyle.active :""}`}
            onClick={()=>setIndex(i)}
          >
          </div>
        ))}
    </div>
    <Swipe
      index={index}
      resistance
      enableMouseEvents
      animateHeight
      hysteresis={0.1} 
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
        key={i}
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

export default memo(App)