import React from "react"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"

export default function App() {
  const done= React.useState("click me");
    
    const handle = ()=>{
      done[1](Math.random())
    }
  
  return (
    <>
    <h3 onClick={handle}>{done[0]}</h3>
    <Stack direction="row" sx={ { my: 20 }} spacing={3} alignItems="center">
    <Typography
      color="error"
      variant="h5"
      >
      404
    </Typography>
    <Divider
      orientation="vertical"
      sx={ {
        height: 60,
        bgcolor: "error.main"
      }} />
    <span>This page could not be found.</span>
  </Stack> < /> )
  }