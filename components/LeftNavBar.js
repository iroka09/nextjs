
import React, {useEffect, useContext, useRef, useState, memo} from "react"
import {MyContext} from "../pages/index";
import CloseIcon from "@mui/icons-material/Close";




function App(){
  
  const {items, isSideBarOpen, setIsSideBarOpen} = useContext(MyContext);
  
    const sideBarRef = useRef();
  
    useEffect(()=>{
      if(isSideBarOpen){
        sideBarRef.current?.classList.remove("left-[-100vw]");
        sideBarRef.current?.classList.remove("opacity-0");
      }
      else{
        sideBarRef.current?.classList.add("left-[-100vw]");
        sideBarRef.current?.classList.add("opacity-0");
      }
    }, [isSideBarOpen])
  
return(
  <div>

   <div 
      ref={sideBarRef}
      className="fixed z-20 bottom-0 top-0 left-[-100vw] left-0 md:hidden bg-slate-800 opacity-0 overflow-scroll w-[70vw] transition duration-1000"
    >
    <div className="p-3 my-2 flex">
      <CloseIcon sx={{fontSize: 30, color:"#ffffff", ml:"auto"}} onClick={()=>setIsSideBarOpen(x=>!x)}/>
    </div>
    <ul className="px-2 mt-3 divide-y-1">
      {items.map((item,i)=>(
        <li key={i} className="text-slate-300 hover:bg-slate-600 px-3 py-2">
          <a href={`#${item.name.replace(/\s+/g, "_")}`}>{item.name}</a>
        </li>
      ))}
    </ul>
  </div>
</div>)
}

export default memo(App)