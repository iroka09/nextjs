import React from "react"
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useDispatch, useSelector} from "react-redux"
import {increment, decrement} from "./counterSlice"


function App(){
 // alert("rdx")
  const {value} = useSelector(state=> state.myCounter)
  const dispatch = useDispatch()
  const add = ()=>{
    dispatch(increment(1))
  }
  const sub = ()=>{
    dispatch(decrement(1))
  }
  return (
  <Box display="flex" justifyContent="center" backgroundColor="#f5f5f5">
 <Paper sx={{
   p: 6,
   m: 8,
   display: "flex",
   justifyContent: "space-between",
   boxSizing: "border-box"
 }}>
    <Fab size="small" onClick={sub}> - </Fab>
       <Typography variant="h4" component="div" sx={{mx: 2}}> 
        {value}
      </Typography> 
    <Fab color="primary" size="small" onClick={add}> + </Fab>
    </Paper>
    </Box>
    )
}

export default React.memo(App)