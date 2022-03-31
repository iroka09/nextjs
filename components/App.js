
import React, {createContext} from 'react';
import {Hr, Counter} from './includes/tools';
//====
import Container from '@mui/material/Container'; 
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
//=====
import TextField from "./includes/TextField"
import InputBase from "./includes/InputBase"
import CircularProgress from "./includes/CircularProgress"
import Backdrop from './includes/Backdrop';
import Typography from './includes/Typography';
import Autocomplete from './includes/Autocomplete';
import Select from './includes/Select';
import Fab from './includes/FAB';
import Menu from './includes/Menu';
import Slider from './includes/Slider';
import Skeleton from './includes/Skeleton';
import Snackbar from './includes/Snackbar';
import Checkbox from './includes/Checkbox';
import Radio from './includes/Radio';
import Switch from './includes/Switch';
import Avatar from './includes/Avatar';
import Tooltip from './includes/Tooltip';
import Badge from './includes/Badge';
import Chip from './includes/Chip';
import Buttons from './includes/Buttons';
import Pagination from './includes/Pagination';
import LinearProgress from './includes/LinearProgress';

//==
import Redux from './redux';

const mypic = '/pic1.jpg';

export const CounterContext = createContext()

function App() {
  
return (
<>
<Container sx={{py:2}}>

 <Grid
    component="main" 
    container
    spacing={{md:3, xs:1}}
    sx={(theme)=>{
      return ({
      px: theme.spacing(1.4)
     })}
    } >
    
<Grid 
  component="aside"
  item
  xs={12}
  md>
  
  <Typography
    primary="Primary"
    secondary="Secondary"
    />
  
  <Hr title="Menu" />
  <Menu />
  
  <Hr title="Backdrop" />
  <Backdrop />
  
  <Hr title="Snackbar" />
  <Snackbar />
  
  <Hr title="Typography" />
  <Typography text="Sample For Learning MUI" />

 <FormControl fullWidth>
  <Hr title="InputBase" />
  <InputBase />
  
  <Hr title="TextField" />
  <TextField />

 <Hr title="Autocomplete" />
 <Autocomplete />

 <Hr title="Select" />
     <Select />
    
 <Hr title="Slider"/>
 <Slider />
  
<FormGroup>
<Hr title="Checkbox" />
  <Checkbox />
    
  <Hr title="Radio" />
  <Radio />

  <Hr title="Switch" />
   <Switch />
</FormGroup>
 </FormControl>
 
</Grid>
 
 
 
 
 <Grid 
  component="aside"
  item
  xs
  md
  >
 
 <Hr title="Floating Action Button"/>
 <Fab />
 
   <Hr title="Buttons" />
  <Buttons />
 
 <Hr title="CircularProgress"/>
<CircularProgress /> 

 <Hr title="LinearProgress"/>
<LinearProgress /> 
 
 <Hr title="Pagination"/>
 <Pagination />
 
<Hr title="Skeleton" />
<Skeleton />
<Skeleton />


  <Hr title="Avatar" />
    <Avatar mypic={mypic}/>
  
  <Hr title="Chip" />
  <Chip mypic={mypic}/>
 
 <Hr title="Tooltip" /> 
 <Tooltip />
  
  <Hr title="Badge" />
  <Badge />
  
<Hr title="Redux e.g" />
<Redux />
  

<Hr title="useContext/useReducer e.g" />
<CounterContext.Provider value={0}>
<Counter />
</CounterContext.Provider>


</Grid>
  

</Grid>
</Container>
</>);
}



export default App;
