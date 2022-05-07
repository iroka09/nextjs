import React, {useState, memo, createContext, useContext} from "react";
import random from "random"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles"
import Badge from "@mui/material/Badge"
import Fab from "@mui/material/Fab"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import AddTaskIcon from "@mui/icons-material/AddTask"
import Image from "next/image"
import {LoremIpsum} from "lorem-ipsum"

const CartContext = createContext()
const HeadPasserContext = createContext()
const lorem = new LoremIpsum()

function App(){
  const theme = useTheme();
  // console.log(theme.palette)
  const [showAddedCartsOnly, setShowAddedCartsOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemList, setItemList] = useState([
      {
        id: 1,
        name: "RED SHIRT",
        src: "/ecommerce/shirt1.jpg",
        description: lorem.generateWords(random.int(10,20)),
        price: "$"+random.int(10, 200)+"."+random.int(10,99),
        addedToCart: false,
      },
      {
        id: 2,
        name: "BLACK SHIRT",
        src: "/ecommerce/shirt2.jpg",
        description: lorem.generateWords(random.int(10,20)),
        price: "$"+random.int(5, 100)+"."+random.int(10,99),
        addedToCart: false,
      },
      ...([...new Array(10)].map(()=>({
        id: Math.random(),
        name: lorem.generateWords(1).toUpperCase(),
        src: `https://picsum.photos/300/200?x=${Math.random()}`,
        description: lorem.generateWords(random.int(10,20)),
        price: "$"+random.int(10, 200)+"."+random.int(10,99),
        addedToCart: false,
      }))),
    ]);
    
    const handleAddToCart = (id)=>{
     let newList = itemList.map(item=>{
       if(item.id === id){
         item.addedToCart = !item.addedToCart
       }
       return item
     })
      setItemList(newList)
    }
    
    const handleSetShowAddedCartsOnly = (bool)=> ()=>{
      if(showAddedCartsOnly===bool) return;
      setIsLoading(true);
      setTimeout(function() {
        setIsLoading(false);
        setShowAddedCartsOnly(bool)
      }, random.int(500, 2000));
    }
    
  return(
    <>
      {showAddedCartsOnly &&
        <Button 
          variant="outlined"
          startIcon={<ArrowBackIcon/>}
          onClick={handleSetShowAddedCartsOnly(false)}>
            Back To Items
        </Button>
      }
   <div style={{height:0, width:"100%", position:"sticky", top:70, padding:"0 5px 5px", display:"flex", zIndex:theme.zIndex.appBar-1}}>
      <Badge 
        badgeContent={
        itemList.filter(item=>item.addedToCart===true).length
        } 
        max={99}
        color="success"
        sx={{ml: "auto"}}
        onClick={handleSetShowAddedCartsOnly(true)}>
          <ShoppingCartIcon 
            sx={{
              fontSize: 40,
              transition: "0.5s",
               "&:active":  {
                color: "primary.main",
              },
            }}
            />
      </Badge>
    </div>
    
      <CartContext.Provider 
        value={{
          itemList: ((showAddedCartsOnly)? itemList.filter(x=>x.addedToCart===true) : itemList),
          handleAddToCart,
          handleSetShowAddedCartsOnly,
          isLoading,
          showAddedCartsOnly,
      }}>
      <RenderItems />
    </CartContext.Provider>
    
  </>
)}



function RenderItems(){
  const {itemList, handleAddToCart, handleSetShowAddedCartsOnly, showAddedCartsOnly, isLoading} = useContext(CartContext)
  return(
    <>
      {
        (itemList.length === 0 || isLoading) &&
        <Box 
          sx={{height:"60vh", width:"100%"}} 
          display="flex" 
          justifyContent="center" 
          alignItems="center"
          >
          {(isLoading)? <CircularProgress/> : 
          <Stack spacing={3} alignItems="center">
            <Typography variant="h4" color="text.disabled">(Empty)</Typography>
            <Button 
              onClick={handleSetShowAddedCartsOnly(false)}
              size="large"
              startIcon={<AddShoppingCartIcon/>}
              >
              Add To Cart
            </Button>
          </Stack>
          }
        </Box>
      }
      
      {isLoading || 
      <>
       <Box display="flex" justifyContent="space-around" flexWrap="wrap">
       {itemList.map(item=>(
      <Card key={item.id} sx={{maxWidth: "300px", m:2, pb:2}}>
        <img src={item.src} style={{width:"100%", height:"250px", objectFit:"cover"}} alt="Item picture"/>
        <div style={{padding: "5px 10px", position:"relative"}}>
           {item.addedToCart && <AddTaskIcon color="success" sx={{position:"absolute",top:7,right:7}} />}
          <Typography color="primary" variant="h5">{item.name}</Typography>
          <Typography color="text.secondary" variant="body2">{item.description}</Typography>
          <Typography variant="h5" sx={{display:"flex",alignItems:"center",mt:1}}>
            {item.price}
          </Typography>
          <Stack spacing={1} justifyContent="center" sx={{mt:1}}>
            <Button 
              onClick={()=>handleAddToCart(item.id)}
              startIcon={item.addedToCart? <RemoveShoppingCartIcon/> :  <AddShoppingCartIcon/>}>
              {item.addedToCart?"REMOVE FROM CART":"ADD TO CART"}</Button>
            {showAddedCartsOnly || <Button variant="contained" startIcon={<AttachMoneyIcon/>}>BUY NOW</Button>}
          </Stack>
        </div>
      </Card>
    ))}
    </Box>
    <div style={{display:"flex", justifyContent:"center", margin:"20px 0"}}>
      {(showAddedCartsOnly && itemList.length>0) && 
        <Button
          variant="contained"
          startIcon={<ShoppingCartCheckoutIcon/>}
          size="large"
        >
          BUY NOW
        </Button>
      }
    </div>
    </>
    }
  </>)
}



export function getServerSideProps({req}){
  console.log(req)
  return ({
    props: {
      title: "E-Commerce",
      cookies: req.cookies,
      //baseUrl: req.url,
    }
  })
}



export default memo(App)