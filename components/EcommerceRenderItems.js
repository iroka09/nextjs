import React, {useContext, memo, useRef, useState, useEffect} from "react"
import {CartContext, capitalize} from "../pages/ecommerce"
import Image from "next/image"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"
import AddTaskIcon from "@mui/icons-material/AddTask"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import Fade from "react-reveal/Fade"

const imageLoading = "/image_loading.jpg"



function RenderItems(){
  const {
    itemList, 
    handleAddToCart, 
    handleSetShowAddedCartsOnly, 
    showAddedCartsOnly, 
    isLoading, 
    setDialogObj, 
    currency,
    handleCommingSoon
  } 
  = useContext(CartContext);/*
const imageRef = useRef()
useEffect(()=>{
  alert()
  try{
  alert(imageRef.current.style)
  }
  catch(e){
    alert(e)
  }
})*/
  // console.log(useContext(CartContext))
 // const [val, setVal] = useState({})
  /*
  useEffect(()=>{
    alert(
      Object.entries(obj)
    )
  }, [val])
  */
  return(
    <>
      {(itemList.length > 0 && !isLoading) ?
        <Grid 
          container 
          spacing={2} 
          sx={{py:2}}
        >
        {itemList.map((item,index)=>(
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.id}>
        <Fade bottom>
          <Card>
            <div
              style={{
                position:"relative",
                width:"100%",
                height: 250,
              }}
            >
              <Image
                src={item.src}
                loader={(obj)=>{
                  // setVal(obj)
                  if(obj.src?.match(/^http:\/\/|^https:\/\//i)){
                    return obj.src
                  }
                  return "/pic"+(index+1)+".jpg"
                }}
                alt="Item Picture"
                layout='fill'
                objectFit= "cover"
                placeholder="blur"
                quality={100}
                blurDataURL={item.src+"/?blur"}
              />
            </div>
            <div style={{padding: 10, position:"relative"}}>
           {item.addedToCart && <AddTaskIcon color="success" sx={{position:"absolute",top:7,right:7}} />
           }
            <Typography color="primary" variant="h6" >{capitalize(item.name)}</Typography>
           <Button 
              sx={{my:1, color:"text.primary"}} 
              onClick={()=>setDialogObj(obj=>({
                showDialog: true,
                itemId: item.id,
                }))
              } 
           size="small"
           startIcon={<ExpandMoreIcon/>}
           >
            Select Quantity (<span style={{color: "tomato"}}>{item.quantity}</span>)
           </Button>
            <Typography variant="h4" s={{mt:2,mb:1}}>
            {currency+item.price}
          </Typography>
          <Stack spacing={1} sx={{mt:1}}>
            <Button
              variant="outlined"
              onClick={()=>handleAddToCart(item.id)}
              startIcon={item.addedToCart? <RemoveShoppingCartIcon/> :  <AddShoppingCartIcon/>}>
              {item.addedToCart?"REMOVE FROM CART":"ADD TO CART"}
            </Button>
            {showAddedCartsOnly || 
            <Button
              variant="contained" 
              startIcon={<AttachMoneyIcon/>} 
              disableElevation
              onClick={handleCommingSoon}
              >
              BUY NOW
            </Button>}
          </Stack>
        </div>
      </Card>
      </Fade>
      </Grid>
    ))}
    </Grid>
        :
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
        }
  </>)
}

export default memo(RenderItems)