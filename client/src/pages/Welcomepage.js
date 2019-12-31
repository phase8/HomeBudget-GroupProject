import React from "react";
import { Link } from 'react-router-dom';
import '../styles/welcomepage.css'

class Welcomepage extends React.Component{
    render() {
        return (
            <div className='pageContainer'>
                <div className='controls'>
                    <div className='controlButton'>
                        Panel użytkownika
                    </div>
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
                <div className='welcomeAgain'>
                    Cześć (nazwa użytkownika)! Miło Cię widzieć ponownie. 
                    Zaoszczędź z nami trochę $$$ żeby Ci potem starczyło na waciki. 
                </div>
                <div className='currentFinantialStatus'>
                    <div className='statusDescription'>
                        Twoje obecne środki:
                    </div>
                    <div className='cashAmount'>

                    </div>
                </div>

            </div>
        )
    }
}

export default Welcomepage;