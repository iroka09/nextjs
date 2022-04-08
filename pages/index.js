import App from "../components/App";

export default function(){
  return(
    <App />
  )
}

export function getServerSideProps({req}){
  return({
    props: {
      title: req.headers.host?.replace("/","").toUpperCase() || "HOME",
      cookies: req.cookies
    }
  })
}