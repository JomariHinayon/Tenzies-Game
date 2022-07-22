import React from 'react'
import './dot.css'

export default function Dots(){ 
    return(
        <div className='face'>
            <div className='dot'></div>
            <div className='dot center'></div>
            <div className='dot bottom-right'></div>
        </div>
    )
}