import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Home from '../Home.jsx';
import Crear from '../Create.jsx';
import Modify from '../Modify.jsx';
import Play from '../Play.jsx';
import Login from '../Login.jsx';

class Rutas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: "",
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }
    componentDidMount() {
        const user = window.localStorage.getItem('User')
        if(user){
            this.setState({
                User: user
            })
        }
    }
    handleLogin(user){
        this.setState({
            User: user
        })
    }
    handleLogout(event){
        this.setState({
            User: ""
        })
        window.localStorage.removeItem('User')
    }
    render() {
        return (
            <Switch>
                <Route exact path="/2CV13ID5IDPF5/">
                   <Redirect to="/2CV13ID5IDPF5/login"/>
                </Route>
                <Route exact path="/2CV13ID5IDPF5/login">
                    {this.state.User?<Redirect to="/2CV13ID5IDPF5/home"/>:<Login handleLogin={this.handleLogin}/>}
                </Route>
                <Route exact path="/2CV13ID5IDPF5/home">
                    {this.state.User
                    ?<Home title="Crear, Ver, Modificar y Eliminar" handleLogout={this.handleLogout} User={this.state.User}/>
                    :<Redirect to="/2CV13ID5IDPF5/login"/>}
                </Route>
                <Route exact path="/2CV13ID5IDPF5/play">
                    {this.state.User
                    ?<Play modo="play"/>
                    :<Redirect to="/2CV13ID5IDPF5/login"/>}
                </Route>
                <Route exact path="/2CV13ID5IDPF5/preview">
                    {this.state.User
                    ?<Play modo="demo"/>
                    :<Redirect to="/2CV13ID5IDPF5/login"/>}
                </Route>
                <Route exact path="/2CV13ID5IDPF5/create">
                    {this.state.User
                    ?<Crear title="Crea una nueva pregunta llenando los datos" />
                    :<Redirect to="/2CV13ID5IDPF5/login"/>}
                </Route>

                <Route exact path="/2CV13ID5IDPF5/modify">
                    {this.state.User
                    ?<Modify title="Edita los datos de las preguntas" />
                    :<Redirect to="/2CV13ID5IDPF5/login"/>}
                </Route>

            </Switch>
        );
    }
}

export default Rutas;
