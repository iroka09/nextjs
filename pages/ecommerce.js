import React, {useState, memo, createContext, useContext, useEffect, useMemo, useCallback} from "react";
import random from "random"
import axios from "axios"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles"
import Badge from "@mui/material/Badge"
import Slide from "@mui/material/Slide"
import Fade from "@mui/material/Fade"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
//import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import AddTaskIcon from "@mui/icons-material/AddTask"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import RenderItems from "../components/EcommerceRenderItems"

import Image from "next/image"
import Head from "next/head"
import Draggable from "react-draggable"
import {LoremIpsum} from "lorem-ipsum"

/*
import shirt1 from "../public/ecommerce/shirt1.jpg"
import shirt2 from "../public/ecommerce/shirt2.jpg"
import pic3 from "../public/pic3.jpg".
*/

const shirt1 = "/ecommerce/shirt1.jpg"
const shirt2 = "/ecommerce/shirt2.jpg"
const pic3 = "/pic3.jpg"


export const CartContext = createContext();

export const capitalize = (text)=>{
  return text?.replace(/\s{2,}/g, " ")
  .split(" ")
  .map(str=> str[0]?.toUpperCase()+str.slice(1)?.toLowerCase())
  .join(" ");
}

const lorem = new LoremIpsum()
const currency = "$"

const stockItems = [
      {
        id: 1,
        name: "red shirt",
        src: {shirt1},
        price: random.int(10, 200)+"."+random.int(10,99),
        addedToCart: false,
        quantity: 1,
      },
      {
        id: 2,
        name: "black shirt",
        src: {shirt2},
        price: random.int(5, 100)+"."+random.int(10,99),
        addedToCart: false,
        quantity: 1,
      },
      {
        id: 3,
        name: "Iroka Tochi",
        src: {pic3},
        price: random.int(5, 100)+"."+random.int(10,99),
        addedToCart: false,
        quantity: 1,
      },
      ...[...new Array(random.int(15,20))].map(()=>({
        id: Math.random(),
        name: lorem.generateWords(2),
        src: `https://picsum.photos/300/200?x=${Math.random()}`,
        price: random.int(10, 200)+"."+random.int(10,99),
        addedToCart: false,
        quantity: 1,
      })),
    ];
    
const Transition = React.forwardRef((props, ref)=>{
  return <Slide direction="up" ref={ref} {...props} />
})
    
function App(){
  const theme = useTheme();
  //console.log(process.env)
  const [showAddedCartsOnly, setShowAddedCartsOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItemsPrice, setTotalItemsPrice] = useState()
  const [itemList, setItemList] = useState(stockItems);
  const [quantity, setQuantity] = useState(NaN);
  const [bodyWidth, setBodyWidth] = useState(100);
  const [bodyHeight, setBodyHeight] = useState(100);
  const [clientHeight, setClientHeight] = useState(100);
  
  
  const [dialogObj, setDialogObj] = useState({
    showDialog: false,
    itemId: 0,
  });
  
  const handleQuantityChange = useCallback((e)=>{
    let val = e.target.value
    setQuantity(Number(val))
  })
  
  const handleCommingSoon = useCallback(()=>{
    alert("Comming soon 😜")
  })
  
  const handleCloseDialog = useCallback(()=>{
    setDialogObj(obj=>({
      ...obj,
      showDialog: false
    }));
    setQuantity(NaN);
  })
  
  const handleApplyQuantity = useCallback(()=>{
    if(isNaN(quantity)){
      alert("Please enter a value.");
      return;
    }
    else if(!Number.isInteger(quantity) || quantity<1){
      alert("Sorry, only integer number is allowed.");
      return;
    }
    let newList = itemList.map(item=>{
      if(item.id === dialogObj.itemId){
         item.quantity = quantity
      }
      return item
    })
    setItemList(newList)
    handleCloseDialog()
  })
  
  const handleAddToCart = useCallback((id)=>{
    setItemList((items)=>{
      let newItem = items.map(item=>{
        if(item.id === id){
          item.addedToCart = !item.addedToCart
        }
        return item
      })
      return newItem
    })
  })
    
  const handleSetShowAddedCartsOnly = useCallback((bool)=> ()=>{
    if(showAddedCartsOnly===bool) return;
    setIsLoading(true);
    setTimeout(function() {
      setIsLoading(false);
      setShowAddedCartsOnly(bool)
    }, random.int(500, 2000));
  })
  
  const getTotalAmount = useCallback((val=0)=>{
    let amount = val;
    val || itemList.filter(x=>x.addedToCart===true).forEach(item=>{
      amount += (item.quantity*item.price)
    });
    return (+amount.toFixed(2)).toLocaleString("en");
  })
  
  return(
    <>
      <Head>
        <title>E-Commerce</title>
      </Head>
    
      {showAddedCartsOnly &&
        <Button 
          startIcon={<ArrowBackIcon/>}
          onClick={handleSetShowAddedCartsOnly(false)}>
            Back To Items
        </Button>
      }
    
      <Badge 
        badgeContent={
        itemList.filter(item=>item.addedToCart===true).length
        } 
        max={99}
        color="error"
        sx={{position:"fixed", zIndex: theme.zIndex.speedDial, top:80, right: 25}}
        onClick={handleSetShowAddedCartsOnly(true)}
        >
          <ShoppingCartIcon 
            sx={{
              fontSize: 40,
              color: "warning",
              transition: "0.3s",
               "&:active":  {
                color: "primary.main",
              },
            }}
            />
      </Badge>
    
      <CartContext.Provider 
        value={{
          itemList: ((showAddedCartsOnly)? itemList.filter(x=>x.addedToCart===true) : itemList),
          handleAddToCart,
          handleSetShowAddedCartsOnly,
          isLoading,
          showAddedCartsOnly,
          setDialogObj,
          currency,
          handleCommingSoon
        }}>
        <RenderItems />
      </CartContext.Provider>
     
      {(showAddedCartsOnly && itemList.filter(x=>x.addedToCart===true).length>=0) && 
      <Paper sx={{mt:"20px", mb:2, p: "10px"}}>
        <Typography sx={{mb: 2}}>
          <b>Total Items:</b> <span style={{color: "tomato"}}>{itemList.filter(x=>x.addedToCart===true).length}</span>
          <br/>
          <b>Total Amount:</b> <span style={{color: "tomato"}}>{currency+getTotalAmount()}</span>
        </Typography>
        <Button
          variant="contained"
          startIcon={<ShoppingCartCheckoutIcon/>
          }
          size="larger"
          onClick={handleCommingSoon}
        >
          BUY NOW
        </Button>
      </Paper>
    }
    
      <Dialog
        sx={{
          width: "90%",
          maxWidth: 600,
        }}
        open={dialogObj.showDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <Typography variant="h5" >
            {capitalize(
              itemList.find(obj=> obj.id===dialogObj.itemId)?.name
              )}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <TextField variant="standard" label="Quantity" onChange={handleQuantityChange} type="number" autoFocus={false}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={handleApplyQuantity}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
  </>
)}



export default memo(App)