import React from "react";
import { Link } from 'react-router-dom';
import '../styles/page.css'
import { navbar } from './Navbar.js'
import { userpanel } from './Userpanel.js'

const notification = [    
    <div className='notification'>
    Cześć (nazwa użytkownika)! Miło Cię widzieć ponownie. 
    Zaoszczędź z nami trochę $$$ żeby Ci potem starczyło na waciki. 
    </div>
]

class Welcomepage extends React.Component{
    render() {
        return (
            <div className='pageContainer'>
                {navbar}
                {userpanel}
                {notification}
            </div>
        )
    }

}

export default Welcomepage;

