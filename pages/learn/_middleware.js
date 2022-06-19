import {NextResponse} from "next/server"

export function middleware(req, event){
  
  return NextResponse.next() 
  
}