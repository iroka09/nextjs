import React, {useState, useEffect, memo} from "react"
import Head from "next/head"
import axios from "axios"
import Image from "next/image"
import {withRouter} from "next/router"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Divider from "@mui/material/Divider"
import SwipeableViews from "react-swipeable-views"
import Swipe from "../components/Swipe"
import {capitalize} from "./ecommerce"

function App(props){
  const [index, setIndex] = useState(0)
  const [pictureQuality, setPictureQuality] = useState(50)
  const isProd = process.env.NODE_ENV==="production" || !!props.router?.query.isProd;
  const githubUsers = props.githubUsers;
  //githubUsers.length = 6;
  //console.log(githubUsers,"yesoooooo")
  return(
  <>
    <Head>
      <meta charSet="UTF-8" />
      <title>React-Swiper</title>
    </Head>
    
    <Box margin="20px 0">
      <Swipe isProd={isProd}/>
    </Box>
    
    <Divider sx={{my:7}} />
    
    <Typography
      component="strong"
      variant="h5"
    >
      Github Users
    </Typography>
    <Box>
      <SwipeableViews
        onChangeIndex={(i)=>{
          setIndex(i)
        }}
        enableMouseEvents
        resistance
        slideStyle={{padding: "0 3px"}}
        style={{
         // padding: "0",
          paddingRight: `${(index < githubUsers.length-1)? 20 : 0 }px`,
          paddingLeft: `${(index > 0)? 20 : 0 }px`,
        }}
      >
        {
          githubUsers.map((user, i)=>(
            <Paper key={i} sx={{overflow:"hidden"}}>
              <Box sx={{h:200, w:300, position:"relative"}}
              >
                <MyImage
                  user={user}
                  isProd={props.isProd}
                  loader={(_obj)=> _obj.src}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  quality={70}
                />
              </Box>
              <Box sx={{p:1.3}}>
                <Typography variant="h5">{capitalize(user.login)}</Typography>
                <Button 
                  href={user.html_url}
                  variant="contained"
                  fullWidth
                  sx={{mt: 3}}
                >
                  VISIT PROFILE
                </Button>
              </Box>
            </Paper>
          ))
        }
      </SwipeableViews>
    </Box>
  
  </>)
}



export async function getStaticProps(){
  let result = await new Promise((resolve, reject)=>{
    axios.get("https://api.github.com/users")
    .then((resp)=>{
      resolve(resp)
    })
    .catch((e)=>{
      reject({
        data: []
      });
    })
  }) 
  return ({
    props: {
      githubUsers: result.data
    },
    revalidate: 60*60*24 // 1 day
  })
}



function MyImage(props){
  return(
    (props.isProd)? 
    <Image src={props.user.avatar_url} {...props} /> :
    <img src={props.user.avatar_url} style={{height:"100%", width:"100%",objectFit:"cover"}} />
  )
}

export default memo(withRouter(App))