import React, {useState, useEffect} from 'react'
import '../App.css'
import { Route , Routes } from 'react-router-dom'
import star from '../assets/starwars.jpg'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, Box,Stack, IconButton, ListItemText, ListItemIcon,Chip,TableCell } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Person2Icon from '@mui/icons-material/Person2';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Loader from './Loader';
import Loader2 from './Loader2';
import {Link, useParams} from 'react-router-dom'
import WifiIcon from '@mui/icons-material/Wifi';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import Man3Icon from '@mui/icons-material/Man3';
import WomanIcon from '@mui/icons-material/Woman';
import BlockIcon from '@mui/icons-material/Block';
import Crawler from './Crawler';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';


// function createData(name, calories, fat) {
//     return { name, calories, fat};
//   }
  
  
  
//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0),
//     createData('Ice cream sandwich', 237, 9.0),
//     createData('Eclair', 262, 16.0),
//     createData('Cupcake', 305, 3.7),
//     createData('Gingerbread', 356, 16.0),
//   ];

const MovieList = () => {                   // component to display each movie information
    const navigate = useNavigate()          // a react-router-dom attribute for switching between pages
    const filmId = useParams()              // used to get the identifier from the web address
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [singleData, setSingleData] = useState([])                    // grabs the existing data
    const [singleCharacter, setSingleCharacter] = useState([])          // grabs the characters object from the existing data
    const [defaultCharacter, setDefaultCharacter] = useState([])        // creates an default non-changing value for the characters data above
    const [toggleNameCheck, setToggleNameCheck] = useState(false)       // a watcher for sorting character names by double clickling on 'character' header
    const [toggleGenderCheck, setToggleGenderCheck] = useState(false)   // a watcher for sorting character gender by double clickling on 'gender' header
    const [toggleHeightCheck, setToggleHeightCheck] = useState(false)   // a watcher for sorting height gender by double clickling on the 'height' header
    const [totalHeights, setTotalHeights] = useState(0)                 // sets the total height of characters from each request
    const [watch, setWatch] = useState(1)                               //a watcher to prevent unnecessary looping
    const [time, setTime] = useState(0)                                 // a timer to set the maximum time allowed for the crawler openings
    const [action, setAction] = useState('Skip to Table')               // shows different text for easy navigation between pages of for skipping the crawler opening
   

    const test = (x) => {
       setSingleData(x)                                                 // sets film data to singleData instance
        
      }

    const fetchData = async () => {                                     // fetches data based on film id gotten from the current url
        return fetch(`https://swapi.dev/api/films/${filmId.id}`)
              .then((response) => response.json())
              .then((data) => test(data));
      }

      const fetchData2 = (datalength, data ) => {
            var x = 0
            var dataList = []
        for (x = 0; x < datalength; x++) {                              //  a loop to get all the characters url, fetch the data and push it into a temporary list
            const y = fetch(`${data[x]}`)
            .then((response) => response.json())
            .then((data) => dataList.push(data));
        }

    
        setSingleCharacter(dataList) 
        let count = 0
        let counter = 0
        for (let x = 0; x < singleCharacter.length; x++) {        // sets total height value to totalHeights instance immediately table is set
            if (singleCharacter[x].height === 'Unknown') {
                counter = 0
            }

            else {
                counter = singleCharacter[x].height
            }
            count += Number(counter)
            
        }
        setTotalHeights(count)                                    // the temporary list gets set to singleCharacter instance
        setDefaultCharacter(dataList)                                   // the temporary list gets set to DefaultCharacter instance as well
        setWatch(3)

      }

      const sumofHeight = () => {                                       // to find the total height for each character api request
        let count = 0
        let counter = 0
        for (let x = 0; x < singleCharacter.length; x++) {        // sets total height value to totalHeights instance immediately table is set
            if (singleCharacter[x].height == 'Unknown') {
                counter = 0
            }

            else {
                counter = singleCharacter[x].height
            }
            count += Number(counter)
            
        }
        setTotalHeights(count)                                          // sets total height value to totalHeights instance
        
      }


      const toggleName = (e) => {                                       // Toggles sorting character names between ascending and descending order
        if(e.detail == 2){
            var x = [...defaultCharacter]
        if (toggleNameCheck === false) {
            x.sort((a,b) => (a.name.localeCompare(b.name)))
            setSingleCharacter(x)
            setToggleNameCheck(true)     
        }
        else {
            x.sort((a,b) => (b.name.localeCompare(a.name)))
            setSingleCharacter(x)
            setToggleNameCheck(false)
        }
		}
      }

      const toggleGender = (e) => {                                     // Toggles sorting character gender between ascending and descending order  
        if(e.detail == 2){
			
            var x = [...defaultCharacter]
        if (toggleGenderCheck === false) {
            x.sort((a,b) => (a.gender.localeCompare(b.gender)))
            setSingleCharacter(x)
            setToggleGenderCheck(true)
        }
        else {
            x.sort((a,b) => (b.gender.localeCompare(a.gender)))
            setSingleCharacter(x)
            setToggleGenderCheck(false)
        }
		}

      }

      const toggleHeight = (e) => {                                     // Toggles sorting character height between ascending and descending order
        if(e.detail == 2){
            var x = [...defaultCharacter]
        if (toggleHeightCheck === false) {
            x.sort((a,b) => (a.height - b.height)) 
            setSingleCharacter(x)
            setToggleHeightCheck(true)
        }

        else {
            x.sort((a,b) => (b.height - a.height))
           
            setSingleCharacter(x)
            setToggleHeightCheck(false)

        }
		}
      }

     

      const toggleMale = () => {                                           // Takes care of gender filtering for male category
        const star = defaultCharacter.filter(name => name.gender === 'male')
        setSingleCharacter(star)
        handleClose()
       
      }

      const toggleFemale = () => {                                          // Takes care of gender filtering for female category
        const star = defaultCharacter.filter(name => name.gender === 'female')
        setSingleCharacter(star)
        handleClose()
       
      }

      const toggleDefault = () => {                                       // Resets to character listing to default order (as fetched from api)           
        setSingleCharacter(defaultCharacter)
        handleClose()
      }

      const skipTimer = () => {                                             // function to skip crawler opening text when Character data has been succesfully loaded in background
        setTime(90)
        setAction('Go Back')
      }

      const BackHome = () => {                                               // function allows user to go back to first home landing page
        navigate('/')
      }

      useEffect(() => {                                                      // takes care of timing of events from initial start of page rendering (fetching of data etc)
        if (watch === 3) {
            sumofHeight()
        }
        if (singleData.characters) {
        if (watch === 2) {
           
            fetchData2(singleData.characters.length, singleData.characters)
        }
        else {
          console.log('dataaaa', singleData)
        }
        
      }
      else {
        fetchData()
        setWatch(2)
      }
  
  
  
    },[singleData,singleCharacter,watch,totalHeights])
  
    useEffect(() => {                                                               // takes care of timing of events for the opening crawler text animation
        if (singleData.opening_crawl) {
            const interval = setInterval(() => {
                if (time === 80  || time > 80) {
                    setAction('Go Back')
                    setTime(curr + 10)
                    clearInterval(interval)
                    return
                }
                var curr = time
                setTime(curr + 10)
            //   console.log('This will run every 3 second!',time);
            }, 3000);
            return () => clearInterval(interval)
           ;
        }
       
      }, [time,singleData]);
 

  return (
    <>
    {  singleData.characters ? singleCharacter.length === singleData.characters.length ? (
        <Stack className='guardian' sx = {{mt:'0px', mb:'00px'}} width='200px'>
        <Button className='buttonwars' sx={{textTransform: 'capitalize', backgroundColor: 'yellow',
          color: 'black', fontFamily: 'monospace', fontWeight: 600, '&:hover': {
            backgroundColor: 'yellow',
            color: 'black',
        }}} onClick={action ==='Skip to Table' ? skipTimer : BackHome }
          endIcon={action ==='Skip to Table' ? <KeyboardArrowRightIcon />: <KeyboardArrowLeftIcon />}>
          {action}
        </Button>
    </Stack> 
    ): '' : ''
    }
    {
         time < 90 ? singleData.title ?
        <Crawler setTimer = {skipTimer} title={singleData.title} episode_id={singleData.episode_id} crawl={singleData.opening_crawl}/>
     : <Stack sx={{mt:'250px'}}><Loader2 /></Stack>
    :
       
    ( <div className='imageCover'>
        <img src={star} className='frontpagelogo' />
       
        <Stack className='mainTable' width='100%'  backgroundColor='black' justifyContent='center' alignItems='center'
        sx={{mt: {md: '-550px' ,sm: '-550px', xs: '-600px'}}}>
          <Button  className='buttongender gender_filter' 
          sx={{textTransform: 'capitalize', backgroundColor: 'yellow',
          color: 'black', fontFamily: 'monospace', fontWeight: 600, '&:hover': {
            backgroundColor: 'yellow',
            color: 'black',
        }}} onClick={handleClick}
          endIcon={<ArrowDropDownIcon />}>
          Gender Filter
          </Button>
            <Menu sx={{boxShadow: 0, border: 'none', mt: '0px', ml: '0px'}}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
                boxshadow: 0, border: '2px solid red'
              }}
            >

                <MenuItem width='300px' className='listMenu' sx={{backgroundColor: 'black', color:'yellow'}}
                onClick={toggleMale}> 
                <ListItemText sx={{mr: '10px',mb: '0px !important'}}>Male</ListItemText> <span className='release_date'>
                <Man3Icon sx={{mt:'0px'}} />
                </span> </MenuItem>
                <MenuItem  className='listMenu' sx={{backgroundColor: 'black', color:'yellow'}}
                onClick={toggleFemale}> 
                <ListItemText sx={{mr: '10px',mb: '0px !important'}}>Female</ListItemText>
                 <span className='release_date'>
                 <Person2Icon fontSize='small' sx={{mt:'5px'}} />
                </span> </MenuItem>
                <MenuItem  className='listMenu' sx={{backgroundColor: 'black', color:'yellow'}}
                onClick={toggleDefault}> 
                <ListItemText sx={{mr: '10px',mb: '0px !important'}}>Default</ListItemText>
                 <span className='release_date'>
                 <BlockIcon fontSize='small' sx={{mt:'5px'}} />
                </span> </MenuItem>
                
              
            </Menu>
            <TableContainer sx={{mt:'0px',maxWidth: '800px'}} component={Paper}>
                <Table sx={{ minWidth: '700px' }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell onClick={toggleName} align="center"><Button id='buttonHeader' sx={{color:'#8A91A6', fontWeight:'600'}} endIcon={<WifiIcon sx={{mt:'-4px'}} />}>CHARACTERS</Button> </TableCell>
                        <TableCell onClick={toggleGender} align="center"><Button id='buttonHeader' sx={{color:'#8A91A6', fontWeight:'600'}} endIcon={<Person2Icon sx={{mt:'-4px'}} />}>GENDER</Button> </TableCell>
                        <TableCell onClick={toggleHeight} align="center"><Button id='buttonHeader' sx={{color:'#8A91A6', fontWeight:'600'}} endIcon={<VerticalAlignTopIcon sx={{mt:'-4px'}} />}>HEIGHT</Button> </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            singleCharacter.length  ? singleCharacter.map((item, index) => (
                                <TableRow key={Math.random() * 1000000}>
                                    <TableCell align="center"><Button sx={{color:'#8A91A6', fontWeight:'600', textTransform: 'capitalize'}} >{item.name}</Button> </TableCell>
                                    <TableCell align="center"><Button sx={{color:'#8A91A6', fontWeight:'600'}} endIcon={<Person2Icon sx={{mt:'-4px'}} />}>{item.gender}</Button> </TableCell>
                                    <TableCell align="center"><Button sx={{color:'#8A91A6', fontWeight:'600',textTransform: 'capitalize'}} >{item.height} cm  </Button> </TableCell>
                                </TableRow>
                            )) : (<Stack color='white'>tt</Stack>)
                        }
                        {
                            singleCharacter.length ? (
                                <TableRow>
                                <TableCell align="center"><Button sx={{color:'#8A91A6', fontWeight:'600',fontSize: '15px'}} >{singleCharacter.length} Characters</Button> </TableCell>
                                <TableCell align="center"><Button sx={{color:'#8A91A6', fontWeight:'600'}} >Total</Button> </TableCell>
                                <TableCell align="center"><Button sx={{color:'#8A91A6', fontWeight:'600',textTransform: 'capitalize', fontSize: '15px'}} >
                                    {totalHeights} cm ({Math.floor(totalHeights*0.0328084)}ft / {Math.floor(totalHeights*0.0328084*12)}in)</Button> </TableCell>
                            </TableRow>
                            ): ''
                        }
                             
                    </TableBody>
                </Table>
        
            </TableContainer>
        </Stack>
        
        
        

      </div> )
}
    </>
     
    
  );
}

export default MovieList;
