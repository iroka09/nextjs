
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
  ssr:boolean : false,
  loading:any : (
    <div style={{
      height: 300,
      width: "100%",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    }}>
      <CircularProgress />
    </div>
  )
})

function App(){
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  const [submited, setSubmited] = useState(false);

  const theme = useTheme()

  const onEditorStateChange = (text: any) => {
    setEditorState(text);
  }

  useEffect(()=>{
   // setLoadedEditor(true)
  }, [])

  return (
    <>
    
      <Head>
        <meta charSet="UTF-8" />
        <title>Editor Draft</title>
      </Head>
      
   <Editor
    editorState={editorState}
    toolbarClassName={(theme.palette.mode==="dark")? "toolbar-class" : ""}
    wrapperClassName="wrapper-class"
    editorClassName="editor-class"
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
      startIcon={submited&&<CircularProgress />}
    >
    {submited?  "Submiting...": "Submit"}
    </Button>
    </>
  )
}

export default memo(App)


export function getServerSideProps(ctx:any){
  return({
    props: {
      cookies: ctx.req.cookies
    }
  })
}


/*
{loadedEditor &&
      <Editor
        initialContentState={contentState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbarClassName="demo-toolbar"
        onContentStateChange={onContentStateChange}
      />
      }

*/