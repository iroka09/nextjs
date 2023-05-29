import React, {useState, useEffect, useMemo, createContext, useContext, memo} from "react" 
import Head from 'next/head';
import Image from 'next/image';
import Carousel from '../components/Carousel';
import LeftNavBar from '../components/LeftNavBar';
import random from 'random';
import ReactReveal from 'react-reveal/Zoom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import AddTaskIcon from "@mui/icons-material/AddTask"
import Draggable from "react-draggable"
import {imageNames} from "../raw_files/food_pictures"
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 3
  },
  wordsPerSentence: {
    max: 20,
    min: 10
  }
});
/*
lorem.generateWords(1);
lorem.generateSentences(5);
lorem.generateParagraphs(7);
*/
export const MyContext = createContext()


const mappedImageNames = imageNames.map((name,i)=>({
    name: capitalize(name.replace(/\_+/g, " ").replace(/\.jpg$/gi, "")).trim(),
    src: `/food_pictures/${name.toLowerCase()}`,
    price: random.int(10, 50),
    description: lorem.generateWords(),
    currency: "$",
    quantity: 0,
  }))


function App(props) {
  
  const [totalInCart, setTotalInCart]= useState(0);
  const [isSideBarOpen, setIsSideBarOpen]=useState(false)
  const [items, setItems] =
  useState(mappedImageNames)
  
  const handleAddToCart = (i,quantity,isAddCloseBtn)=>{
    setItems(prevItems=> prevItems.map((x,index)=>{
        if(i !== index) return x;
          if(isAddCloseBtn){
            x.quantity = +(!x.quantity)
          }
          else{
            x.quantity = quantity
          }
        return x; 
      }));
    //sets totalInCart
    let total = 0;
    items.forEach(item=>{
      total+=item.quantity;
    })
    setTotalInCart(total)
  }
  
  return (
<MyContext.Provider
  value={{items, isSideBarOpen, handleAddToCart}}
  >
  <Head>
    <title>Food Shopping</title>
    <meta name="description" content="We provide all kind of African dishes, just make your order we will provide it as quick as possible" />
  </Head>
  
<main id="main" className="h-screen overflow-scroll">
  <div className="px-3 py-2 flex items-center">
    <img src="/favicon.ico" alt="icon logo" className="w-[40px] h-[40px] rounded-full object-cover"/>
    <h1 className="ml-3 text-xl text-green-600 uppercase">My Sweet Pie</h1>
  </div>
  <div className="p-3 flex shadow-sm bg-slate-900 shadow-sm sticky top-0 w-full z-10 md:hidden">
    <button className="active:bg-slate-500 bg-opacity-10 text-white" onClick={()=>{
      setIsSideBarOpen(x=>!x)
    }}
    >{ (isSideBarOpen)? <CloseIcon sx={{fontSize:30}}/> : <MenuIcon sx={{fontSize:30}}/> }
    </button>
    <button className="active:bg-slate-500 bg-opacity-10 ml-auto text-white">
      <SearchIcon sx={{fontSize:30}}/>
    </button>
  </div>

{/*Grid Main*/}
<section className="md:grid grid-cols-12 gap-x-2">

{/*left*/}
 <side className="col-span-3 hidden md:block bg-slate-100 h-[98vh] overflow-scroll">
    <ul className="px-2 mt-4 divide-y-1">
      {items.map((item,i)=>(
        <li key={i} className="text-slate-900 hover:bg-slate-200 px-3 py-2">
          <a href={`#${item.name.replace(/\s+/g, "_")}`}>{item.name}</a>
        </li>
      ))}
    </ul>
 </side>
 
 
{/*right*/}
<side className="col-span-9 sm:h-[98vh] overflow-scroll">
  <LeftNavBar/>
  <div>
    <Carousel />
  </div>
<section className="mx-1 mt-7">

  <h1 className="text-green-600 mb-2 text-2xl">SELECT YOUR FAVOURITE DISHES</h1>
  <p className="mb-4 text-slate-700">{props.description}</p>
  
  <div className="flex flex-wrap justify-center my-3 gap-3">
    <ReactReveal>
    {items.map((item,i)=>(
    <div key={i} className="w-full box-border sm:w-[250px] my-card-shadow">
      <div className="relative shadow w-full rounded dark-mode-card bg-slate-100">
        <div className="w-full h-[200px] md:h-[150px] object-cover">
          <Image layout="fill" objectFit="cover" src={item.src} />
        </div>
        <MoreQuantityBtn item={item} index={i}/>
        <div className="p-2">
          <h1 className="text-slate-700 text-3xl mt-1 w-full truncate">{item.name}</h1>
          <p className="text-slate-400 my-2 h-[60px] overflow-auto">{item.description}</p>
          <div className="flex items-center">
            <span className="block text-3xl font-bold text-green-600">{item.currency} {item.price
            }</span>
            <button className="py-1 px-3 bg-slate-800 rounded text-white transition active:bg-slate-900 ml-4 shadow hover:shadow-lg uppercase brightness-10" onClick={()=>handleAddToCart(i,1,true)}
            >
              {(item.quantity===0)? <b><AddShoppingCartIcon /> Add </b> : <b><RemoveShoppingCartIcon/> Remove</b>}
            </button>
          </div>
        </div>
      </div>
    </div>
    ))}
 </ReactReveal>
  </div>
</section>

<Draggable bounds={"main#main"}>
  <button className="w-[50px] h-[50px] fixed bottom-10 right-7 bg-slate-800 shadow-md block rounded-full z-10 text-white">
    <ShoppingCartCheckoutIcon sx={{fontSize: 25}}/>
	 	{totalInCart>0 && <span className="block absolute bottom-0 right-0 rounded-full w-[25px] h-[25px] flex justify-center items-center bg-red-500 text-white translate-x-[20%] translate-y-[20%]">
      {(totalInCart>9)? "9+" : totalInCart}
    </span>}
	 </button>
	</Draggable>

</side>
</section>
</main>
</MyContext.Provider>)
}



