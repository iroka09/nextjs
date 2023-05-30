
import React, {useEffect, useContext, useRef, useState, memo} from "react"
import {MyContext} from "../pages/index";
import CloseIcon from "@mui/icons-material/Close";




function App(){
  
  const {items, isSideBarOpen, setIsSideBarOpen} = useContext(MyContext);
  const [showOverlay, setShowOverlay]=useState(false)
    const sideBarRef = useRef();
  
    useEffect(()=>{
      if(isSideBarOpen){
        sideBarRef.current?.classList.add("side-bar-open");
      }
      else{
        sideBarRef.current?.classList.remove("side-bar-open");
      }
    }, [isSideBarOpen])
  
return(
  <div>
    {
    (isSideBarOpen) && 
      <div className="fixed inset-0 z-20 bg-black opacity-0 overlay-gray" onClick={()=>setIsSideBarOpen(false)}>
      </div>
    }
    <div 
      ref={sideBarRef}
      className="side-bar fixed z-30 inset-y-0 md:hidden bg-slate-200 overflow-scroll w-[70vw] text-slate-700"
    >
    <div className="p-3 my-2 flex sticky top-[10px] w-full">
      <button className="p-2 border-1 border-slate-500 rounded ml-auto active:bg-slate-300" onClick={()=>setIsSideBarOpen(x=>!x)}>
        <CloseIcon sx={{fontSize: 30}} />
      </button>
    </div>
    <ul className="px-2 mt-3 divide-y-1">
      {items.map((item,i)=>(
        <li key={i} className="hover:bg-slate-300 hover:ml-2 px-3 p-2 transition font-bold">
          <a href={`#${item.name.replace(/\s+/g, "_")}`}>{item.name}</a>
        </li>
      ))}
    </ul>
  </div>
</div>)
}

export default memo(App)