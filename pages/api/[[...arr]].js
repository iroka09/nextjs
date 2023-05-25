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
    res.status(506).send(err)
  },
  attachParams: true,
})

app.use(cors())

app.get("/api/get_all_images", (req, res)=>{
  res.json({
      imageDirArray: readDir(dir)
    })
})

app.post(expressForm({
  multiples: true, 
  uploadDir: dir
}))

app.post("/api/upload", (req, res)=>{
  let obj = {}
  if(Object.keys(req.files||{}).length>0){
    obj.error = false;
    obj.imageDirArray = readDir(dir);
  }
  else{
    obj.error = true
  }
  res.json(obj)
})

app.delete("/api/delete/:name", (req, res)=>{
  if(req.params.name==="all"){
    readDir(dir).forEach(x=>{
      deleteFile(dir+"/"+x)
    })
  }
  else if(fs.existsSync(dir+"/"+req.params.name)) {
    deleteFile(dir+"/"+req.params.name)
  }
  res.json({
    imageDirArray: readDir(dir),
  })
})


export default app

function deleteFile(dir){
 if(dir.match(/\/dont_delete$/i)) return;
  fs.unlinkSync(dir)
}

function readDir(dir){
  return []
  let x = fs.readdirSync(dir);
  let arr = []
  x.forEach(val=>{
    if(val !== "dont_delete") arr.push(val);
  })
  return arr; 
}