const MoreQuantityBtn = (props) => {
  const {handleAddToCart} = useContext(MyContext)
  const item = props.item;
  const i = props.index
  
  return(<>
    {(item.quantity>0) && 
    <div className="absolute top-3 right-3 ml-auto rounded py-1 px-2 bg-green-200 bg-opacity-80 text-sm text-green-900 quantity-options-cont">
        <div className="flex gap-x-1 select-none">
            <strong className="font-bold text-lg">({item.quantity}) </strong> 
            <span>selected</span> 
            <div>
              <ExpandMoreIcon className="expandmorearrow"/>
              <ExpandLessIcon className="expandlessarrow hidden"/>
            </div>
        </div>
        <div className="absolute top-[100%] left-0 shadow-lg w-[50px] max-h-[200px] overflow-scroll rounded-sm z-5 bg-gray-100 divide-y divide-y-slate-100 quantity-options hidden">
          {Array(20).fill().map((x,index)=>(
            <span 
              key={index}
              className="block text-md p-3 text-center font-bold text-green-800 active:bg-green-100" 
                onClick={()=>{
                  if(item.quantity===index+1)return;
                  handleAddToCart(i, 1+index);
                }}
            >
              {index+1}
            </span>)
          )}
        </div>
    </div>}
  </>)
}

export default memo(App)

export const getStaticProps = (ctx)=>{
  return({
    props: {
      description: lorem.generateSentences()
    }
  })
}


function capitalize(str){
  if(str.constructor !== String) {
    throw TypeError("parameter must be string")
  }
  let strArr = str.trim().split(/\s+/g);
  strArr = strArr.map(x=>{
    x = x[0].toUpperCase() + x.slice(1).toLowerCase();
    return x; 
  })
  return strArr.join(" ");
}