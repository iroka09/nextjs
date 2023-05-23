import nextConnect from "next-connect"
import expressForm from "express-formidable"
import cors from "cors"

const app = nextConnect({
  onNoMatch(req, res, next){
    res.status(404).send({error: true})
  },
  onError(err, req, res, next){
    console.log(err)
    res.send("done")
  }
})



app.use(cors())

app.use((req, res, next)=>{
  console.log("===== ", req, " =====")
  next()
})

app.use(expressForm({
  multiples: true, 
  uploadDir: "./uploads"
}))

app.post((req, res, next)=>{
  console.log(req)
  res.send({error:false})
})

export default app