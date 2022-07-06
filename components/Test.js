import React from "react"
import {makeStyles} from "@mui/styles"
import {experimental_sx as sx} from "@mui/material/styles"

const useStyle = makeStyles({
  main: sx({
    display: "inline-block",
	  py: "7px", 
	  px: "15px", 
	  transition: "0.3s",
    fontWeight: "500",
    borderRadius: "4px",
	  outline: "none",
	  textDecoration: "none",
	  m: 3,
	  border: "none",
	  bgcolor: "#07f",
	  color: "#fff",
	  boxShadow: "0 0 0 3px transparent",
	  "&:hover": {
	    bgcolor: "#02b",
	  },
  }),
})

const App = React.forwardRef((props, ref)=>{
  
  const style = useStyle()
  
  React.useEffect(()=>{
    const arr = [];
    document.querySelectorAll("#wrapper_6522 > .child_6522 > *").forEach((ele, i)=>{
      if(ele.nodeType !== 1){
        return //only <tags /> allowed
      }
      ele.className = style.main;
      let obj = {
        ele,
        fn: function(event){
          let classList = event.target.classList;
          if(classList.contains(style.main)){
            classList.remove(style.main)
          }
          else{
            classList.add(style.main)
          }
          alert(event.target)
        },
        type: "click",
      };
      arr.push(obj)
    })
    arr.forEach(obj=>{
      obj.ele.addEventListener(obj.type, obj.fn)
    })
    return ()=> {
      arr.forEach(obj=>{
        obj.ele.removeEventListener(obj.type, obj.fn)
      })
    }
  }, [])
  
  return (
    <div 
      id="wrapper_6522"
      ref={ref} 
      {...props}
    >
      {
        props.children.map((child,i)=>(
          <div 
            key={i} 
            className="child_6522"
          >
            {child}
          </div>
        ))
      }
    </div>
  )
})

export default React.memo(App)