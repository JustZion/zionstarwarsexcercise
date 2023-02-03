import React, {useRef, useEffect} from 'react'
import {Stack, Button} from '@mui/material'
import Spinner from 'react-spinner-material';
import '../Crawler.css'


const Crawler = ({episode_id, crawl, title, setTimer}) => {         // crawler text animation page

    const setTime = () => {
        setTimer(300)
    }
    
  return (
    <>
    
    <div></div>

        <section className="star-wars">
        <div className="crawl">
            <div className="title">
            <p>Episode {episode_id}</p>
            <h1>{title}</h1>
            </div>
            
            <p>{crawl}</p>
            
            </div>
        </section>
    </>
    
  )
}

export default Crawler