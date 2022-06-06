
import React, {useState, useEffect, memo} from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { EditorState } from 'draft-js';

const Editor =  dynamic(()=> import('react-draft-wysiwyg')
    .then(mod=> mod.Editor), {ssr: false})


function App(){
  const [contentState, setContentState] = useState({})

  const onContentStateChange = (x) => {
    setContentState(x);
  }

  useEffect(()=>{
    alert(JSON.stringify(Editor,0,3))
  }, [])

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
        toolbarClassName="demo-toolbar"
        onContentStateChange={onContentStateChange}
      />
      
    </>
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