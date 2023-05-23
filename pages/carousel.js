import React, {useState, useEffect, useRef,  useMemo, createContext, useContext, memo} from "react"
import AliceCarousel from 'react-alice-carousel';
import Head from 'next/head';
import random from 'random';
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

const ExpandContext = createContext()


const mappedImageNames = imageNames.map((name,i)=>({
    name: capitalize(name.replace(/\_+/g, " ").replace(/\.jpg$/gi, "")),
    src: `/food_pictures/${name.toLowerCase()}`,
    price: random.int(10, 50),
    currency: "$",
    quantity: 0,
  }))


function App(props) {
  
  const [totalInCart, setTotalInCart]= useState(0);
  const [expandIndex, setExpandIndex]= useState(NaN);
  const [isSideBarOpen, setIsSideBarOpen]=useState(false)
  const [items, setItems] =
  useState(mappedImageNames)
  
  const itemsCarousel = useMemo(()=>items.map((obj,i)=>(
    <img 
      src={obj.src} 
      alt={obj.src.replace(/\.jpg$/i, "")} 
      onDragStart={e=> e.preventDefault()}
      style={{
        width: "100%",
        border: "1px solid white",
        height: 250,
        objectFit: "cover",
      }}
    />
  )), [])
  
  const handleAddToCart = (i,quantity,isAddCloseBtn)=>{
    setItems(prevItems=> prevItems.map((x,index)=>{
        if(i===index){
          if(isAddCloseBtn){
            x.quantity = +(!x.quantity)
          }
          else{
            x.quantity = quantity
          }
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
  
  const handleExpandMoreQuantity = (i)=>{
    setExpandIndex(expandIndex===i? NaN:i)
  }
  
  return (
<ExpandContext.Provider
  value={{handleAddToCart,handleExpandMoreQuantity, setExpandIndex,expandIndex}}
  >
  <Head>
    <title>Food Shopping</title>
    <meta name="description" content="We provide all kind of African dishes, just make your order we will provide it as quick as possible" />
  </Head>
  
<main id="main" className="h-screen overflow-scroll">
  <div className="p-3">
    <img src="/favicon.ico" alt="icon logo" className="w-[50px] h-[50px] rounded-full object-cover"/>
    <h1 className="ml-3 text-2xl text-green-600 uppercase">Sweet Pie</h1>
  </div>
  <div className="p-3 flex shadow-sm bg-slate-900 shadow-sm sticky top-0 w-full z-10 md:hidden">
    <button className="active:bg-slate-500 bg-opacity-10 text-white" onClick={()=>{
      setIsSideBarOpen(x=>!x)
    }}
    >{(!isSideBarOpen)?<MenuIcon sx={{fontSize:30}}/> : <CloseIcon sx={{fontSize:30}}/>}
    </button>
    <button className="active:bg-slate-500 bg-opacity-10 ml-auto text-white">
      <SearchIcon sx={{fontSize:30}}/>
    </button>
  </div>
  
  <div className="mt-5">
    <AliceCarousel
      autoPlay
      infinite
      disableButtonsControls
      disableDotsControls
      autoPlayInterval={2000}
      items={itemsCarousel}
      responsive={{
        0: {
            items: 1
          },
        750: {
          items: 3
        }
      }}
    />
  </div>
  
<div className="mx-1">
  <h1 className="text-blue-400 mt-5 mb-2 text-2xl">SELECT YOUR FAVOURITE DISHES</h1>
  <p className="mb-4">We provide all kinds of African dishes, just make your order we will provide it as quick as possible.</p>
  
  <div className="grid grid-cols-12 justify-center my-3 gap-2">
    {items.map((item,i)=>(
      <div className="col-span-full sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
      <div className="relative shadow w-full rounded dark-mode-card bg-slate-100">
        <img className="w-full h-[200px] object-cover" src={item.src} alt="image item"/>
        <MoreQuantityBtn item={item} index={i}/>
        <div className="p-3">
          <h1 className="text-slate-700 text-3xl my-3 w-full truncate">{item.name}</h1>
          <div className="flex items-center">
            <span className="block text-3xl font-bold text-green-600">{item.currency} {item.price
            }</span>
            <button className="py-1 px-3 bg-slate-800 rounded text-white transition active:bg-slate-900 ml-4 shadow hover:shadow-lg uppercase brightness-10" onClick={()=>handleAddToCart(i,1,true)}
            >
              {(item.quantity===0)? <><AddShoppingCartIcon /> Add </> : <><RemoveShoppingCartIcon/> Remove</>}
            </button>
          </div>
        </div>
      </div>
    </div>
    ))}
  </div>
</div>

<Draggable bounds={"main#main"}>
  <button className="w-[50px] h-[50px] fixed bottom-20 right-7 bg-slate-800 shadow-md block rounded-full z-10 text-white">
    <ShoppingCartCheckoutIcon sx={{fontSize: 25}}/>
	 	{totalInCart>0 && <span className="block absolute bottom-0 right-0 rounded-full w-[25px] h-[25px] flex justify-center items-center bg-red-500 text-white translate-x-[20%] translate-y-[20%]">
      {(totalInCart>9)? "9+" : totalInCart}
    </span>}
	 </button>
	</Draggable>

</main>
</ExpandContext.Provider>)
}



const MoreQuantityBtn = (props) => {
  const {handleAddToCart,handleExpandMoreQuantity, setExpandIndex,expandIndex} = useContext(ExpandContext)
  const item = props.item;
  const i = props.index
  
  return(<>
    {(item.quantity>0) && 
    <div className="absolute top-3 right-3 ml-auto rounded py-1 pl-2 bg-white bg-opacity-80 text-sm">
        <div onClick={()=>handleExpandMoreQuantity(i)}>
            <strong className="text-green-600">{item.quantity} selected</strong>
            {(expandIndex!==i)? <ExpandMoreIcon/>:<ExpandLessIcon/>}
        </div>
        {(expandIndex===i) && 
        <div className="absolute top-[100%] left-0 shadow-lg w-[50px] max-h-[200px] overflow-scroll rounded-sm z-5 bg-gray-100 divide-y divide-y-slate-100">
          {Array(20).fill().map((x,index)=>(
            <span 
              className="block text-md p-3 text-center font-bold text-slate-600 active:bg-slate-300" 
                onClick={()=>{
                  if(item.quantity===index+1)return;
                  handleAddToCart(i, 1+index);
                  setExpandIndex(NaN)
                }}
            >
              {index+1}
            </span>))}
        </div>}
    </div>}
  </>)
}

export default memo(App)



function capitalize(str){
  if(str.constructor !== String) {
    return Error("parameter must be string")
  }
  let strArr = str.trim().split(/\s+/g);
  strArr = strArr.map(x=>{
    x = x[0].toUpperCase() + x.slice(1).toLowerCase();
    return x; 
  })
  return strArr.join(" ");
}