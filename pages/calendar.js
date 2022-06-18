import React, {
  memo,
  useRef,
  useState,
  useEffect
} from "react"
import IconButton from "@mui/material/IconButton" 
import CircularProgress from "@mui/material/CircularProgress"
import ListItemIcon from "@mui/material/ListItemIcon"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Box from "@mui/material/Box"
import {
  useTheme
} from "@mui/material/styles"
//import {useTheme} from "@mui/styles"
import moment from "moment"
import random from "random"
import axios from "axios"
import Head from "next/head"
import {useRouter} from "next/router"

let _now =  new Date().getFullYear();
const yearArray = [...Array(_now-1999)].map((_, i)=> {
  return _now - i;
})



function App(props) {
  const router = useRouter()
  const muiTheme = useTheme()
  const contrastText = muiTheme.palette.primary.contrastText;
  const [loading,
    setloading] = useState(true)
  const [data,
    setData] = useState([])
  const [year,
    setYear] = useState(props.year)
  const [fullDate,
    setFullDate] = useState(moment(props.year+"", "YYYY").format("dddd, DD/MMMM/YYYY"))
  const [ButtonedBtn, setButtonedBtn] = useState({});
  
  const [revalidateResult, setRevalidateResult] = useState();
  // const theme = useTheme();

  const timeoutsRef = useRef({});
  const yearRef = useRef(year);

  const handleDateChange = (e)=> {
    setloading(true);
    setTimeout(function() {
      setYear(e.target.value);
    }, 2000);
  }
  

  const handleRevalidate = ()=>{
    clearTimeout(timeoutsRef.current?.revalidationResult)
    setRevalidateResult("Requesting for revalidation...")
    axios.get("/api/revalidate/?secret=7070")
    .then((res)=>{
      let message = res.data?.message
      setRevalidateResult(message)
    })
    .catch(err=>{
      setRevalidateResult(err.message)
     // alert(JSON.stringify(err,0,3))
    })
    .finally(()=>{
      timeoutsRef.current.revalidationResult = setTimeout(()=>setRevalidateResult(""), 5000)
    })
  }

  useEffect(()=> {
    yearRef.current = year
    const arr = [];
    for (let i = 1; i <= 12; i++) {
      const obj = {}
      const date = moment(`${i}/${year}`, "M/YYYY");
      obj.monthName = date.format("MMMM");
      obj.maxDays = +date.endOf("month").format("D");
      obj.startDayFrom = +date.startOf("month").day();
      obj.isThisMonth = date.format("MMMM/YYYY") === moment().format("MMMM/YYYY");
      obj.dateArray = [];
      for (let j = 0; j < obj.startDayFrom; j++) {
        obj.dateArray[j] = null;
      }
      [...Array(obj.maxDays)].forEach((x, k)=> {
        obj.dateArray.push(k+1)
      })
      arr.push(obj)
    }
    setData(arr)
    setFullDate(moment(`${ButtonedBtn.date}/${ButtonedBtn.month}/${year}`, "D/MMMM/YYYY").format("ddd, DD/MMMM/YYYY"))
    setloading(false);
  },
    [year]);
console. log(router)
  return (
    <>
       <Head>
        <title>React Calendar By Iroka</title>
      </Head>
      
    <Box sx={(theme)=>({
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      m: 0,
      py: 2,
    })}>
    <div className="flex justify-center items-center px-2 pb-2">
    <TextField
      defaultValue={year}
      label="Select Year"
      variant="outlined"
      select
      onChange={handleDateChange}
      SelectProps={ {
        renderValue: (val)=>val
      }}
      sx={ { minWidth: "150px" }}
      >
   {yearArray.map((x, index)=>(
        <MenuItem value={x} selected={x === year} key={index}>
      <ListItemIcon>
         <Checkbox checked={x === year} />
      </ListItemIcon>
   {x}
   </MenuItem>
      ))}
    </TextField>
    </div>
    <div className="text-3xl text-center text-red-700 mb-2 uppercase">
    {yearRef.current} Calendar
    </div>
    <div className="sticky top-[49px] shadow-lg bg-red-700 text-gray-100 dark:text-gray-400 backdrop-blur-[2px] text-center text-xl py-2 bg-opacity-60 capitalize mb-2">
    {fullDate}
    </div>
    <div>
    {(loading === true) && (
        <>
          <div className="flex justify-center items-center fixed z-[10] inset-0 bg-black bg-opacity-30">
          </div>
          <div className="flex justify-center items-center fixed z-[11] inset-0 bg-none">
            <CircularProgress sx={ { color: "info.dark" }} disableShrink />
          </div> 
        </>
      )}
    <ul className="grid gap-y-6 gap-x-2 grid-cols-12 p-2">
   {data.map((obj,index)=>(
          <li className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" key={index}>
    <div className="p-1 shadow-lg border rounded">
    <Typography color="primary" variant="h5">
      {obj.monthName}
    </Typography>
    <div className="font-bold flex justify-evenly items-center mb-1" style={ { backgroundColor: muiTheme.palette.primary.main }}>
    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((x,index)=>(
            <span style={ {
              color: (x === "Sun")? "orange": contrastText,
              flexGrow: 1,
              textAlign: "center",
              textShadow: `0.5px 0.5px 0 ${(contrastText==="#fff")?"black":"white"}`
            }}
            key={index}>
        {x}
      </span>
          ))}
          </div>
    <ul className="grid grid-cols-7 gap-0 w-full border rounded">
    {obj.dateArray.map((num, i)=>(
              <li className="col-span-1 text-center border-r border-b btn box-border" 
              key={i}
              style={
                (obj.isThisMonth && num === Number(moment().format("D"))) ?
                {
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: 800
                }: (obj.monthName === ButtonedBtn.month && num === ButtonedBtn.date && num)? ({
                    border: "1px solid red",
                  }): {}
                }
                onClick={(e)=> {
                  if (num) {
                    setFullDate(moment(`${num}/${obj.monthName}/${year}`, "D/MMMM/YYYY").format("ddd, DD/MMMM/YYYY"));
                    setButtonedBtn({
                      month: obj.monthName,
                      date: num
                    })
                  }
                }}
                >
    {num}
    <template className="button"></template>
    </li>
            ))}
          </ul>
          </div>
    </li>
        ))}
      </ul>
    </div>
    </Box>
    
  <Stack direction="row" spacing={3} sx={{mt:3}} alignItems="center"> 
    {(revalidateResult==="Requesting for revalidation...") || 
      <Button
        variant="outlined"
        color="warning"
        onClick={handleRevalidate}
      >
       Revalidate
      </Button>
    }
      <span >{revalidateResult}</span> 
  </Stack>
 </> )
}


  export function getStaticProps(ctx) {
    let year = new Date().getFullYear()
    return ({
      props: {
        year: random.int(1999, year),
      },
      revalidate: false,  //or 20
    })
  }
  
export default memo(App)