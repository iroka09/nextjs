import React, {memo, useContext, useMemo} from "react"
import AliceCarousel from 'react-alice-carousel';
import Image from "next/image"
import {MyContext} from "../pages/index"


function App() {
  
  const {items} = useContext(MyContext);
  
  const itemsCarousel = useMemo(()=>{
    let arr = items.map((obj,i)=>{
      let url = (false)? "https://picsum.photos/400/300/?random="+Math.random() : obj.src;
      return (
      <div 
        key={i}
        className="relative w-full h-[250px] border border-slate-200">
        <Image
          src={url} 
          placeholder="blur"
          blurDataURL={url} 
          layout="fill"
          objectFit="cover"
          quality={80}
          priority
          onDragStart={e=> e.preventDefault()}
          alt="IMAGE"
        />
      </div>)
    });
    arr.sort((x)=>Math.random()>0.45? 1:-1);
    return arr
  }, []);
  
  
  return (
    <AliceCarousel
      autoPlay
      infinite
      disableButtonsControls
      disableDotsControls
      autoPlayInterval={3000}
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
