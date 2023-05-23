import React from "react"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"

export default function App() {
  
  return (
    <>
    <Stack direction="row" sx={ { my: 20, mx:3 }} spacing={3} alignItems="center">
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