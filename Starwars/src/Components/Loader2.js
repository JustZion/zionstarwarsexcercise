import React, {useRef, useEffect} from 'react'
import {Stack} from '@mui/material'
import Spinner from 'react-spinner-material';

const Loader2 = () => {                                             // Loader before initial 'opening crawler animation text' data is ready (has been fetched from api)

    
  return (
    <>
    <Stack direction='row' justifyContent='center' alignItems='center' height='200px' width='100%'>
       
       <Spinner radius='100px' color='yellow' />
       
   </Stack>
<Stack  justifyContent='center' alignItems='center' color='yellow'
   sx = {{fontFamily:'monospace', letterSpacing: '1px'}}
   >loading...</Stack>
    </>
    
  )
}

export default Loader2