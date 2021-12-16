import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import ModuloMano from './ModuloMano.js';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class ModuloJuego extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ValorI: 10,
            ValorD: 10,
            RespuestaActual: 1,
            Color: "fondodav",
            ControlFlag: true,
        }
        this.updateIzquierdo = this.updateIzquierdo.bind(this);
        this.updateDerecho = this.updateDerecho.bind(this);
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
            console.log("¡Exito!")
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
                        <ModuloMano handlerUpdate={this.updateDerecho} />
                    </Col>
                    <Col md={5} lg={5}>
                        <Container>
                            <Row>
                                <Col>
                                    <Stack gap={3}>
                                        <Button as={Link} to="/2CV13ID5IDPF5/home" size="lg" variant="outline-light">Menu Principal </Button>
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