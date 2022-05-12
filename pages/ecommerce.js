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
import Fade from "@mui/material/Fade"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
import Modal from "@mui/material/Modal"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import AddTaskIcon from "@mui/icons-material/AddTask"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import Image from "next/image"
import {LoremIpsum} from "lorem-ipsum"

const currency = "$";
const CartContext = createContext()
const HeadPasserContext = createContext()
const lorem = new LoremIpsum()
String.prototype.toCapitalize = function(){
  return (this).replace(/\s+/g, " ")
  .split(" ").map(str=>{
    return str[0]?.toUpperCase()+str.slice(1)?.toLowerCase()
  })
  .join(" ");
}
const stockItems = [
      {
        id: 1,
        name: "red shirt",
        src: "/ecommerce/shirt1.jpg",
        price: random.int(10, 200)+"."+random.int(10,99),
        addedToCart: false,
        quantity: 1,
      },
      {
        id: 2,
        name: "black shirt",
        src: "/ecommerce/shirt2.jpg",
        price: random.int(5, 100)+"."+random.int(10,99),
        addedToCart: false,
        quantity: 1,
      },
      ...[...new Array(random.int(8,15))].map(()=>({
        id: Math.random(),
        name: lorem.generateWords(1),
        src: `https://picsum.photos/300/200?x=${Math.random()}`,
        price: random.int(10, 200)+"."+random.int(10,99),
        addedToCart: false,
        quantity: 1,
      })),
    ];
    
function App(){
  const theme = useTheme();
  console.log(theme.palette.text)
  const [showAddedCartsOnly, setShowAddedCartsOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItemsPrice, setTotalItemsPrice] = useState()
  const [itemList, setItemList] = useState(stockItems);
  const [quantity, setQuantity] = useState(NaN);
  const [modalObj, setModalObj] = useState({
    show: false,
    itemId: 0,
  });
  
  const handleQuatity = (e)=>{
    let val = e.target.value
    setQuantity(Number(val))
  }
  
  const handleCloseModal = ()=>{
    setModalObj(obj=>({
      ...obj,
      show: false
    }));
    setQuantity(NaN);
  }
  
  const handleApplyQuantity = (id)=>{
    if(!Number.isInteger(quantity) || quantity<1){
      alert("Sorry, the value you entered is not allowed.");
      return;
    }
    let newList = itemList.map(item=>{
      if(item.id === id){
         item.quantity = quantity
      }
      return item
    })
    setItemList(newList)
    handleCloseModal()
  }
  
  const handleAddToCart = (id)=>{
    let newList = itemList.map(item=>{
      if(item.id === id){
         item.addedToCart = !item.addedToCart
      }
      return item
    })
    setItemList(newList)
  }
    
  const handleSetShowAddedCartsOnly = bool=> ()=>{
    if(showAddedCartsOnly===bool) return;
    setIsLoading(true);
    setTimeout(function() {
      setIsLoading(false);
      setShowAddedCartsOnly(bool)
    }, random.int(500, 2000));
  }
  
  const getTotalAmount = (val)=>{
    let amount = val || 0;
    val || itemList.filter(x=>x.addedToCart===true).forEach(item=>{
      amount += (item.quantity*item.price)
    });
    return (+amount.toFixed(2)).toLocaleString("en");
  }
    
  return(
    <>
      {showAddedCartsOnly &&
        <Button 
          startIcon={<ArrowBackIcon/>}
          onClick={handleSetShowAddedCartsOnly(false)}>
            Back To Items
        </Button>
      }
   <div style={{position:"sticky", top:70, display:"flex", zIndex:theme.zIndex.appBar-1}}>
      <Badge 
        badgeContent={
        itemList.filter(item=>item.addedToCart===true).length
        } 
        max={99}
        color="success"
        sx={{ml: "auto", mr:"5px"}}
        onClick={handleSetShowAddedCartsOnly(true)}>
          <ShoppingCartIcon 
            sx={{
              fontSize: 40,
              transition: "0.3s",
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
          setModalObj,
      }}>
        <RenderItems />
     </CartContext.Provider>
     
      {(showAddedCartsOnly && itemList.filter(x=>x.addedToCart===true).length>0) && 
      <div style={{margin:"20px 0"}}>
        <Divider sx={{my:3}}/>
        <Typography>
          <b>Total Items:</b> {itemList.filter(x=>x.addedToCart===true).length}
          <br/>
          <b>Total Amount:</b> {currency+getTotalAmount()}
          <br/>
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<ShoppingCartCheckoutIcon/>
          }
          size="larger"
          onClick={()=>alert("Comming soon 😜")}
        >
          BUY NOW
        </Button>
      </div>
    }
    
      <Modal
        open={modalObj.show}
        onClose={handleCloseModal}
        >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {xs:"95%", sm:500},
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
        }}>
          <Typography variant="h5">{itemList.find(obj=> obj.id===modalObj.itemId)?.name}
          </Typography>
          <Divider sx={{my:2}}/>
          <div style={{dislay:"flex",justifyContent:"center"}}>
            <TextField label="Item Quantity" onChange={handleQuatity} type="number"/>
          </div>
          <Divider sx={{my:2}}/>
          <Button variant="contained" fullWidth onClick={()=>handleApplyQuantity(modalObj.itemId)}>
            Apply Change
          </Button>
        </Box>
      </Modal>
  </>
)}



