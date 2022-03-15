import React from "react"
import SwipeableViews from "react-swipeable-views"
//import Glider from "react-glider"
//import 'glider-js/glider.min.css';
import Glide from "./Glide";

const pic1 = "public/pic1.jpg"
const pic2 = "public/pic2.jpg"
const pic3 = "public/pic3.jpg"
//import div from "@mui/material/div"

function App(){
  return (
<> 

<SwipeableViews 
containerStyle={{
//border:"1px solid red",
//paddingLeft: "15%",
}} 
slideStyle={{
  border:"3px solid green",
  boxSizing: "border-box",
  "&:hover":{
    borderRadius: "100%"
  },
  //width: "200px",
  //height: "400px",
  "@media (min-width: 500px)": {
    borderColor: "red"
  }
}}
style={{
 border:"3px solid blue",
 //padding: "0 20%",
}}
resistance>
    <div class="inline-block rounded-md shadow-md overflow-hidden pb-8 pt-2 border dark:border-slate-700 transition duration-200 select-none  mr-2 h-full w-full">
      <div class="mx-2">
        <div class="flex items-center">
          <img class="rounded-full h-10 w-10 my-2 mr-2 ring-1 ring-slate-400 object-cover" src={pic1} alt="mypic" />
          <div>
            <span class="font-[600] text-slate-600 button">Iroka Ntomchukwu
            </span>
            <span class="font-light text-slate-400 dark:text-slate-500 text-xs font-sans block -mt-1 button">Jan, 22 2022</span>
          </div>
        </div>
        <p class="font-light my-2 dark:text-gray-600 whitespace-normal button">
          job is going well and have a good day at work and you articles and I have to do something
        </p>
      </div>
      <img src={pic2} alt="mypic" class="w-[100%] max-h-[53%] object-cover" />
    </div>
    <div class="inline-block rounded-md shadow-md overflow-hidden pb-8 pt-2 border dark:border-slate-700 transition duration-200 select-none  mr-2 h-full w-full">
      <div class="mx-2">
        <div class="flex items-center">
          <img class="rounded-full h-10 w-10 my-2 mr-2 ring-1 ring-slate-400 object-cover" src={pic1} alt="mypic" />
          <div>
            <span class="font-[600] text-slate-600 button">Iroka Ntomchukwu
            </span>
            <span class="font-light text-slate-400 dark:text-slate-500 text-xs font-sans block -mt-1 button">Jan, 22 2022</span>
          </div>
        </div>
        <p class="font-light my-2 dark:text-gray-600 whitespace-normal button">
          job is going well and have a good day at work and you articles and I have to do something
        </p>
      </div>
      <img src={pic2} alt="mypic" class="w-[100%] max-h-[53%] object-cover" />
    </div>
    <div class="inline-block rounded-md shadow-md overflow-hidden pb-8 pt-2 border dark:border-slate-700 transition duration-200 select-none  mr-2 h-full w-full">
      <div class="mx-2">
        <div class="flex items-center">
          <img class="rounded-full h-10 w-10 my-2 mr-2 ring-1 ring-slate-400 object-cover" src={pic1} alt="mypic" />
          <div>
            <span class="font-[600] text-slate-600 button">Iroka Ntomchukwu
            </span>
            <span class="font-light text-slate-400 dark:text-slate-500 text-xs font-sans block -mt-1 button">Jan, 22 2022</span>
          </div>
        </div>
        <p class="font-light my-2 dark:text-gray-600 whitespace-normal button">
          job is going well and have a good day at work and you articles and I have to do something
        </p>
      </div>
      <img src={pic2} alt="mypic" class="w-[100%] max-h-[53%] object-cover" />
    </div>
    <div class="inline-block rounded-md shadow-md overflow-hidden pb-8 pt-2 border dark:border-slate-700 transition duration-200 select-none  mr-2 h-full w-full">
      <div class="mx-2">
        <div class="flex items-center">
          <img class="rounded-full h-10 w-10 my-2 mr-2 ring-1 ring-slate-400 object-cover" src={pic1} alt="mypic" />
          <div>
            <span class="font-[600] text-slate-600 button">Iroka Ntomchukwu
            </span>
            <span class="font-light text-slate-400 dark:text-slate-500 text-xs font-sans block -mt-1 button">Jan, 22 2022</span>
          </div>
        </div>
        <p class="font-light my-2 dark:text-gray-600 whitespace-normal button">
          job is going well and have a good day at work and you articles and I have to do something
        </p>
      </div>
      <img src={pic2} alt="mypic" class="w-[100%] max-h-[53%] object-cover" />
    </div>
    <div class="inline-block rounded-md shadow-md overflow-hidden pb-8 pt-2 border dark:border-slate-700 transition duration-200 select-none  mr-2 h-full w-full">
      <div class="mx-2">
        <div class="flex items-center">
          <img class="rounded-full h-10 w-10 my-2 mr-2 ring-1 ring-slate-400 object-cover" src={pic1} alt="mypic" />
          <div>
            <span class="font-[600] text-slate-600 button">Iroka Ntomchukwu
            </span>
            <span class="font-light text-slate-400 dark:text-slate-500 text-xs font-sans block -mt-1 button">Jan, 22 2022</span>
          </div>
        </div>
        <p class="font-light my-2 dark:text-gray-600 whitespace-normal button">
          job is going well and have a good day at work and you articles and I have to do something
        </p>
      </div>
      <img src={pic2} alt="mypic" class="w-[100%] max-h-[53%] object-cover" />
    </div>
  </SwipeableViews>
  
  <hr />
  <hr />
  
  <Glide showBtn showSelect>
    <div class="inline-block rounded-md shadow-md overflow-hidden pb-8 pt-2 border dark:border-slate-700 transition duration-200 select-none  mr-2 h-full w-full">
      <div class="mx-2">
        <div class="flex items-center">
          <img class="rounded-full h-10 w-10 my-2 mr-2 ring-1 ring-slate-400 object-cover" src={pic1} alt="mypic" />
          <div>
            <span class="font-[600] text-slate-600 button">Iroka Ntomchukwu
            </span>
            <span class="font-light text-slate-400 dark:text-slate-500 text-xs font-sans block -mt-1 button">Jan, 22 2022</span>
          </div>
        </div>
        <p class="font-light my-2 dark:text-gray-600 whitespace-normal button">
          job is going well and have a good day at work and you articles and I have to do something
        </p>
      </div>
      <img src={pic2} alt="mypic" class="w-[100%] max-h-[53%] object-cover" />
    </div>
    <div class="inline-block rounded-md shadow-md overflow-hidden pb-8 pt-2 border dark:border-slate-700 transition duration-200 select-none  mr-2 h-full w-full">
      <div class="mx-2">
        <div class="flex items-center">
          <img class="rounded-full h-10 w-10 my-2 mr-2 ring-1 ring-slate-400 object-cover" src={pic1} alt="mypic" />
          <div>
            <span class="font-[600] text-slate-600 button">Iroka Ntomchukwu
            </span>
            <span class="font-light text-slate-400 dark:text-slate-500 text-xs font-sans block -mt-1 button">Jan, 22 2022</span>
          </div>
        </div>
        <p class="font-light my-2 dark:text-gray-600 whitespace-normal button">
          job is going well and have a good day at work and you articles and I have to do something
        </p>
      </div>
      <img src={pic2} alt="mypic" class="w-[100%] max-h-[53%] object-cover" />
    </div>
    <div class="inline-block rounded-md shadow-md overflow-hidden pb-8 pt-2 border dark:border-slate-700 transition duration-200 select-none  mr-2 h-full w-full">
      <div class="mx-2">
        <div class="flex items-center">
          <img class="rounded-full h-10 w-10 my-2 mr-2 ring-1 ring-slate-400 object-cover" src={pic1} alt="mypic" />
          <div>
            <span class="font-[600] text-slate-600 button">Iroka Ntomchukwu
            </span>
            <span class="font-light text-slate-400 dark:text-slate-500 text-xs font-sans block -mt-1 button">Jan, 22 2022</span>
          </div>
        </div>
        <p class="font-light my-2 dark:text-gray-600 whitespace-normal button">
          job is going well and have a good day at work and you articles and I have to do something
        </p>
      </div>
      <img src={pic2} alt="mypic" class="w-[100%] max-h-[53%] object-cover" />
    </div>
    <div class="inline-block rounded-md shadow-md overflow-hidden pb-8 pt-2 border dark:border-slate-700 transition duration-200 select-none  mr-2 h-full w-full">
      <div class="mx-2">
        <div class="flex items-center">
          <img class="rounded-full h-10 w-10 my-2 mr-2 ring-1 ring-slate-400 object-cover" src={pic1} alt="mypic" />
          <div>
            <span class="font-[600] text-slate-600 button">Iroka Ntomchukwu
            </span>
            <span class="font-light text-slate-400 dark:text-slate-500 text-xs font-sans block -mt-1 button">Jan, 22 2022</span>
          </div>
        </div>
        <p class="font-light my-2 dark:text-gray-600 whitespace-normal button">
          job is going well and have a good day at work and you articles and I have to do something
        </p>
      </div>
      <img src={pic2} alt="mypic" class="w-[100%] max-h-[53%] object-cover" />
    </div>
    <div class="inline-block rounded-md shadow-md overflow-hidden pb-8 pt-2 border dark:border-slate-700 transition duration-200 select-none  mr-2 h-full w-full">
      <div class="mx-2">
        <div class="flex items-center">
          <img class="rounded-full h-10 w-10 my-2 mr-2 ring-1 ring-slate-400 object-cover" src={pic1} alt="mypic" />
          <div>
            <span class="font-[600] text-slate-600 button">Iroka Ntomchukwu
            </span>
            <span class="font-light text-slate-400 dark:text-slate-500 text-xs font-sans block -mt-1 button">Jan, 22 2022</span>
          </div>
        </div>
        <p class="font-light my-2 dark:text-gray-600 whitespace-normal button">
          job is going well and have a good day at work and you articles and I have to do something
        </p>
      </div>
      <img src={pic2} alt="mypic" class="w-[100%] max-h-[53%] object-cover" />
    </div>
  </Glide>
  </>
    )
}
export default React.memo(App)


