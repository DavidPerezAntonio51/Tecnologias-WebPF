import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
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
        this.RespuestaPredecida
        this.RespuestaAuxiliar
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

        this.audio.play()
        //Manejador del cronometro
        if (this.state.contador == 60) {
            this.setState({
                contador: 0,
                minutos: this.state.minutos += 1,
            })
        }
        //revisa si hubo cambio en el puntero izquierdo
        if (this.state.ValorI != prevState.ValorI) {
            //se llena la respuesta auxiliar
            this.RespuestaAuxiliar = this.state.ValorI
            //se calcula la respuesta predecida con el modulo de prediccion
            this.RespuestaPredecida = (this.state.ValorD * this.props.VIC) / this.props.VDC
            //se actualiza el estado de acuerdo a la posicion del puntero
            this.setState({
                RespuestaActual: this.state.ValorI / this.state.ValorD,
            })
            /*-------------------------------------------------------------*/
            //aplicacion de niveles de volumen y colores de fondo
            if (Math.abs(this.RespuestaPredecida - this.state.ValorI) == 1) {
                this.setState({
                    Color: "fondocasi1",
                })
                this.audio.volume = 1
            } else if (Math.abs(this.RespuestaPredecida - this.state.ValorI) == 2) {
                this.setState({
                    Color: "fondocasi2",
                })
                this.audio.volume = 0.05
            } else if (Math.abs(this.RespuestaPredecida - this.state.ValorI) == 3) {
                this.setState({
                    Color: "fondocasi3",
                    //bandera necesaria para no entrar en bucle infinito
                    WhiteControlFlag: true,
                })
                this.audio.volume = 0.005
            } else {
                this.audio.volume = 0
            }
        }
        if (this.state.ValorD != prevState.ValorD) {
            this.RespuestaAuxiliar = this.state.ValorD
            this.RespuestaPredecida = (this.state.ValorI * this.props.VDC) / this.props.VIC
            this.setState({
                RespuestaActual: this.state.ValorI / this.state.ValorD,
            })
            if (Math.abs(this.RespuestaPredecida - this.state.ValorD) == 1) {
                this.setState({
                    Color: "fondocasi1",
                })
                this.audio.volume = 1
            } else if (Math.abs(this.RespuestaPredecida - this.state.ValorD) == 2) {
                this.setState({
                    Color: "fondocasi2",
                })
                this.audio.volume = 0.5
            } else if (Math.abs(this.RespuestaPredecida - this.state.ValorD) == 3) {
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
        //condicion de respuesta correcta
        if (this.props.RespuestaCorrecta == this.state.RespuestaActual && prevState.RespuestaActual != this.state.RespuestaActual) {
            if (this.props.modo === "play") {
                //detiene musica(radar)
                this.audio.pause()
                //lanza notificacion de felicitacion
                this.MySwal.fire({
                    title: "¡Felicidades eres todo un Crack!",
                    text: "Tiempo Total = " + this.state.minutos + " Minutos y " + this.state.contador + " Segundos",
                    background: '#212529',
                    color: '#716add',
                    backdrop: 'rgba(72, 132, 255, 0.55) url(' + Cat + ') right top no-repeat',
                })
                clearInterval(this.micontador)
            }
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
                                        {this.props.modo == "demo"
                                            ? <Button as={Link} to="/2CV13ID5IDPF5/home" size="lg" variant="outline-light"> Volver al Menú</Button>
                                            : this.state.EndGameFlag
                                                ? <Button as={Link} to="/2CV13ID5IDPF5/home" size="lg" variant="outline-light"> Volver al Menú</Button>
                                                : <Button onClick={this.handlerSurrender} size="lg" variant="outline-light">¿Deseas Rendirte? </Button>}
                                        {this.props.modo == "demo"
                                            ?
                                            <Container>
                                                <Stack gap={3}>

                                                    <Row>
                                                        <Col>
                                                            <Card bg={
                                                                this.RespuestaPredecida == undefined
                                                                    ? "light"
                                                                    : Math.abs(this.RespuestaPredecida - this.RespuestaAuxiliar) == 0
                                                                        ? "success"
                                                                        : Math.abs(this.RespuestaPredecida - this.RespuestaAuxiliar) == 1
                                                                            ? "warning"
                                                                            : Math.abs(this.RespuestaPredecida - this.RespuestaAuxiliar) == 2
                                                                                ? "secondary"
                                                                                : "light"
                                                            }
                                                                text={
                                                                    this.RespuestaPredecida == undefined
                                                                        ? "dark"
                                                                        : Math.abs(this.RespuestaPredecida - this.RespuestaAuxiliar) == 0
                                                                            ? "light"
                                                                            : Math.abs(this.RespuestaPredecida - this.RespuestaAuxiliar) == 1
                                                                                ? "light"
                                                                                : Math.abs(this.RespuestaPredecida - this.RespuestaAuxiliar) == 2
                                                                                    ? "light"
                                                                                    : "dark"
                                                                }>
                                                                <Card.Header as="h4">Datos de la Pregunta</Card.Header>
                                                                <Card.Body>
                                                                    <Card.Text>La proporcion debe ser:
                                                                        <br />
                                                                        {this.props.VIC} a {this.props.VDC}
                                                                    </Card.Text>
                                                                    <Card.Footer>{this.RespuestaPredecida == undefined
                                                                        ? "Mueve Cualquier Puntero"
                                                                        : Math.abs(this.RespuestaPredecida - this.RespuestaAuxiliar) == 0
                                                                            ? "Acertaste"
                                                                            : "Tu respuesta Correcta Mas cercana es: " + this.RespuestaPredecida}</Card.Footer>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                    <Row md={2}>
                                                        <Col>
                                                            <Card>
                                                                <Card.Header as="h4">Izq.</Card.Header>
                                                                <Card.Body>
                                                                    <Card.Text as="h4">{this.state.ValorI}</Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                        <Col>
                                                            <Card>
                                                                <Card.Header as="h4">Derecha</Card.Header>
                                                                <Card.Body>
                                                                    <Card.Text as="h4">{this.state.ValorD}</Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                </Stack>
                                            </Container>
                                            : <Card>
                                                <Card.Header as="h2">Cronometro</Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        <Col>
                                                            <Card>
                                                                <Card.Header as="h4">Min.</Card.Header>
                                                                <Card.Body as="h5">{this.state.minutos}</Card.Body>
                                                            </Card>
                                                        </Col>
                                                        <Col md={1}>
                                                            <Row>
                                                                <Card.Text as="h2">:</Card.Text>
                                                            </Row>
                                                        </Col>
                                                        <Col>
                                                            <Card>
                                                                <Card.Header as="h4">Seg.</Card.Header>
                                                                <Card.Body as="h5">{this.state.contador}</Card.Body>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        }
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