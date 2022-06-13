import React from "react"
import {useRouter} from "next/router"
import random from "random"
import {experimental_sx as sx} from "@mui/material/styles"

export default function App(props){
  const router = useRouter()
  //console.log(router)
  return(
    <>
    <h1 style={{
      marginTop: 5,
    }}>
      {props.num}
    </h1>
    
    {router.isFallback? 
    <h2>Loading...</h2> :
    <h4>
      No fallback: {props.myName}
    </h4>}
    </>
  )
}

export function getStaticPaths(){
  return({
    paths: [
      {
        params: {name: "iroka"},
      },
      {
        params: {name: "tochi"},
      },
    ],
    fallback: "blocking" //true, false, blocking.
  })
}


export function getStaticProps({params}){
  const num = random.int(1, 100)
  return({
    props: {
      myName: params.name,
      num,
    },
    revalidate: 10 //regenerate this page after 10sec, below it uses built page.
  })
}