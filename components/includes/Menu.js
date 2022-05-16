import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Zoom from '@mui/material/Zoom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const ele = React.useRef();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(ele.current);
  };
  const handleClose = (byButton, i) => {
    setAnchorEl(null);
    if(byButton===true) setIndex(i);
  };

const list = "Profile, Account, Settings, Logout".split(", ")

  return (
    <center>
    <ButtonGroup
      variant ="contained"
      >
      <Button sx={{flex: 1}} ref={ele}>
        {list[index]}
      </Button>
      <Button size="small" sx={{px:"1px"}} onClick={handleClick}>
        <KeyboardArrowDownIcon />
      </Button>
    </ButtonGroup>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
      {
        list.map((name, i)=>(
          <MenuItem 
              key={i}
              selected={index===i}
              onClick={()=>handleClose(true, i)}
          >
          {name}
          </MenuItem>
        ))
      }
      </Menu>
    </center>
  );
}