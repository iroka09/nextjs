
import React from 'react';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';


function App({mypic}){
  return (
  <>
  <AvatarGroup max={5}>
      <Avatar alt="reacJs" src={mypic}/>
      <Avatar alt="reacJs" src={mypic}/>
      <Avatar alt="reacJs" src={mypic}/>
      <Avatar alt="reacJs" src={mypic}/>
      <Avatar alt="reacJs" src={mypic}/>
      <Avatar alt="reacJs" src={mypic}/>
      <Avatar alt="reacJs" src={mypic}/>
      <Avatar alt="reacJs" src={mypic}/>
  </AvatarGroup>
 
 <Stack direction="row" spacing={0.2}>
 <Avatar sx={{bgcolor: "#298"}}>I</Avatar>
 <Avatar>R</Avatar>
 <Avatar  sx={{background: "#395"}}>O</Avatar>
 <Avatar variant="rounded">K</Avatar>
 <Avatar variant="square" sx={{background: "#395264"}}><EditIcon/></Avatar>
 </Stack>
   </> )
}

export default React.memo(App)