
import React, {useState} from "react"
import Head from "next/head"
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';


export default function App(){
  const [contentState, setContentState] = useState({})

  const onContentStateChange = (x) => {
    setContentState(x);
  }

  return (
    <>
    
      <Head>
        <meta charset="utf-8" />
        <title>Editor Draft</title>
      </Head>
      
      <Editor
        initialContentState={contentState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onContentStateChange={onContentStateChange}
      />
      
    </>
  )
}

export function getServerSideProps({req}){
  return({
    props: {
      cookies: req.cookies
    }
  })
}