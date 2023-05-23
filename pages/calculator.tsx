import React, {memo, useState, useEffect} from "react"
import Head from "next/head"

function App(props){
  return(
    <>
      <Head>
        <title>Calculator</title>
      </Head>
      
      <div class="mx-2 bg-slate-800 h-screen relative">
      
        <h3 class="text-xl font-bold ml-2 mt-4 mb-2">IROKA</h3>
        
        <div class="text-slate-700 rounded text-xl">123</div>
        
        <div class="grid grid-cols-4 gap-x-1 w-full h-[60%] absolute bottom-[2px]">
          <div class="col-span-3 grid grid-cols-3 gap-1">
            {[7,8,9,4,5,6,1,2,3,0].map((num)=>(
              <button class="rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-900 text-lg font-bold p-3">
                {num}
              </button>
            ))}
              <button class="rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-900 text-lg font-bold p-3">
                •
              </button>
              <button class="rounded-sm bg-red-400 hover:bg-slate-200 text-slate-900 text-lg font-bold p-3">
                =
              </button>
          </div>
          <div class="grid grid-cols-1 gap-1">
            {["÷","×","–","+"].map((x)=>(
              <button class="rounded-sm bg-black text-slate-100 text-lg font-bold p-3">
                {x}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(App)