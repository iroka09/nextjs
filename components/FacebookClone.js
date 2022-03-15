import React, {memo, useState} from "react";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

//import {name, image, lorem, random} from '@faker-js/faker'; 

function App(){
  
  
const [fakeList, setFakeList] = useState([...Array(2)].
map((item, index)=>(
  {
    id: index,  //random.uuid(), 
    name: "Iroka Tochi", //name.findName(),
    image: "http://lorempixel.com/100/100", //image.avatar(),
    longText: "Testing and I have to be there at like midnight release for the day I love u too babe and you are among the living room with you guys have ", //lorem.sentence(random.number({min:2, max:7}))
  }
)))

  return (
      <Paper>
      {fakeList.map(obj=>(
          <Grid container sx={{pt:1,pr:1}}>
              <Grid item xs={2} md={2} sx={{display: "flex", justifyContent:"center"}}>
                <Avatar src={obj.image} alt="image" sx={{p:1}}/>
              </Grid>
              <Grid item xs={10} md={10} sx={{}}>
                <Box 
                  sx={{
                    bgcolor: "#eee",
                    color: "#555",
                    px: 2,
                    py: 1,
                    borderRadius: 1
                  }}
                >
                <span style={{fontWeight: "600", color: "#222"}}>{obj.name}</span>
                <div style={{marginTop:"3px", fontWeight: "400"}}>
                  <span>{obj.longText}</span>
                </div>
                </Box>
                <Stack 
                  direction="row" 
                  alignItems="center"
                  spacing={1}
                  >
                  <span>5hrs</span>
                  <Button sx={{color:"#555"}}>Like</Button>
                  <Button sx={{color:"#555"}}>Reply</Button>
                  <Button sx={{color:"#555", whitSpace:"nowrap",textOveflow:"ellipsis"}}>😄❤😔</Button>
                </Stack>
              </Grid>
          </Grid>
      ))}
      </Paper>
    )
}

export default memo(App)