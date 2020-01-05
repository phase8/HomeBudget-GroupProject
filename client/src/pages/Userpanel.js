import React from "react";
import { Link } from 'react-router-dom';
import '../styles/page.css'
import { navbar } from './Navbar.js'

export const userpanel = [
    <div className='dataContainer'>
        <div className='statusContainer'>
            <div className='currentFinantialStatus'>
                <div className='statusDescription'>
                    Twoje obecne środki:
                </div>
                <div className='cashAmount'>

                </div>
            </div>
            <div className='controlBox'>
                <div className='addCash'>
                    Dodaj przychód lub wydatek
                </div>
                <div className='addGoal'>
                    Dodaj cel
                </div>
            </div>
        </div>
    </div>
        
]

class Userpanel extends React.Component{
    render() {
        return (
            <div className='pageContainer'>
                {navbar}
                {userpanel}
            </div>
        )
    }
}

export default Userpanel;