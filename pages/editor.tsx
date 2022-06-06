
import React, {useState, useEffect, memo} from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import Button from "@mui/material/Button"
import { EditorState } from 'draft-js';
import { EditorProps } from 'react-draft-wysiwyg';

const Editor =  dynamic<EditorProps>(()=> import('react-draft-wysiwyg').then(x=>x.Editor), {ssr: false})

function App(){
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  const [loadedEditor, setLoadedEditor] = useState(false)

  /*const handleEditorState = (text) => {
    setEditorState(text);
  }*/

  useEffect(()=>{
   // setLoadedEditor(true)
  }, [])

  return (
    <div>
    
      <Head>
        <meta charSet="utf-8" />
        <title>Editor Draft</title>
      </Head>
      
    {loadedEditor &&
      <Editor
        initialEditorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbarClassName="demo-toolbar"
        onEditorStateChange={}
      />
    }
    <Button
      variant="outlined"
      onClick={()=>setLoadedEditor(true)}
      sx={{my:7}}
    >
      SHOW EDITOR
    </Button>
    </div>
  )
}

export default memo(App)

export function getServerSideProps({req}){
  return({
    props: {
      cookies: req.cookies
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