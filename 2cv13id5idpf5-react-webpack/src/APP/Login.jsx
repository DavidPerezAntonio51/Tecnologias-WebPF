import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Container, Row, Col } from 'react-bootstrap';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
        }
        this.verifica = this.verifica.bind(this);
        this.handlerOnChangeUser = this.handlerOnChangeUser.bind(this);
        this.handlerOnChangePassword = this.handlerOnChangePassword.bind(this);
    }
    verifica(e) {
        const alert = withReactContent(Swal)
        e.preventDefault();
        var data = {
            name: this.state.name,
            password: this.state.password
        }
        const config = {
            method: 'POST',
            body: JSON.stringify(data),
        }
        fetch('http://localhost:8080/2CV13ID5IDP4/API/Login', config)
            .then(result => {
                return result.ok ? result.json() : result.status
            })
            .then(json => {
                console.log(json);
                if (json.error) {
                    alert.fire({
                        background: '#212529',
                        icon: 'error',
                        iconColor: '#dc3545',
                        title: '¡Error al iniciar sesión!',
                        text: 'Causa: ' + json.error,
                        showDenyButton: false,
                        confirmButtonColor: '#198754',
                        confirmButtonText: 'Reintentar',
                    })
                }
                alert.fire({
                    toast: true,
                    background: '#212529',
                    icon: 'success',
                    iconColor: '#198754',
                    title: 'Bienvenido: ' + json.data.name,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    position: 'top-end',
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                window.localStorage.setItem('User',json.data.name)
                this.props.handleLogin(json.data.name)
            })
    }
    handlerOnChangeUser(e) {
        this.setState({
            name: e.target.value
        })
    }
    handlerOnChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    render() {
        return (

                    <Container className="login-box">

                        <h3 className="logitext">Inicio de sesión</h3>

                        <Container className="login-lab">

                            <Form.Group>
                                <Form.Label>Ingrese su usuario</Form.Label>
                                <Form.Floating >
                                    <Form.Control name="User" type="text" placeholder="Usuario" value={this.state.name} onChange={this.handlerOnChangeUser} />
                                    <label className="login-labi" htmlFor="Nombre">Nombre de usuario</label>
                                </Form.Floating>
                            </Form.Group>

                        </Container>

                        <Container className="login-lab">
                            <Form.Group>
                                <Form.Label>Ingrese su contraseña</Form.Label>
                                <Form.Floating >
                                    <Form.Control name="password" type="password" placeholder="Contraseña" value={this.state.password} onChange={this.handlerOnChangePassword} />
                                    <label className="login-labi" htmlFor="Contraseña">contraseña</label>
                                </Form.Floating>
                            </Form.Group>
                        </Container>

                        <Container className="login-boton">
                            <Button size="lg" variant="success" type="button" onClick={this.verifica}>Iniciar sesión</Button>
                        </Container>

                    </Container>
            
        );
    }
}

export default Login;