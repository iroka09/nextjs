const next = require("next");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const nextApp = next({
  dev: process.env.NODE_ENV !== "production",
});

const nextHandler = nextApp.getRequestHandler();

nextApp.prepare()
.then(()=>{
  
  app.get("*", (req,res)=>{
    nextHandler(req, res)
  })
  
  app.listen(PORT, (err)=>{
    console.log(err || "Listening on port: "+PORT)
  })
  
})
.catch(err=>{
  console.log(err)
})