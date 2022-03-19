
import React, {useEffect, useState, useRef} from "react";
import bytes from "bytes";
import Button from "@mui/material/Button";
import axios, {CancelToken} from "axios";
import LinearProgress from "@mui/material/LinearProgress"
//icons
import UploadIcon from "@mui/icons-material/Upload"
import CloseIcon from "@mui/icons-material/Close"
import CheckCircle from "@mui/icons-material/CheckCircle";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});



export default function App(props){
  
  const [value, setValue] = useState(0);
  const [info, setInfo] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const cancelRef = useRef(()=>{});
  
  
  const handleUpload =(e)=>{
    try{
    const files = e.target.files;
    const formData = new FormData();
    const maxSize = "300MB";
    for(let i=0; i<files.length; i++){
      if(files[i].size > bytes(maxSize)){
      throw "File should not exceed "+maxSize+".";
      }
     formData.append("myfiles", files[i])
    }
    const options = {
      url: "/upload",
      method: "post",
      data: formData,
      onUploadProgress: ({loaded,total})=>{
        let val = Math.floor((loaded/total)*100);
        if(val<=99) {
          setValue(val);
        }
      },
      cancelToken: new CancelToken(cancel=>{
        cancelRef.current = cancel
      })
    };
    setIsUploading(true)
    axios(options)
    .then((res)=>{
      setValue(100);
      setInfo(res.data);
    })
    .catch((err)=>{
      setInfo(err.message)
     // alert(JSON.stringify(err,0,2))
    })
    .finally(()=>{
      setIsUploading(false)
    })
  }
  catch(e){
    setInfo(e)
  }
  }
  
  return(
    <>
    <h3 style={{margin: "100px auto 20px", textAlign:"center"}}>
      {info}
    </h3>
  
      <h4 style={{margin: "0 auto 10px", textAlign:"center"}}>
      {(value===100) && (
        <CheckCircle color="success" sx={{fontSize:40}} />
      )}
      {isUploading && value+"%"}
      </h4>
    {isUploading && (
        <LinearProgress variant="determinate" value={value} sx={{maxWidth: "200px", margin:"auto"}} />
    )}
    <div style={{display:"flex",justifyContent:"space-around", marginTop: 20}}>
    <Button 
      variant="outlined"
      color="error"
      startIcon={<CloseIcon />}
      onClick={()=>cancelRef.current("You cancelled by clicking upload button again")}
      >
      Cancel
    </Button>
    <label htmlFor="files">
      <input style={{display:"none"}} type="file" id="files" name="myfiles" onChange={handleUpload} multiple />
      <Button 
        component="span"
        variant="contained"
        startIcon={<UploadIcon />}
        onClick={()=>{
          setInfo();
          setValue(0)
        }}
      >
        Upload
      </Button>
    </label>
   </div>
 {props.loremText}
    </>
  )
}

export async function getStaticProps(){
  let loremText = 
lorem.generateParagraphs(17);
//lorem.generateSentences(5);
//lorem.generateWords(1);
//lorem.generateParagraphs(7);

  return ({
    props: {
      loremText
    }
  })
}