
import React from "react"
import Image from "next/image"
import Head from "next/head"
import {withStyles} from "@mui/styles"
import PropTypes from "prop-types"

const styles = ({
  container: {
    border: "1px solid blue",
    margin: "5px auto",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: 400,
    maxWidth: 500,
  },
  imageContainer: {
    width: "80%",
    height: "80%",
    borderRadius: 4,
    border: "5px solid red",
  },
})

const myArray = [...new Array(5)].map((a,i)=>i);






function App(props){
  
  const {classes} = props;
  
  React.useEffect(()=>{
    alert(
      JSON.stringify(myArray, 0, 2)
    )
  }, [])
  
  return(
    <>
    
    <Head>
      <title>Testing nextjs/image</title>
    </Head>
    
    <h1>testing nextjs/image</h1>
    
    {myArray.map((x,i)=>(
    <div 
      key={i} 
      className={classes.container} 
      >
      <div className={classes.imageContainer}>
        
      </div>
    </div>
    )) || <h2>Didn't load.</h2>}
    
  </>)
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
//  year: PropTypes.string.isRequired,
}

//export default App
export default withStyles(styles)(App)