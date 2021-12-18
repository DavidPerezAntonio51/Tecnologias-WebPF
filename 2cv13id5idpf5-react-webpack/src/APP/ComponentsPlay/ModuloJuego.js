import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import ModuloMano from './ModuloMano.js';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Cat from '../assets/Cat.gif';

class ModuloJuego extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ValorI: 1,
            ValorD: 1,
            RespuestaActual: 1,
            Color: "fondodav",
            WhiteControlFlag: true,
            contador: 0,
            minutos: 0,
            EndGameFlag: false,
            SurrenderFlag: false,
        }
        this.updateIzquierdo = this.updateIzquierdo.bind(this);
        this.updateDerecho = this.updateDerecho.bind(this);
        this.MySwal = withReactContent(Swal);
        this.handlerSurrender = this.handlerSurrender.bind(this);
    }

    componentDidMount() {
        const pregunta = window.location.search
        fetch('http://localhost:8080/2CV13ID5IDPF5/API/getQuestion' + pregunta)
            .then(result => {
                return result.ok ? result.json() : result.status
            })
            .then(data => {
                this.audio = new Audio("http:\\\\localhost:8080" + data.Radar)
                console.log(this.audio.volume)
                this.audio.volume = 0
            })
        this.micontador = setInterval(() => {
            this.setState({
                contador: this.state.contador += 1,
            })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.micontador);
    }

    updateIzquierdo(valor) {
        this.setState({
            ValorI: valor
        })
    }
    updateDerecho(valor) {
        this.setState({
            ValorD: valor
        })
    }
    componentDidUpdate(prevPops, prevState) {
        var RespuestaPredecida
        this.audio.play()
        console.log("1 actualizacion")
        if (this.state.contador == 60) {
            this.setState({
                contador: 0,
                minutos: this.state.minutos += 1,
            })
        }

        if (this.state.ValorI != prevState.ValorI) {
            RespuestaPredecida = (this.state.ValorD * this.props.VIC) / this.props.VDC
            this.setState({
                RespuestaActual: this.state.ValorI / this.state.ValorD,
            })
            if (Math.abs(RespuestaPredecida - this.state.ValorI) == 1) {
                this.setState({
                    Color: "fondocasi1",
                })
                this.audio.volume = 1
            } else if (Math.abs(RespuestaPredecida - this.state.ValorI) == 2) {
                this.setState({
                    Color: "fondocasi2",
                })
                this.audio.volume = 0.05
            } else if (Math.abs(RespuestaPredecida - this.state.ValorI) == 3) {
                this.setState({
                    Color: "fondocasi3",
                    WhiteControlFlag: true,
                })
                this.audio.volume = 0.005
            } else {
                this.audio.volume = 0
            }
        }
        if (this.state.ValorD != prevState.ValorD) {
            RespuestaPredecida = (this.state.ValorI * this.props.VDC) / this.props.VIC
            this.setState({
                RespuestaActual: this.state.ValorI / this.state.ValorD,
            })
            if (Math.abs(RespuestaPredecida - this.state.ValorD) == 1) {
                this.setState({
                    Color: "fondocasi1",
                })
                this.audio.volume = 1
            } else if (Math.abs(RespuestaPredecida - this.state.ValorD) == 2) {
                this.setState({
                    Color: "fondocasi2",
                })
                this.audio.volume = 0.5
            } else if (Math.abs(RespuestaPredecida - this.state.ValorD) == 3) {
                this.setState({
                    Color: "fondocasi3",
                })
                this.audio.volume = 0.05
            } else {
                this.audio.volume = 0
                this.setState({
                    WhiteControlFlag: true,
                })
            }
        }
        if (this.props.RespuestaCorrecta == this.state.RespuestaActual && prevState.RespuestaActual != this.state.RespuestaActual) {
            this.MySwal.fire({
                title: "¡Felicidades eres todo un Crack!",
                text: "Tiempo Total = " + this.state.minutos + " Minutos y " + this.state.contador + " Segundos",
                background: '#212529',
                color: '#716add',
                backdrop: 'rgba(72, 132, 255, 0.55) url(' + Cat + ') right top no-repeat',
            })
            this.audio.pause()
            clearInterval(this.micontador)
            this.setState({
                Color: "fondotrue",
                EndGameFlag: true
            })
        } else if (this.props.RespuestaCorrecta != this.state.RespuestaActual) {

            /*-------------------------------------------------------------------------------*/
            if (this.state.WhiteControlFlag) {
                this.setState({
                    Color: "fondodav",
                    WhiteControlFlag: false
                })
            }
        }

    }
    handlerSurrender() {
        this.MySwal.fire({
            background: '#212529',
            icon: 'warning',
            iconColor: '#dc3545',
            text: 'Descuida, lo hiciste bien',
            title: '¿De veradad deseas Rendirte?',
            showDenyButton: true,
            confirmButtonColor: '#dc3545',
            confirmButtonText: '¡Rendirse!',
            denyButtonColor: '#198754',
            denymButtonText: '¡NO!',
        })
            .then(result => {
                console.log(result);
                if (result.isConfirmed) {
                    this.MySwal.fire({
                        background: '#212529',
                        icon: 'success',//cambiar por custom
                        iconColor: '#198754',
                        title: '¿Olvidaste tu valor en Casa?',
                        text: 'Puedo esperarte mientras vas a buscarlo',
                        timer: 4500,
                        backdrop: 'rgba(150, 0, 0, 0.78)',
                        didOpen: () => {
                            this.MySwal.showLoading();
                        },
                        willClose: () => {
                            this.setState({
                                SurrenderFlag: true
                            })
                        }
                    })
                }
            })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className={this.state.Color}>
                        <ModuloMano handlerUpdate={this.updateIzquierdo} />
                    </Col>
                    <Col className={this.state.Color}>
                        <ModuloMano handlerUpdate={this.updateDerecho} espejo={true} />
                    </Col>
                    <Col md={5} lg={5}>
                        <Container>
                            <Row>
                                <Col>
                                    <Stack gap={3}>
                                        {this.state.EndGameFlag
                                            ? <Button as={Link} to="/2CV13ID5IDPF5/home" size="lg" variant="outline-light"> Volver al Menú</Button>
                                            : <Button onClick={this.handlerSurrender} size="lg" variant="outline-light">¿Deseas Rendirte? </Button>}
                                        <Form.Label>Tu tiempo: {this.state.minutos} minutos y {this.state.contador} segundos</Form.Label>
                                        {this.state.SurrenderFlag ? <Redirect to="/2CV13ID5IDPF5/home" /> : ""}
                                    </Stack>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default ModuloJuego;