function RenderItems(){
  const {itemList, handleAddToCart, handleSetShowAddedCartsOnly, showAddedCartsOnly, isLoading, setModalObj} = useContext(CartContext)
  return(
    <>
      {(itemList.length === 0 || isLoading) ?
        <Box 
          sx={{height:"30vh", width:"100%"}} 
          display="flex" 
          justifyContent="center" 
          alignItems="center"
          >
          {(isLoading)? <CircularProgress/> : 
          <Stack spacing={3} alignItems="center">
            <Typography variant="h4" color="text.disabled" sx={{fontWeight: 200}}>(Empty)</Typography>
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
        :
        <Box 
          display="flex" 
          flexWrap="wrap"
          sx={{
            bgColor: "secondary"
          }}>
        {itemList.map(item=>(
          <Card key={item.id} sx={{
          width:{xs:"100%", sm: "300px"}, mx:1, mb:2, pb:2,
          }}>
            <img src={item.src} style={{width:"100%", height:"200px", objectFit:"cover"}} alt="Item picture"/>
            <div style={{padding: "5px 10px", position:"relative"}}>
           {item.addedToCart && <AddTaskIcon color="success" sx={{position:"absolute",top:7,right:7}} />
           }
            <Typography color="primary" variant="h6">{item.name}</Typography>
           <Button sx={{my:2, color:"text.primary"}} onClick={()=>setModalObj(obj=>({
             show: true,
             itemId: item.id,
           }))} 
           size="small"
           startIcon={<ExpandMoreIcon/>}
           >
            Select Quantity ({item.quantity})
           </Button>
            <Typography variant="h4" s={{mt:2,mb:1}}>
            {currency+item.price}
          </Typography>
          <Stack spacing={1} sx={{mt:1}}>
            <Button
              variant="outlined"
              onClick={()=>handleAddToCart(item.id)}
              startIcon={item.addedToCart? <RemoveShoppingCartIcon/> :  <AddShoppingCartIcon/>}>
              {item.addedToCart?"REMOVE FROM CART":"ADD TO CART"}</Button>
            {showAddedCartsOnly || <Button variant="contained" startIcon={<AttachMoneyIcon/>}>BUY NOW</Button>}
          </Stack>
        </div>
      </Card>
    ))}
    </Box>}

  </>)
}



export function getServerSideProps({req}){
  // console.log(req)
  return ({
    props: {
      title: "E-Commerce",
      cookies: req.cookies,
      //baseUrl: req.url,
    }
  })
}



export default memo(App)