import React, {useState, memo, useEffect} from "react"
import axios from "axios"


const App = (props)=> {
  const [imgSrc,
    setImgSrc] = useState()
  const [files,
    setFiles] = useState([])
  const [msg,
    setMsg] = useState()
  const [uploading,
    setUploading] = useState()
  const [serverImages,
    setServerImages] = useState([])

  const handleSelectFile = (e) => {
    setMsg("")
    const files = e.target.files;
    const url = URL.createObjectURL(files[0])
    setImgSrc(url)
    setFiles(files)
  }

  const handleUpload = async ()=> {
    if (files.length === 0 || uploading) return;
    setUploading(true)
    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append("image", files[i])
    }
    try {
      let resp = await axios.post("/api/upload", form);
      if (!resp.data || resp.data?.error) throw {
        message: "Error occured in the server"
      };
      setServerImages(resp.data.imageDirArray)
      setMsg("Uploaded successfully.")
    }
    catch(e) {
      setMsg(e.message || e)
    }
    finally {
      setUploading(false)
      setTimeout(()=>setMsg(), 3000)
    }
  }

  const handleDeleteImage = async(name = "all")=> {
    try {
      let resp = await axios.delete("/api/delete/"+name);
      setServerImages(resp.data.imageDirArray)
    }
    catch(e) {
      alert(e)
    }
  }

  useEffect(async()=> {
    try {
      let resp = await axios.get("/api/get_all_images");
      if (resp.statusText === "OK") {
        setServerImages(resp.data.imageDirArray);
      } else {
        throw "Error occurred in server."
      }
    }
    catch(e) {
      setMsg(e)
    }
  },  [])


  return(
  <div className="p-1">
    <div className="w-full h-[300px] sm:w-[400px] border-2 mx-auto mt-5 rounded shadow-lg flex items-center justify-center overflow-auto">
      {(imgSrc)? <img src={imgSrc} />: <h2 className="text-gray-300">No Selected File xx</h2>}
    </div>
    <div className="flex justify-center mt-4 gap-2">
        <label htmlFor="files">
          <input style={ { display: "none" }} type="file" id="files" onChange={handleSelectFile} multiple />
          <span className="block mx-auto p-2 text-slate-400 border-slate-400 border-dashed border bg-white text-center active:bg-slate-100 rounded">Click here</span>
        </label>
    <button className="bg-green-600 block px-2 text-white rounded shadow-sm" onClick={handleUpload}>
      {(!uploading)?<span>Upload</span>: <span>Uploading...</span>}
    </button>
  </div>
  <p className="text-slate-500 mt-5 w-max mx-auto">
    {msg}
  </p>
  {(serverImages?.length > 1) && <button className="bg-red-500 text-white px-3 py-1 rounded mt-5 mr-1 block ml-auto" onClick={()=> { handleDeleteImage()}}>Delete All</button>}
  <div className="flex flex-wrap justify-between gap-1 mt-1">
    {serverImages?.map((imageName, i)=>(
      <div className="rounded block shadow-sm rounded overflow-hidden">
          <img className="w-[100px] h-[100px] object-cover" src={"/uploads/"+imageName} />
          <button className="block bg-red-200 text-red-600 px-3 rounded my-2 mx-auto" onClick={()=> {
        handleDeleteImage(imageName)
      }}>Delete</button>
          </div>
    ))
  }
</div>
</div>
)}

export default memo(App)