import React,  {useState, useEffect, memo} from "react"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Fab from "@mui/material/Fab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import {makeStyles} from "@mui/styles"
import random from "random"
import Head from "next/head"
import Highlight from "react-highlight"
import {useRouter} from "next/router"
import Link from "next/link"


const useMuiStyles = makeStyles({
  hjs: { 
    borderRadius: 5,
    maxHeight: 400,
    overflow: "scroll",
  }
})


function App(props){
  const router = useRouter()
  const classes = useMuiStyles()
  const [num, setNum] = useState(props.id)
  const [query, setQuery] = useState(props.id)
  const [pathname, setPathname] = useState("/learn/[id]")
  const [asPath, setAsPath] = useState("/Iroka")

  return (
    <>
      <Head>
        <title>Router</title>
      </Head>
      
    {(router.isFallback)? (
      <h3>
       fallback: building...
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
        <Fab onClick={()=>setNum(x=>--x)}>-</Fab>
        <Box>{num}</Box>
        <Fab onClick={()=>setNum(x=>++x)}
          color="primary">+</Fab>
      </Stack>
      <Stack 
        justifyContent="center" 
        margin="30px 0" 
        spacing={1}
        alignItems="center"
      >
        <TextField
          value={pathname}
          variant="outlined"
          label="pathname"
          onChange={(e)=>{
            setPathname(e.target.value)
          }}
        />
        <TextField
          value={query}
          variant="outlined"
          label="Query"
          type="number"
          onChange={(e)=>{
            setQuery(e.target.value)
          }}
        />
        <TextField
          defaultValue={asPath}
          variant="outlined"
          label="asPath"
          onChange={(e)=>{
            setAsPath(e.target.value)
          }}
        />
        <Button
          variant="contained" 
          color="secondary"
          onClick={()=>{
            router.push({
              pathname,
              query: {id: query},
            }, asPath, {
              scroll: false, //don't scroll to top of page when clicked
              shallow: true, //if true it won't make another server req
            })
        }}>
          GO with router.push({})
        </Button>
        <Link href={pathname} as={asPath}>
          <Button variant="contained" 
          color="info">
            Go with Link
          </Button>
        </Link>
      </Stack>
      <Highlight 
        className={classes.hjs}
      >
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