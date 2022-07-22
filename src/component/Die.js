import React from 'react'
import Dot1 from '../dice_dots/Dot1'
import Dot2 from '../dice_dots/Dot2'
import Dot3 from '../dice_dots/Dot3'
import Dot4 from '../dice_dots/Dot4'
import Dot5 from '../dice_dots/Dot5'
import Dot6 from '../dice_dots/Dot6'

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white" 
    }

    function getValue() {
       switch(props.value) {
        case 1: 
            return <Dot1/>
        
        break;
        case 2: 
            return <Dot2/>
        break;
        case 3: 
            return <Dot3/>
        break;
        case 4: 
            return <Dot4/>
        break;
        case 5: 
            return <Dot5/>
        break;
        case 6: 
            return <Dot6/>
        break;
       }
    }
       

    return(
        <div className='face' style={styles} onClick={props.holdDice}>
            {getValue()}
        </div>
    )
}

