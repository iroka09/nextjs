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


function App(props){
  
  const isProd = process.env.NODE_ENV==="production" || !!props.router?.query.isProd;
  
  const githubUsers = props.githubUsers;
  console.log(githubUsers,"yesoooooo")
  return(
  <>
    <Head>
      <meta charSet="UTF-8" />
      <title>React-Swiper</title>
    </Head>
    
    <Box margin="20px 0">
      <Swipe isProd={isProd}/>
    </Box>
    
    <Typography
      component="strong"
      variant="h2"
      margin="10px 0"
    >
      Github Users
    </Typography>
    <Box>
      <SwipeableViews
        slideStyle={{padding: "0 5px"}}
        style={{padding: "0 15px 0 0"}}
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
              <Typography variant="h6">{user.name}</Typography>
              <Button 
                href={user.url}
                fullWidth
                sx={{m: 2, mt: 3}}
              >
                {"User's Github"}
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