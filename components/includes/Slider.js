import React from "react"
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 25,
    label: '25°C',
  },
  {
    value: 50,
    label: '50°C',
  },
  {
    value: 75,
    label: '75°C',
  },
  {
    value: 100,
    label: '100°C',
  }
];

function App() {
  return (
    <Box>
      <Slider
        sx={{display:"block", mx: "auto", width:"80%"}} 
        size="small"
        defaultValue={30 || [20, 30]}
        step={5||null}
        valueLabelDisplay={"auto"||"on"}
        marks={marks||true}
        min={0}
        max={100}
      />
    </Box>
  );
}

export default React.memo(App)