import "../styles/global_style.css";
import "../styles/tailwind-styles.css";
import 'react-alice-carousel/lib/alice-carousel.css';
//import "bootstrap-icons/font/bootstrap-icons.min.css";
 
export default function(props){
  const {Component, pageProps} = props;
  return(
    <Component {...pageProps} />
  )
}