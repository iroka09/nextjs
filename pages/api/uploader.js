import nextConnect from "next-connect"
import expressForm from "express-formidable"
import path from "path"
import fs from "fs"
import cors from "cors"

const dir = path.join(process.cwd(), "/uploads")


export const config = {
  api: {
    bodyParser: false
  }
}


const app = nextConnect({
  onNoMatch(req, res, next){
    res.status(404).send({error: true})
  },
  onError(err, req, res, next){
    console.log(err)
    next()
  },
  attachParams: true,
})



app.use(cors(), (a,b,n)=>{
  throw "Error ooooo9o"
  n()
})

app.use(expressForm({
  multiples: true, 
  uploadDir: dir
}))

app.get((req, res)=>{
  res.redirect("/")
})

app.post((req, res)=>{
  console.log(res)
  
  //res.json({message:"uploaded"})
})

export default app