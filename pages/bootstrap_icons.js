import React, {memo} from "react"
import Head from "next/head"
import {bootstrapIcons} from "../components/Bootstrap-icons"
import {CopyToClipboard} from "react-copy-to-clipboard"

function App(props){
  
  const handleCopyClipboard = (id)=>{
    const ele = document.getElementById(id);
    ele.classList.remove("hidden")
    setTimeout(()=>{
      ele.classList.add("hidden")
    }, 2000)
  }
  
  return (<>
  
    <Head>
      <title>Bootstrap icons</title>
    </Head>
    
  <main>
    <div className="flex flex-wrap justify-center bg-slate-100 py-5 px-2">
      <h1 className="font-bold text-slate-500 w-full text-center my-3">Bootstrap Icons</h1>
      {bootstrapIcons.map((iconName,i)=>(
        <CopyToClipboard
          text={"bi bi-"+iconName}
          onCopy={(txt,isSuccess)=>{
            if(isSuccess){
              handleCopyClipboard("clip"+i)
            } else {
              alert("Error")
            }
          }}>
          <div className="flex flex-col gap-y-2 justify-center items-center p-2 rounded bg-white shadow-sm active:bg-gray-200 m-2 relative">
            <i className={`bi bi-${iconName} text-3xl text-black`}></i>
            <span className="text-md text-gray-400">{iconName}</span>
            <div id={"clip"+i} className="hidden absolute top-[90%] left-[50%] translate-x-[-50%] bg-black rounded text-white text-xs py-1 px-2 text-center z-10">
              <div className="absolute box-border w-[3px] h-[3px] border-8 bottom-[99%] left-[50%] translate-x-[-50%] border-transparent border-b-black"></div>
              Copied!
            </div>
          </div>
        </CopyToClipboard>
      ))}
    </div>
  </main>
  </>)
}

export default memo(App)