import React from "react"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {topFilms} from './tools';



function App(){
  
return (
<>
<Box >
<Autocomplete
      disablePortal
      id="combo-box-demo"
      options={topFilms}
      sx={{ maxWidth: 400 }}
      renderInput={(params) => (
          <TextField 
            {...params} 
            label="Movie" 
            name="films"
            defaultValue="None"
            onBlur={(e)=>(null)}
          />)}
    />
    </Box>
    <br />
    <Autocomplete
        multiple
        limitTags={3}
        options={topFilms}
        getOptionLabel={(option) => option.label}
        defaultValue={[topFilms[3]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />
  </>
)}

export default React.memo(App)