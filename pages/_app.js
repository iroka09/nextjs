import React from "react"
import "../styles/tailwind-styles.css";
import "../styles/global_style.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import 'react-alice-carousel/lib/alice-carousel.css';
 
export default function(props){
  const {Component, pageProps} = props;
  return(
    <Component {...pageProps} />
  )
}