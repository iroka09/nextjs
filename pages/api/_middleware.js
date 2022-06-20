import {NextResponse} from "next/server"

export default function middleware(req, ev){
  return NextResponse.next()
}
