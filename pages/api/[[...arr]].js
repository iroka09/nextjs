import nextConnect from "next-connect"
import expressForm from "express-formidable"
import path from "path"
import fs from "fs"
import cors from "cors"

const dir = path.join(process.cwd(), "/public/uploads")



export const config = {
  api: {
    bodyParser: false
  }
}


const app = nextConnect({
  onNoMatch(req, res, next){
    res.status(404).send({error: "path not found."})
  },
  onError(err, req, res, next){
    console.log(err)
    res.send(err)
  },
  attachParams: true,
})

app.use(cors())

app.get("/api/get_all_images", (req, res)=>{
  res.json({
    imageDirArray: fs.readdirSync(dir),
  })
})

app.post((req,res,next)=>{
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir)
  }
  next()
}, expressForm({
  multiples: true, 
  uploadDir: dir
}))

app.post("/api/upload", (req, res)=>{
  let obj = {}
  if(Object.keys(req.files).length>0){
    obj.error = false;
    obj.imageDirArray = fs.readdirSync(dir);
  }
  else{
    obj.error = true
  }
  res.json(obj)
})

app.delete("/api/delete/:name", (req, res)=>{
  if(req.params.name==="all"){
    fs.readdirSync(dir).forEach(x=>{
      fs.unlinkSync(dir+"/"+x)
    })
  }
  else {
    fs.unlinkSync(dir+"/"+req.params.name)
  }
  res.json({
    imageDirArray: fs.readdirSync(dir),
  })
})


export default app