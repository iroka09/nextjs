import React from "react";
import style from "../styles/test.module.css"
import MyDiv from "../components/Test"
// import "../styles/test.css"

export default ()=>{
  return(
    <>
      <MyDiv>
        <h3>This is a testing page.</h3>
        <button>This is a testing page.</button>
      </MyDiv>
    </>
  )
}

export const getServerSideProps = (ctx)=>{
  return({
    props: {
      title: "Testing page",
      cookies: ctx.req.cookies,
    }
  })
}