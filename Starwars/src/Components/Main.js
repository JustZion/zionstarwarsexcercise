import React, {useState, useEffect} from 'react'
import '../App.css'
import { Route , Routes, Link } from 'react-router-dom'
import star from '../assets/starwars.jpg'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, Box, IconButton, ListItemText, ListItemIcon,Chip,TableCell } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Loader from './Loader';



const Main = () => {                                //  First page to be displayed containing the list of starwars film

  const [anchorEl, setAnchorEl] = useState(null);  // default dropdown navigation setting
  const [datawars, setDatawars] = useState([])      // used to grab the api result for list of movies
  const [watch, setWatch] = useState(1)             // a watcher to prevent unnecesary looping
  const open = Boolean(anchorEl);                     
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const test = (x) => {
    setDatawars(x)
  }
  const fetchData = () => {             // fetches data from api and saves it to datawars instance
    return fetch("https://swapi.dev/api/films")
          .then((response) => response.json())
          .then((data) => test(data.results));
  }

  useEffect(() => {                     // runs at start of program and controls how data is re-rendered
  
      if (datawars.length) {
      if (watch === 2) {

      }
      else {
        console.log('dataaaa', datawars)
        setWatch(2)
      }
      
    }
  

    else {
      fetchData()
    }



  },[datawars])

  return (

      <div className='imageCover'>
        <img src={star} className='frontpagelogo' />


        <div className='buttonstarwars'>
          <Button className='buttonwars' sx={{textTransform: 'capitalize', backgroundColor: 'yellow',
          color: 'black', fontFamily: 'monospace', fontWeight: 600, '&:hover': {
            backgroundColor: 'yellow',
            color: 'black',
        }}} onClick={handleClick}
          endIcon={<ArrowDropDownIcon />}>
          Choose a star wars movie
          </Button>
            <Menu sx={{boxShadow: 0, border: 'none', mt: '-30px', ml: '-20px'}}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
                boxshadow: 0, border: '2px solid red'
              }}
            >

             {
              datawars.length ? datawars.map((item,index) => 
                (<Link key={item.release_date} className='links' to={'/film/'+ (index + 1)}>
                <MenuItem key={item.release_date} className='listMenu' sx={{backgroundColor: 'black', color:'yellow'}}onClick={handleClose}> 
                <ListItemText sx={{mr: '30px',mb: '0px !important'}}>{item.title}</ListItemText> <span className='release_date'>{item.release_date.substring(0,4)}
                </span> </MenuItem>
                </Link>)
              ):  (<Loader />)
             }
              
            </Menu>
            </div>
      </div>
    
  );
}

export default Main;
