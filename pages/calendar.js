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
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Box from "@mui/material/Box"
import {useTheme} from "@mui/material/styles"
//import {useTheme} from "@mui/styles"
import moment from "moment"


const yearArray = [...Array(10)].map((arr, index)=> {
  return new Date().getFullYear() - index;
})

function App() {
  const muiTheme = useTheme()
  const [loading,
    setloading] = useState(true)
  const [data,
    setData] = useState([])
  const [year,
    setYear] = useState(moment().year())
  const [fullDate,
    setFullDate] = useState(moment().format("dddd, DD/MMMM/YYYY"))
  const [ButtonedBtn,
    setButtonedBtn] = useState({});
  // const theme = useTheme();

  const yearRef = useRef(year);

  const handleDateChange = (e)=> {
    setloading(true);
    setTimeout(function() {
      setYear(e.target.value);
    }, 2000);
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

  return (
    <Box sx={(theme)=>({
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      m: 0,
      py: 2,
    })}>
    <div className="hidden test w-[200px] h-[200px] absolute bg-blue-500 top-[50%] left-[50%] rounded flex justify-center items-center text-white translte-[-50%]">
    testing
    </div>
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
   {yearArray.map(x=>(
          <MenuItem value={x} selected={x === year}>
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
        </div> < />
      )}
    <ul className="grid gap-y-6 gap-x-2 grid-cols-12 p-2">
   {data.map(obj=>(
          <li className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
    <div className="p-1 shadow-lg border rounded">
    <Typography color="primary" variant="h4">
      {obj.monthName}
    </Typography>
    <div className="font-bold flex justify-evenly items-center mb-1" style={{backgroundColor: muiTheme.palette.primary.main}}>
    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(x=>(
            <span style={ {
              color: (x === "Sun")? "orange": "white",
              flexGrow: 1,
              textAlign: "center"
            }}
              >
        {x}
      </span>
          ))}
          </div>
    <ul className="grid grid-cols-7 gap-0 w-full border rounded">
    {obj.dateArray.map((num, i)=>(
              <li className="col-span-1 text-center border-r border-b button box-border" style={
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
  )
}

export default memo(App)

  export function getStaticProps() {
    return {
      props: {
        title: "React Calendar By Iroka"
      }
    }
  }