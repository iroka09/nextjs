
export default function(req, res){
  console.log(req)
  if(req.method === "GET"){
    res.status(401).send("Get method not allowd")
    return
  }
  res.status(200).send("Uploaded successfully.")
}