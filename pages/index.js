import App from "../components/App";

export default function(){
  return(
    <App />
  )
}

export function getServerSideProps({req}){
  return({
    props: {
      title: req.headers.host?.replace("/","").split(".")[0].toUpperCase() || "HOME",
      cookies: req.cookies
    }
  })
}