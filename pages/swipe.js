import React, {useState, useEffect, useMemo, memo} from "react"
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
  
  const githubUsers = useMemo(()=>{
    let data = props.githubUsers.sort(()=>{
      return (Math.random()-0.5 < 0)? -1 : 1;
    });
   if(data.length > 8) data.length = 8;
    return data; 
  }, []);
  
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
      variant="h4"
    >
      GITHUB USERS
    </Typography>
    <Box 
      sx={{
        borderTop: "5px solid #aaa",
        borderBottom: "5px solid #aaa",
        py: 4,
      }}
    >
      <SwipeableViews
        onChangeIndex={(i)=>{
         // setIndex(i)
        }}
        onTransitionEnd={(x)=>alert(x)}
        enableMouseEvents
        resistance
        slideStyle={{padding: "0 4px"}}
        style={{
          paddingRight: (index < githubUsers.length-1)? 20 : 0,
          paddingLeft: (index > 0)? 20 : 0,
        }}
      >
        {
          githubUsers.map((user,i)=>(
            <Paper
              key={i} 
              sx={{
                my: 3,
                overflow:"hidden",
              }}
            >
              <div style={{height:300, width:300, position:"relative"}}
              >
                <MyImage
                  src={user.avatar_url}
                  isProd={props.isProd}
                  loader={(_obj)=> _obj.src}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  quality={70}
                />
              </div>
              <div style={{padding: 8}}>
                <h4>
                  {capitalize(user.login)}
                </h4>
                <Button 
                  href={user.html_url}
                  variant="contained"
                  sx={{mt: 4}}
                >
                  VISIT PROFILE
                </Button>
              </div>
            </Paper>
          ))
        }
      </SwipeableViews>
    </Box>
  
  </>)
}



export async function getStaticProps(){
  let users = await new Promise((resolve, reject)=>{
    axios.get("https://api.github.com/users")
    .then((resp)=>{
      resolve(resp.data)
    })
    .catch((e)=>{
      reject([]);
    })
  })
  return ({
    props: {
      githubUsers: users,
    },
    revalidate: 60*60 // 1 hr
  })
}



const MyImage = memo((props)=>{
  return(
    (props.isProd)? 
    (<Image {...props} />) :
    (<img src={props.src} style={{height:"100%", width:"100%",objectFit:"cover"}} />)
  )
})

export default memo(withRouter(App))