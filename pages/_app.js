
//this wraps around all the pages


import React from "react";
import Head from "next/head"
import {ThemeProvider, createTheme} from "@mui/material/styles"
// import "../components/tailwind/output.css"
// import "../components/tailwind/mycustom.css"


const theme = createTheme({
  palette: {
    primary: {
      main: "#f08"
    }
  }
})

function App({Component, pageProps}){
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Testing NextJS</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@524&display=swap" rel="stylesheet" />
        <style>
          {`
            * {
              box-sizing: border-box;
              font-family: "Smooch Sans", "sans-serif" !important;
            }
            `}
        </style>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
    )
}

export default App
