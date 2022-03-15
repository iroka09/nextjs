import React from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/src/assets/sass/glide.core.scss";
//import "@glidejs/glide/src/assets/sass/glide.theme.scss";
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import ArrowLeft from "@mui/icons-material/ArrowLeft"
import ArrowRight from "@mui/icons-material/ArrowRight"

const App = React.forwardRef((props,ref)=>{
  
  const [index, setIndex] = React.useState(0)
  const glide = React.useRef(new Glide(".glide", {
    ...options, 
    ...(props.options && props.options.contructor === Object)? props.options : {} 
  }));

  React.useEffect(()=>{
    alert("useEffect")
    glide.current.on("run.after", ()=>{
      let val = glide.current.index - 0;
      setIndex(val)
    if(props.onChangeIndex && typeof props.onChangeIndex === "function"){
        props.onChangeIndex(val)
    }
    });
    glide.current.mount();
  }, []);
  
  React.useEffect(()=>{
    if(typeof props.index === "number"){
      glide.current.go("="+props.index)
    }
  }, [props.index])
  

const handleSelect = (e)=>{
    let val = e.target.value
    glide.current.go("="+val)
    setIndex(val-0)
}

const handleBtn = (x)=>{
  glide.current.go(x)
}


const style = {
  position: "relative",
  ...(props.style && props.style.constructor=== Object)? props.style : {},
}
//alert(JSON.stringify(style,0,2))
  return (
   <section 
    {...props} 
    ref={ref} 
    style={style}
    >
   {props.showBtn && 
   <div 
    id="glide_btn"
    style={{
      position: "absolute",
      top: "50%",
      left: 2,
      right: 2,
      translateY: "-50%",
      zIndex: 1,
      display:"flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "2px",
    }}>
    <IconButton 
      color= "primary"
      disabled={(index===0)? true: false }
      onClick={()=>handleBtn("<")}
    >
    <ArrowLeft sx={{fontSize:40}}/>
    </IconButton>
    <IconButton 
      color= "primary"
      disabled={(index===props.children.length-1)? true: false }
      onClick={()=>handleBtn(">")}
    >
    <ArrowRight sx={{fontSize:40}}/>
    </IconButton>
    </div>}
    
<div class="glide"> 

<div data-glide-el="controls"  class="controls">
    <button data-glide-dir="<">prev</button>
    <button data-glide-dir=">">next</button>
  </div>

<div data-glide-el="track" class="glide__track"> 
<ul class="glide__slides"> 

  {React.Children.map(props.children, (child, i)=>{
   return(<li class="glide__slide" key={i}>
      {child}
    </li>)
  })}
</ul> 
</div> 

<div data-glide-el="controls[nav]"  class="dots">
    <button data-glide-dir="=0"></button>
    <button data-glide-dir="=1"></button>
    <button data-glide-dir="=2"></button>
    <button data-glide-dir="=3"></button>
    <button data-glide-dir="=4"></button>
  </div>
  
</div>
{props.showSelect && 
   <div style={{
      display: "flex",
      justifyContent: "center",
    }} >
   <TextField
    select
    value={index}
    size="sm"
    onChange= {(e)=>handleSelect(e)}
    SelectProps={{
      renderValue: (val)=>val,
    }}
    >
     {props.children.map((x,i)=>(
      <MenuItem value={i}>{i}</MenuItem>
      ))}
    </TextField>
    </div>}
</section>
)})


const options = {
	//slider,  carousel
  type: "slider",
  
  perView: 1.2,
  
  gap: 2,
  
  //number or "string"
  focusAt: "center",
  
 // autoplay: 2000,
  
  startAt: 0,
  
  hoverpause: true, 
  
  //enable keyboard arrow keys
  keyboard: true, 
    
  //number or boolean
//  swipeThreshold: 80,
  
  
animationDuration: 300,
 
 
//only for slider type, false=no looping.
rewind: false, 
 
 //linear, ease,  ease-in,  ease-out, ease-in-out, bounce
 //animationTimingFunc: "ease",
 
 transitionType: "fade",
 
 //when screen is lower that a breakpoint
 breakpoints: {
   0:{
     perView: 1,
   },
   500: {
     perView: 1.2,
   },
    1024: {
      perView: 2.5,
    }
  }
}

export default App
