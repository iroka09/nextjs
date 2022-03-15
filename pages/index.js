import React, {useState} from "react"
import Button from "@mui/material/Button"
import LoginIcon from "@mui/icons-material/Login"

function App(){
  const [count, setCount] = useState(0);
  return (
    <>
    <Button 
      color="secondary" 
      href="/login"
      startIcon={<LoginIcon />}
    >
      Login
    </Button>
      <br />
      
      <h3 style={{
        textAlign: "center",
        margin: "0 10px"
      }}>{count}</h3>
      
      <div style={{
        display: "flex",
        justifyContent: "space-evenly"
      }}>
        <button onClick={()=>setCount(x=>x-1)}>Decreament</button>
        <button onClick={()=>setCount(x=>x+1)}>Increament</button>
      </div>
    </>
    )
}

export default App