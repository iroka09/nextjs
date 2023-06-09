
const next = require("next");
const express = require("express");
const expressFormidable = require("express-formidable");
const bytes = require("bytes");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios")
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const rootdir = process.cwd()
const uploaddir = rootdir+"/uploads"
const isDev = process.env.NODE_ENV !== "production";


const nextApp = next({
  dev: isDev,
});

const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(()=>{
  app.listen(PORT, (err)=>{
    console.log(err || "Listening on port: "+PORT)
  })
  //=========== START ======
  
  app.use(cookieParser())
  
  app.use(cors({
    credentials: true
  }));
  
  app.use(expressFormidable({
    uploadDir: "./uploads",
    keepExtensions: true,
    multiples: true,
    maxFileSize: bytes("300MB")
  }));
  
//REDIRECT TO HTTPS (SECURED)
app.use((req,res,next)=>{
  if(!isDev && req.protocol === "http") {
    app.enable("trust proxy");
    res.redirect("https://"+req.header("host")+req.url);
    return 
  }
  next();
})

app.use((req,res,next)=>{
  //do things
  req.env = process.env
  next()
})
  
  app.get("/", (req,res)=>{
    nextApp.render(req, res, "/")
  });
  
  app.get("/login", (req,res)=>{
    nextApp.render(req, res, "/login")
  });
  
  app.use("/upload", (req, res, next)=>{
    //console.log(req.files)
    fs.readdirSync(uploaddir).forEach(_filename=>{
      delLabel: {
      let filename = _filename;
      if(filename !== "dont_delete") {
      fs.unlink(uploaddir+"/"+filename, (err)=>{
        let name = filename;
        console.log(err||"removed: "+filename)
      })
      }
    }
    });
    next()
  });
  
  app.post("/upload", (req, res)=>{
    res.send("DONE");
    //console.log(req.files)
    fs.readdirSync(uploaddir).forEach(filename=>{
      fs.unlink(uploaddir+"/"+filename, (err)=>{
        let name = filename;
        console.log(err||"removed: "+filename)
      })
    })
  });
  
  app.get("/quiz", async (req,res)=>{
    let resp = await axios.get("https://opentdb.com/api.php?amount=50");
    req.questions = resp.data;
    nextHandler(req, res)
  })
  
  //this one is very import because nextjs also requests for other paths apart from /login on its own which it uses to render those page components
  app.all("*", (req, res)=>{
    nextHandler(req, res);
  })
  
//============ END =====
})
.catch(err=>{
  console.log(err.stack)
})