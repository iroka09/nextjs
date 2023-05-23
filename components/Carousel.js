import React, {memo, useContext, useMemo} from "react"
import AliceCarousel from 'react-alice-carousel';
import {MyContext} from "../pages/index"



const App = ()=>{
  
  const {items} = useContext(MyContext);
  
  const itemsCarousel = useMemo(()=>{
    let arr = items.map((obj,i)=>(
      <img 
        src={obj.src} 
        alt={obj.src.replace(/\.jpg$/i, "")}
        onDragStart={e=> e.preventDefault()}
        style={{
          width: "100%",
          border: "1px solid white",
          height: 250,
          objectFit: "cover",
        }}
      />));
    arr.sort((x)=>Math.random()>0.45? 1:-1);
    return arr
  }, []);
  
  
  return (
    <AliceCarousel
      autoPlay
      infinite
      disableButtonsControls
      disableDotsControls
      autoPlayInterval={2000}
      items={itemsCarousel}
      responsive={{
        0: {
            items: 1
          },
        750: {
          items: 3
        }
      }}
    />
  )
}

export default memo(App)