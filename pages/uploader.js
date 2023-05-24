import React, {useState, memo, useEffect} from "react"
import axios from "axios"


const App = ()=>{
  
  const [imgSrc, setImgSrc] = useState("")
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState()
  const [uploading, setUploading] = useState(false)
  
  const handleSelectFile = (e)=>{
    setMsg()
    const file = e.target.files[0];
    const url = URL.createObjectURL(file)
    setImgSrc(url)
    setFile(file)
  }
  
  const handleUpload = async ()=>{
    if(!file) return; 
    const form = new FormData();
    form.set("mykey", file, "Esther")
    setUploading(true)
    try{
      let resp = await axios.post("/api/uploader", form);
      setMsg(resp.data.message)
    }
    catch(e){
      setMsg(e.message)
    }
    finally{
      setUploading(false)
    }
  }

  return(<>
    <div className="w-[300px] h-[200px] border-2 mx-auto mt-5 rounded shadow-md flex flex-col border-dashed items-center justify-center overflow-auto">
      {(imgSrc)? 
        <img src={imgSrc} />
      : <div>
        <h2>No Selected File</h2>
        <label htmlFor="files">
        <input style={{display:"none"}} type="file" id="files" name="myfiles" onChange={handleSelectFile} />
          <span className="block mx-auto p-2 text-slate-300 border-slate-300 border bg-white text-center">Click here</span>
        </label>
      </div>}
    </div>
    
    <button className="bg-green-600 block mx-auto my-2 p-2 text-white" onClick={handleUpload}>
      {(!uploading)?<span>Upload</span>
      :<span>Uploading...</span>}
    </button>
    
    <p className="text-slate-500 mt-5 w-max mx-auto">{msg}</p>
  </>)
}

export default memo(App)