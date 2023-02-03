import React, {useState, useEffect} from 'react'
import Main from './Components/Main';
import MovieList from './Components/MovieList';
import './App.css';
import { Route , Routes } from 'react-router-dom'


function App() {

 
  return (
    <div className="App">
       <Routes>
        <Route  path='/' element={<Main />} />
        <Route  path='/film/:id' element={<MovieList />} />
        </Routes>
    </div>
  );
}

export default App;
//<ListItemIcon><RemoveRedEyeIcon fontSize="small" /></ListItemIcon>