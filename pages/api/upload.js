import nextConnect from "next-connect"
import expressForm from "express-formidable"
import cors from "cors"

const app = nextConnect({
  onNoMatch(req, res){
    res.status(404).send({error: true})
  }
})



app.use(cors())

app.use(expressForm())

app.post((req, res)=>{
  console.log(req)
  res.send({error:false})
})

export default app