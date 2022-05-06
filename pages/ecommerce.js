import React from "react";
import random from "random"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles"
import Badge from "@mui/material/Badge"
// import Avatar from "@mui/material/Avatar"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"
import Image from "next/image"
import {LoremIpsum} from "lorem-ipsum"

const lorem = new LoremIpsum()

function App(){
  const theme = useTheme();
  //console.log(theme)
  const [itemList, setItemList] = React.useState([
      {
        id: 1,
        name: "RED T-SHIRT",
        src: "/ecommerce/shirt1.jpg",
        description: lorem.generateWords(random.int(10,20)),
        price: random.int(10, 100),
        addedToCart: false,
      },
      {
        id: 2,
        name: "BLACK T-SHIRT",
        src: "/ecommerce/shirt2.jpg",
        description: lorem.generateWords(random.int(10,20)),
        price: random.int(10, 100),
        addedToCart: false,
      },
      ...([...new Array(10)].map(()=>({
        id: Math.random(),
        name: lorem.generateWords(1).toUpperCase(),
        src: `https://picsum.photos/300/200?x=${Math.random()}`,
        description: lorem.generateWords(random.int(10,20)),
        price: random.int(10, 200),
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
    
  return(
    <>
   { itemList.some(item=>item.addedToCart===true) &&
    <div style={{height:0, width:"100%", position:"sticky", top:70, padding:"0 5px 5px", display:"flex", justifyContent:"flex-end"}}>
    <Badge 
      badgeContent={
        itemList.filter(item=>item.addedToCart===true).length
      } 
      max={99}
      color="error"
      sx={{boxShadow:"0 2px 1px #aaa",bgcolor:"#fff", zIndex:theme.zIndex.appBar+1}}>
      <ShoppingCartIcon />
    </Badge>
    </div>
   } 
    <Box display="flex" justifyContent="space-around" flexWrap="wrap">
    {itemList.map(item=>(
      <Card key={item.id} sx={{maxWidth: "300px", m:2, pb:2}}>
        <img src={item.src} style={{width:"100%", height:"250px", objectFit:"cover"}}/>
        <div style={{padding: "5px 10px", position:"relative"}}>
           {item.addedToCart && <CheckCircleIcon color="success" sx={{position:"absolute",top:5,right:5}} />}
          <Typography color="primary" variant="h5">{item.name}</Typography>
          <Typography color="text.secondary" variant="body1">{item.description}</Typography>
          <Stack spacing={1} justifyContent="center" sx={{mt:2}}>
            <Button 
              onClick={()=>handleAddToCart(item.id)}
              startIcon={item.addedToCart? <RemoveShoppingCartIcon/> :  <AddShoppingCartIcon/>}>
              {item.addedToCart?"REMOVE FROM CART":"ADD TO CART"}</Button>
            <Button variant="contained">${item.price} BUY NOW</Button>
          </Stack>
        </div>
      </Card>
    ))}
    </Box>
  </>
)}

export function getServerSideProps({req}){
  return ({
    props: {
      title: "E-commerce",
      cookies: req.cookies
    }
  })
}

export default React.memo(App)