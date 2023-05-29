
import React, {useContext, memo} from "react"
import {MyContext} from "../pages/index";




function App(){
  
  const {items, isSideBarOpen} = useContext(MyContext);
  
return(
  <div>

   {isSideBarOpen && <div
      className="fixed z-20 top-0 left-0 md:hidden bg-slate-800 h-[98vh] overflow-scroll w-[80vw]"
    >
        <ul className="px-2 mt-4 divide-y-1">
        {items.map((item,i)=>(
          <li key={i} className="text-slate-300 hover:bg-slate-200 px-3 py-2">
          <a href={`#${item.name.replace(/\s+/g, "_")}`}>{item.name}</a>
          </li>
        ))}
        </ul>
      </div>}
  </div>
  )
}

export default memo(App)