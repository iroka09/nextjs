import {NextRequest, NextResponse} from "next/server"

export function middleware(req: NextRequest){
  console.log(req, req.geo)
  const url = req.nextUrl.clone();
  url.pathname = "/iroka_tochi"
  // return NextResponse.rewrite(url)
}