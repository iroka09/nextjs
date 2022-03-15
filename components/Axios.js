import React, {useState, useRef, useEffect} from "react";
import axios, {CancelToken} from "axios";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {styled} from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Highlightjs from "react-highlight";
import CircularProgressWithLabel from "./includes/CircularProgressWithLabel";


const StyledBox = styled(Box)({
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
})


export default function App(){
  
  const [data, setData] = useState([])
  const [radioValue, setRadioValue] = useState("json")
  const [requesting, setRequesting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("No data yet, please click request to fetch data.")
  const [jsonRequest, setJsonRequest] = useState({
    isRequesting: false,
    done: false
    })
  const [upload, setUpload] = useState({
    imageBlobUrl: null,
    isUploading: false,
    uploaded: 0,
    done: false
    })
  const cancelRef = useRef(v=>{})
  
  const handleCancel = () => {
  cancelRef.current("Request Cancelled")
  }
  
  const handler = (files) =>{
   window.URL.revokeObjectURL(upload.imageBlobUrl)
if(radioValue=="file"&&files.length<1){ return; 
}
    setRequesting(true);
    setErrorMsg(null);
     let options = ({
       url: (radioValue==="file")? "http://localhost:8000/file" : "http://localhost:8000/json", 
      // baseUrl: "http://localhost:8080/",
       method: (radioValue==="file")? "post" : "get", 
       cancelToken: new CancelToken(cancel=>{
         cancelRef.current = cancel
       }),
     })
     if(radioValue==="file"){
       setUpload((x) =>({
          isUploading: true, 
          done: false, 
          uploaded: 0,
          imageBlobUrl: (files[0].type.startsWith("image/"))? window.URL.createObjectURL(files[0]) : null
       }));
       let form = new FormData();
       form.append("img", files)
       options.data = form;
       options.onUploadProgress=(upValue)=>{
         let {loaded, total} = upValue; 
         let val = Math.round((loaded/total)*100);
        (val < 100) && 
        setUpload(x=>({
           ...x, 
           uploaded: val
         }))
       }
     }
    else {
    setJsonRequest((x)=>({...x, isRequesting: true}));
     }
     axios(options)
      .then(resp=>{
      (radioValue==="json")? setData(resp.data) : setUpload((x) =>({...x, done: true, uploaded: 100}));
      })
      .catch(err=>{
        setErrorMsg(err.message)
      })
      .finally(x=>{
        setRequesting(false);
        setJsonRequest((x)=>({...x, isRequesting: false}));
        setUpload((x) =>({...x, isUploading: false}));
      })
}
  
  return (
    <>
    <Paper sx={{position: "relative", my: 2, py:0, color: "#777", height: "350px", overflow: "scroll"}}>
    {(jsonRequest.isRequesting)? (<StyledBox>
    <CircularProgress />
    </StyledBox>) :
    (upload.isUploading || upload.done)? (<>
    <img src={upload.imageBlobUrl} style={{position: "absolute",width:"100%", height:"100%",top:0, objectFit:"cover"}} />
    <StyledBox>
    <CircularProgressWithLabel value={upload.uploaded} />
    </StyledBox>
    </>) :
    (data.length>0 && !errorMsg)? (
    <Highlightjs className="json"> 
    {JSON.stringify(data, 0, 2)} 
    </Highlightjs>) : (<StyledBox>
    {errorMsg}</StyledBox>)
    }
    </Paper >
  
  <RadioGroup row defaultValue={radioValue} onChange={(e)=>setRadioValue(e.target.value)} sx={{my:3, px:"auto"}}>
    <FormControlLabel  label="JSON" control={<Radio/>} value="json" />
    <FormControlLabel label="FILE" control={<Radio/>} value="file" />
  </RadioGroup>  
  
  {(requesting)? (
    <Button variant="outlined" onClick={handleCancel} color="error" fullWidth> 
      Cancel request
    </Button>
    ) :
  (radioValue==="json")? (
    <Button 
      fullWidth
      variant="outlined"
      color="secondary"
      onClick={(e)=>handler()}
    > 
      Make json request
      </Button>
    ) : (
    <Stack sx={{justifyContent: "center"}}>
    <label htmlFor="btn-file" sx={{display: "block"}}>
    <input id="btn-file" style={{display: "none"}} type="file" multiples accept="video/*" onChange={(e)=>handler(e.target.files)} />
    <Button component="span" variant="contained"> 
      Upload Image
    </Button>
      </label>
  </Stack>
      )}
      </>
    )
}