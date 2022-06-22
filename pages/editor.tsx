
import React, {useState, useEffect, memo} from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import {useTheme} from "@mui/material/styles"
import { EditorState } from 'draft-js';
import { EditorProps } from 'react-draft-wysiwyg';

const Editor =  dynamic<EditorProps> (()=> import('react-draft-wysiwyg')
  .then(x=>x.Editor), {
  ssr: false,
  loading: ()=> (
    <div style={{
      height: 200,
      width: "100%",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    }}>
      Loading Editor...
    </div>
  ),
})

function App(){
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  const [submited, setSubmited] = useState(false);

  const theme = useTheme()

  const onEditorStateChange = (text: any) => {
    setEditorState(text);
  }
/*
  useEffect(()=>{
   setLoadedEditor(true)
  }, [])
*/
  return (
    <>
    
      <Head>
        <meta charSet="UTF-8" />
        <title>Editor Draft</title>
      </Head>
      
   <Editor
    editorState={editorState}
    toolbarClassName={(theme.palette.mode==="dark")? "toolbar-draft-editor" : ""}
    wrapperClassName="wrapper-draft-editor"
    editorClassName="editor-draft-editor"
    onEditorStateChange={onEditorStateChange}
    toolbar={{
      options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
      inline: { inDropdown: true },
      list: { inDropdown: true },
      textAlign: { inDropdown: true },
      link: { inDropdown: true },
      history: { inDropdown: true },
      image: {
        urlEnabled: true,
        uploadEnabled: true,
        uploadCallback: (file:any)=>{
          alert(file.length)
        },
        previewImage: true,
        alt: { present: false, mandatory: false }
      },
    }}
  />
    <Button
      variant="contained"
      onClick={()=>{
        setSubmited(true);
        setTimeout(()=>setSubmited(false), 5000)
      }}
      sx={{mt: 2}}
    >
      {(submited)? <CircularProgress size={20} sx={{color: "primary.contrastText"}}/> : "Submit"}
    </Button>
  </>
  )
}

export default memo(App)

