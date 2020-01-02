import React from "react";
import { Link } from 'react-router-dom';
import '../styles/page.css'

class Welcomepage extends React.Component{
    logout = () => {
    localStorage.removeItem("token");
    };
    render() {
        return (
            <div className='pageContainer'>
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
                    <Link to ='/' onClick={this.logout}>
                        <div className='controlButton'>
                            Wyloguj (nazwa użytkownika)
                        </div>
                    </Link>
                </div>
                <div className='notification'>
                    Cześć (nazwa użytkownika)! Miło Cię widzieć ponownie. 
                    Zaoszczędź z nami trochę $$$ żeby Ci potem starczyło na waciki. 
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

export default Welcomepage;

