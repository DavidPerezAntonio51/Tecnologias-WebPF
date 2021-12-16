import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import NombrePregunta from './Form/NombrePregunta.js';
import Proporcion from './Form/Proporcion.js';
import Lienzo from './Form/Lienzos.js';
import Puntero from './Form/Puntero.js';
import Radar from './Form/Radar.js';
import Stack
 from 'react-bootstrap/Stack';

class FormularioModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Pregunta:[],
            Puntero: false,
            Radar: false,
        }
        this.handlerPointer = this.handlerPointer.bind(this);
        this.handlerRadar = this.handlerRadar.bind(this);
    }
 

    componentDidMount() {
        const pregun = window.location.search;
        console.log(pregun);
        fetch('http://localhost:8080/2CV13ID5IDP4/API/getQuestion'+pregun)
            .then(
                response => {
                    return response.ok ? response.json() : response.status;
                }
            )
            .then(
                json => {
                    this.setState({
                        Pregunta: json,
                    });
                }
            );
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
    render() {
        return (
            <Form id="formify" method="post" action="http://localhost:8080/2CV13ID5IDP4/updateQuestion" encType={this.state.Radar||this.state.Puntero?"multipart/form-data":"application/x-www-form-urlencoded"}>
                <Stack gap={3}>
                    
                    <Row>    
                        <Col>
                           <Form.Label>Nombre de la pregunta</Form.Label>
                            <NombrePregunta Pname={this.state.Pregunta.Nombre}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Proporcion ValorI={this.state.Pregunta.ValorI} ValorD={this.state.Pregunta.ValorD}  />
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                            <Lienzo Lienzo={this.state.Pregunta.Tamaño}/>
                        </Col>
                    </Row>
                    <Form.Label> Elige nuevos elementos.</Form.Label>
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

export default FormularioModify;