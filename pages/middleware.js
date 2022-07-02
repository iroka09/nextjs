import {NextResponse} from "next/server"
import app from "next-connect"


export function middleware(req, event){
  const {ip, geo, nextUrl, query,  cookies, headers, ...others} = req
  //console. log(query,"====", cookies,"=====", headers)
   console. log(req)
  
  return NextResponse.next() //equivalent to next() in expressjs
  
  let url = nextUrl.clone(); //clone nextUrl object if u want
  //url.pathname contains the link we are going to already 
  url.pathname = "/blog" //changing the link to blog
  //Or 
  url = {pathname: "/blog"}
  //or just use string
  url = "/blog"
  
  // return NextResponse.rewrite(url) //redirects to "/blog" without changing browsers url bar
  
 // return NextResponse.redirect(url) //change browsers bar
  
 /* return new NextResponse("Hello word", {
   status: 200,
   headers: {
     "Content-Type": "text/html"
   }
 }) */
 //write to browser output with optional second parameter

//set and clear cookies
//let res = NextResponse.next() or .redirect() or .rewrite() or anything that we want to return.
//res.cookie("name","iroka",{httpOnly:true})
// or res.clearCookie("name")
//return res

//return NextResponse.json({age:2})
}