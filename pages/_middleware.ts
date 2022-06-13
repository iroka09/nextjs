import {NextRequest, NextResponse} from "next/server"

export function middleware(req: NextRequest){
  const url = req.nextUrl.clone();
  console.log("\n======\nfrom middleware\n")
  console.log(req)
  console.log("\n======\nfrom middleware\n")
  console.log(url)
  url.pathname = "/iroka_tochi"
  return NextResponse.rewrite(url)
}