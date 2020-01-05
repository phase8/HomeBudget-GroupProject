import React from "react";
import { Link } from 'react-router-dom';

const logout = () => {
    localStorage.removeItem("token");
    };
    
export const navbar = [
    <div className='controls'>
    <Link to ='/Userpanel'>
        <div className='controlButton'>
            Panel użytkownika
        </div>
    </Link>
    <div className='controlButton'>
        Cele
    </div>
    <div className='controlButton'>
        Kategorie
    </div>
    <div className='controlButton'>
        Historia
    </div>
    <Link to ='/' onClick={logout}>
        <div className='controlButton'>
            Wyloguj (nazwa użytkownika)
        </div>
    </Link>
    </div>
]
