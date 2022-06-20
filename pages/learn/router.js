import React,  {useState, useEffect, memo} from "react"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Fab from "@mui/material/Fab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import random from "random"
import Link from "next/link"
import Head from "next/head"
import {useRouter} from "next/router"


function App(props){
  const router = useRouter()
  const [num, setNum] = useState(router.query?.num || 0)
  
  useEffect(()=>{
    alert(JSON.stringify(router,0,2))
  }, [router.query?.num])
  
  return (
    <>
      <Head>
        <title>Router</title>
      </Head>
    
      <Stack 
        direction="row" 
        spacing={5}
        justifyContent="center"
        alignItems="center"
        margin="20px 0"
        >
        <Fab
          onClick={()=>setNum(x=>--x)}
        >  -  </Fab>
        <Box>{num}</Box>
        <Fab
          onClick={()=>setNum(x=>++x)}
          color="primary"
        > + </Fab>
      </Stack>
      <Box margin="20px 0">
        <Link href={{
          pathname: "/learn/router",
          query: {num: random.int(0,100)},
        }}>
          <Button variant="contained">link button</Button>
        </Link>
      </Box>
      <Typography variant="body2">
        value of router during ssr is 
        <pre>{JSON.stringify(router,0,2)}</pre>
      </Typography>
    </>
  )
}



export default memo(App)