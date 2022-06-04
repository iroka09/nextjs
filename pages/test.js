import React from "react";
import style from "../styles/test.module.css"
// import "../styles/test.css"

export default ()=>{
  return(
    <>
      <div className={`${style.flex} ${style.textLarge}`}>
        <h3>This is a testing page.</h3>
      </div>
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