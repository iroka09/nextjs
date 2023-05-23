import React, {memo, useState, useMemo, useEffect, useRef} from "react"
import Head from "next/head"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';


const App = function(props:any){
 const [isMenuOpen, setIsMenuOpen] = useState(false)
 const [menuSlideDone, setMenuSlideDone] = useState(false)
 const [logo, setLogo] = useState("Iroka")
 const menuRef = useRef()
 const handleMenuOpen = ()=>{
   setIsMenuOpen(true)
   menuRef.current.classList.add("my-menu-active")
 }
 const handleMenuClose = ()=>{
   setIsMenuOpen(false)
   menuRef.current.classList.remove("my-menu-active")
 }
 
 useEffect(()=>{
   const myFn = ()=>{
     setMenuSlideDone(x=> !x)
   }
   menuRef.current.addEventListener("webkitTransitionEnd", myFn)
   menuRef.current.addEventListener("transitionend", myFn)
   return ()=> {
     menuRef.current.removeEventListener("webkitTransitionEnd", myFn);
     menuRef.current.removeEventListener("transitionend", myFn);
   }
 }, [])

  return(
    <>
      <Head>
        <title>Home page</title>
      </Head>
      
      <div class="flex items-center p-1 bg-blue-600 shadow-lg text-white">
        <IconButton onClick= {handleMenuOpen}>
          <MenuIcon />
        </IconButton> 
        <h5 class="ml-3" onClick={()=>{
          setLogo("Rooster")
        }}>{logo}</h5> 
        <IconButton sx={{ml:"auto",position:"relative"}}>
          <MoreVertIcon />
          <div class="absolute right-[10px] top-[100%] bg-white rounded shadow-xl w-[70px] flex flex-col">
            {["Iroka","Tochi","Chisom"].map((x,i)=>(
             <button class="border-bottom py-2 hover:bg-slate-100">{x}</button>
            ))}
          </div>
        </IconButton> 
      </div> 
      
      <div ref={menuRef} class="relative bg-slate-200 shadow-sm fixed left-0 top-0  overflow-hidden py-5 z-20 h-screen my-menu">
        {menuSlideDone &&  <span class="absolute block top-2 left-2 hover:bg-[rgba(0,0,0,0.2)] rounded-full p-2 " onClick={handleMenuClose}>
            <CloseIcon/>
          </span>}
      </div>
      {isMenuOpen && <div class="fixed inset-0 bg-black bg-opacity-20 z-10" onClick={handleMenuClose}></div>}
    </>
  )
  // return <h2>Hello Kitty </h2>
}

export default memo(App)