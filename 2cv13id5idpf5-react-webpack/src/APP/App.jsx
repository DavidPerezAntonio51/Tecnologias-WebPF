import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from "react-router-dom";
import Rutas from './Router/Rutas';
import 'bootstrap/dist/css/bootstrap.min.css';
import stars from './assets/stars.png';
import moon from './assets/moon.png';
import mback from './assets/mback.png';
import mfront from './assets/mfront.png';

class App extends Component {
    render() {
        return (
                <div>
                    <ul>
                        <li>
                            <Link to="/2CV13ID5IDP4/login">Home</Link>
                        </li>
                    </ul>
                    <hr/>
                    <Rutas/>
                
                    <section>
                    <img src={stars} id = "stars"></img>
                    <img src={moon} id = "moon"  className="moon"></img>
                    <img src={mback} id = "mback"></img>
                    <img src={mfront} id = "mfront"></img>                    
                    </section>      

                </div>


        );
    }

}
export default App;