/*

    
<!--
    <div class="inline-block rounded-md shadow-md overflow-hidden pb-8 border dark:border-slate-700 duration-200 select-none mr-2">
      <img src={pic3} alt="picture" class="max-h-[200px] w-[100%] object-cover button" />
      <div class="p-3 ">
        <p class="font-light text-gray-700 whitespace-normal button">
          What it will be deleted on the phone with my mom is gonna go to the store and I have to be there at like midnight to be there at
        </p>
        <button class="btn-secondary my-4">Add Me</button>
      </div>
    </div>
    <div class="inline-block rounded-md shadow-md overflow-hidden pb-8 pt-2 border dark:border-slate-700 transition duration-200 select-none mr-2">
      <div class="mx-2">
        <div class="flex items-center">
          <img class="rounded-full h-10 w-10 my-2 mr-2 ring-1 ring-slate-400 object-cover" src={pic1} alt="mypic" />
          <div>
            <span class="font-[600] text-slate-600 button">Iroka Ntomchukwu
            </span>
            <span class="font-light text-slate-400 dark:text-slate-500 text-xs font-sans block -mt-1 button">Jan, 22 2022</span>
          </div>
        </div>
        <p class="font-light my-2 dark:text-gray-600 whitespace-normal button">
          job is going well and have a good day at work and you articles and I have to do something
        </p>
      </div>
      <img src={pic2} alt="mypic" class="w-[100%] max-h-[53%] object-cover" />
    </div>

    <div class="inline-block w-[80%] max-w-[300px] rounded-md shadow-md overflow-hidden pb-8 border dark:border-slate-700 duration-200 select-none h-[400px] max-h-[90vh] mr-2">
      <img src={pic3} alt="picture" class="max-h-[200px] w-[100%] object-cover button" />
      <div class="p-3 ">
        <p class="font-light text-gray-700 whitespace-normal button">
          What it will be deleted on the phone with my mom is gonna go to the store and I have to be there at like midnight to be there at
        </p>
        <button class="btn-secondary my-4">Add Me</button>
      </div>
    </div>
    -->
*/