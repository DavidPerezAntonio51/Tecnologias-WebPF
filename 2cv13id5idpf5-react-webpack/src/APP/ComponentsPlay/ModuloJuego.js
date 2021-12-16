import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import ModuloMano from './ModuloMano.js';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
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
            ControlFlag: true, 
            contador: 0,
            minutos: 0,            
        }
        this.updateIzquierdo = this.updateIzquierdo.bind(this);
        this.updateDerecho = this.updateDerecho.bind(this);
        this.MySwal = withReactContent(Swal);
    }

    componentDidMount(){
        this.micontador= setInterval(() =>{
            this.setState({
                contador: this.state.contador +=1,
            })            
        },1000); 
    }

    componentWillUnmount(){
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

        if(this.state.contador==60){
            this.setState({
                contador: 0,
                minutos: this.state.minutos +=1, 
        })
    }

        if (this.state.ValorI != prevState.ValorI) {
            RespuestaPredecida= (this.state.ValorD * this.props.VIC) / this.props.VDC
            this.setState({
                RespuestaActual: this.state.ValorI / this.state.ValorD,
            })
            if (Math.abs(RespuestaPredecida - this.state.ValorI) == 1) {
                this.setState({
                    Color: "fondocasi1",
                })
            } else if (Math.abs(RespuestaPredecida - this.state.ValorI) == 2) {
                this.setState({
                    Color: "fondocasi2",
                })
            } else if (Math.abs(RespuestaPredecida - this.state.ValorI) == 3) {
                this.setState({
                    Color: "fondocasi3",
                    ControlFlag: true,
                })
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
            } else if (Math.abs(RespuestaPredecida - this.state.ValorD) == 2) {
                this.setState({
                    Color: "fondocasi2",
                })
            } else if (Math.abs(RespuestaPredecida - this.state.ValorD) == 3) {
                this.setState({
                    Color: "fondocasi3",
                    ControlFlag: true,
                })
            }
        }
        if (this.props.RespuestaCorrecta == this.state.RespuestaActual && prevState.RespuestaActual!=this.state.RespuestaActual) {
            this.MySwal.fire({
                title:"¡Felicidades!",
                text:"Tiempo Total = "+"Segundos",
                background: '#212529',
                color: '#716add',
                backdrop: 'rgba(72, 132, 255, 0.55) url('+Cat+') right top no-repeat',
            })
            this.setState({
                Color: "fondotrue",
            })
        } else if (this.props.RespuestaCorrecta != this.state.RespuestaActual) {

            /*-------------------------------------------------------------------------------*/
            if (this.state.ControlFlag) {
                this.setState({
                    Color: "fondodav",
                    ControlFlag: false
                })
            }
        }

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
                                        <Button as={Link} to="/2CV13ID5IDPF5/home" size="lg" variant="outline-light">Menu Principal </Button>
                                        <Form.Label>Tu tiempo: {this.state.minutos} minutos y {this.state.contador} segundos</Form.Label>
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