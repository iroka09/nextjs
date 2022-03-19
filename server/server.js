
const next = require("next");
const express = require("express");
const expressFormidable = require("express-formidable");
const bytes = require("bytes");
const cors = require("cors");
const fs = require("fs");



const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== "production";
const rootdir = process.cwd()
const uploaddir = rootdir+"/uploads"

 
const nextApp = next({
  dev: isDev
});

const nextHandler = nextApp.getRequestHandler();

nextApp
.prepare()
.then(()=>{
  //==============
  
  
  app.use(cors({
    credentials: true
  }));
  
  app.use(expressFormidable({
    uploadDir: "./uploads",
    keepExtensions: true,
    multiples: true,
    maxFileSize: bytes("300MB")
  }));
  
  app.get("/", (req,res)=>{
    nextApp.render(req, res, req._parsedUrl.pathname)
  });
  
  app.get("/login", (req,res)=>{
    nextApp.render(req, res, req._parsedUrl.pathname)
  });
  
  app.use("/upload", (req, res, next)=>{
    console.log(req.files)
    fs.readdirSync(uploaddir).forEach(filename=>{
      if(filename.includes("dont_delete")) {
        return;
      }
      fs.unlink(uploaddir+"/"+filename, (err)=>{
        let name = filename;
        console.log(err||"removed: "+filename)
      })
    });
    next()
  });
  
  app.post("/upload", (req, res)=>{
    res.send("DONE");
    console.log(req.files)
    fs.readdirSync(uploaddir).forEach(filename=>{
      fs.unlink(uploaddir+"/"+filename, (err)=>{
        let name = filename;
        console.log(err||"removed: "+filename)
      })
    })
  });
  
  
  
  //this one is very import because nextjs also requests for other paths apart from /login on its own which it uses to render those page components
  app.get("*", (req,res)=>{
    nextHandler(req, res);
  })
  
  app.listen(PORT, (err)=>{
    console.log(err || "Listening on port: "+PORT)
  })
  
  
  
//===============
})
.catch(err=>{
  console.log(err.stack)
})