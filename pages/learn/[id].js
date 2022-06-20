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
  const [num, setNum] = useState(props.id)
  

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
        <Fab onClick={()=>setNum(x=>--x)}>  -  </Fab>
        <Box>{num}</Box>
        <Fab onClick={()=>setNum(x=>++x)}
          color="primary"> + </Fab>
      </Stack>
      <Stack justifyContent="center" margin="30px 0">
        <Link href={{
          pathname: "/learn/[id]",
          query: {id: random.int(0,100)},
        }}
        as="Iroka">
          <Button variant="contained">link  random</Button>
        </Link>
        <Button
          variant="contained" 
          onClick={()=>{
            router.push("/learn/55", "Tochi")
        }}>
          link 55
        </Button>
      </Stack>
      <Typography variant="body2">
        value of router during ssr is 
        <pre>{JSON.stringify(router,0,2)}</pre>
      </Typography>
    </>
  )
}


export function getStaticPaths(){
  return  ({
    paths: [
      {
        params: {id: "1"}
      },
      {
        params: {id: "2"}
      }
    ],
    fallback: true, 
  })
}

export function getStaticProps({params}){
  return({
    props: {
      id: params.id
    },
    revalidate: false,
  })
}


export default memo(App)