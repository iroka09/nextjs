import React,  {useState, useEffect, memo} from "react"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Fab from "@mui/material/Fab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import random from "random"
import Link from "next/link"
import Head from "next/head"
import Highlight from "react-highlight"
import {useRouter} from "next/router"


function App(props){
  
  const router = useRouter()
  const [num, setNum] = useState(props.id)
  const [query, setGuery] = useState(0)
  const [asPath, setAsPath] = useState("/Iroka")

  return (
    <>
      <Head>
        <title>Router</title>
      </Head>
      
    {router.isFallback? (
      <h3>
       fallback: Loading...
      </h3>
      ) : ( 
      <>
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
      <Stack 
        justifyContent="center" 
        margin="30px 0" 
        spacing={1}
        alignItems="center"
      >
        <TextField
          variant="contained"
          label="Query"
          onChange={(e)=>{
            setQuery(e.target.value)
          }}
        />
        <TextField
          variant="contained"
          label="asPath"
          onChange={(e)=>{
            setAsPath(e.target.value)
          }}
        />
        <Button
          variant="contained" 
          color="secondary"
          onClick={()=>{
            router.push({{
            pathname: "/learn/[id]",
            query: {id: query},
            asPath,
            scroll: false, 
          }})
        }}>
          GO
        </Button>
      </Stack>
      <Highlight style={{borderRadius: 5}}>
        {JSON.stringify(router, null, 2)}
      </Highlight>
      </>
      )
    }
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
  console.log(params.id+") ", Math.random())
  return({
    props: {
      id: params.id
    },
    revalidate: false,
  })
}


export default memo(App)