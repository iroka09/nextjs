
import React, {useReducer, useContext} from "react"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Fab from "@mui/material/Fab"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import {CounterContext} from "../App.js"



export const Hr = (props)=> {
  return (<>
  <br/>
  <br/>
  <Divider/>
    <Stack 
      direction="row"
      justifyContent="center"
    >
      <h2>{props.title}</h2>
    </Stack>
    <br/>
  </>)
}

export const uid = (n=5)=>{
  return (Math.random()+"").substr(2, n)
}

export const topFilms = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Moses", year: 1996},
  { label: "Abraham", year: 1956},
  { label: "Michael Jackson", year: 1855},
  { label: "Philip", year: 1856},
  { label: "John", year: 1956}
  ]
  
export const Counter = () => {
  const contextValue = useContext(CounterContext);
  const handleReducer = (state, action)=>{
      if(action === "add")
      return (state + 1);
      else if(action === "sub")
      return (state - 1)
  }
  const [value, dispatch] = useReducer(handleReducer, contextValue)
  return (
  <Box display="flex" justifyContent="center" backgroundColor="#f5f5f5">
 <Paper sx={{
   p: 6,
   m: 8,
   display: "flex",
   justifyContent: "space-between",
   boxSizing: "border-box"
 }}>
    <Fab size="small" onClick={()=>dispatch("sub")}> - </Fab>
       <Typography variant="h4" component="div" sx={{mx: 2}}> 
        {value}
      </Typography> 
    <Fab color="primary" size="small" onClick={()=>dispatch("add")}> + </Fab>
    </Paper>
    </Box>)
}