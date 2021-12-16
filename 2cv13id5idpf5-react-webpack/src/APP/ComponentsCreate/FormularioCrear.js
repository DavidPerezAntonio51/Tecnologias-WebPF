import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import NombrePregunta from './Form/NombrePregunta.js';
import Proporcion from './Form/Proporcion.js';
import Lienzo from './Form/Lienzos.js';
import Puntero from './Form/Puntero.js';
import Radar from './Form/Radar.js';
import Stack from 'react-bootstrap/Stack';

class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Puntero: false,
            Radar: false,
            validado: false,
        }
        this.handlerPointer = this.handlerPointer.bind(this);
        this.handlerRadar = this.handlerRadar.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handlerPointer(event) {
        this.setState({
            Puntero: !this.state.Puntero,
        });
    }
    handlerRadar(event) {
        this.setState({
            Radar: !this.state.Radar,
        });
    }
    handleSubmit(event) {
        const form = event.target
        if(form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({
            validado:true,
        })
    }
    render() {
        return (
            <Form id="formulario" method="post" action="http://localhost:8080/2CV13ID5IDP4/saveQuestion" encType={this.state.Radar||this.state.Puntero?"multipart/form-data":"application/x-www-form-urlencoded" } noValidate validated={this.state.validado} onSubmit={this.handleSubmit}>
                <Stack gap={3}>
                    <Row>
                        <Col>
                            <NombrePregunta valido={this.props.valido}/>
                        </Col>
                        <Col>
                            <Proporcion />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Lienzo />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Puntero changeEnctype={this.handlerPointer}/>
                        </Col>
                        <Col>
                            <Radar changeEnctype={this.handlerRadar}/>
                        </Col>
                    </Row>

                </Stack>
            </Form>
        );
    }
}

export default Formulario;