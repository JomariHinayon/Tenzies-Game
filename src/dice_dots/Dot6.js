import React from 'react'
import './dot.css'

export default function Dots(){ 
    return(
        <div className='face'>
            <div className='dot'></div>
            <div className='dot top-right'></div>
            <div className='dot bottom-left'></div>
            <div className='dot bottom-center'></div>
            <div className='dot top-center'></div>
            <div className='dot bottom-right'></div>
        </div>
    )
}