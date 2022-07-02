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
  const isProd = process.env.NODE_ENV==="production" || !!props.router?.query.isProd;
  const githubUsers = props.githubUsers;
  const handleSwitch = (i, type)=>{
    setIndex(i)
  }
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
    
    <Divider sx={{my:3}} />
    
    <Typography
      component="strong"
      variant="h4"
      margin="10px 0"
    >
      Github Users ({index})
    </Typography>
    <Box>
      <SwipeableViews
        enableMouseEvents
        resistance
        onSwitching={handleSwitch}
        slideStyle={{padding: "0 5px"}}
        style={{padding: "0 17px 0 0"}}
      >
        {
          githubUsers?.map((user, i)=>(
            <Paper key={i} sx={{overflow:"hidden"}}>
              <Box sx={{h:150, w:300, position:"relative", mb:2}}
              >
                <MyImage
                  user={user}
                  isProd={props.isProd}
                  loader={(_obj)=> _obj.src}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  quality={100}
                />
              </Box>
              <Typography variant="h6">{capitalize(user.login)}</Typography>
              <Button 
                href={user.url}
                variant="contained"
                fullWidth
                sx={{m: 1, mt: 3}}
              >
                {"USERS'S PROFILE"}
              </Button>
            </Paper>
          ))
        }
      </SwipeableViews>
    </Box>
  
  </>)
}



export async function getStaticProps(){
  let resp = [{}];
  try{
    resp = await axios.get("https://api.github.com/users");
  }
  catch(e){
    resp = e
  }
  return ({
    props: {
      githubUsers: resp.data
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