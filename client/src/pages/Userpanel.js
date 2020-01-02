import React from "react";
import { Link } from 'react-router-dom';
import '../styles/page.css'

class Userpanel extends React.Component{
    render() {
        return (
            <div className='pageContainer'>
                <div className='controls'>
                    <Link to ='/Userpanel'>
                        <div className='controlButton' style={{color: "gray",}}>
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
                    <Link to ='/'>
                        <div className='controlButton'>
                            Wyloguj (nazwa użytkownika)
                        </div>
                    </Link>
                </div>
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
        )
    }
}

export default Userpanel;