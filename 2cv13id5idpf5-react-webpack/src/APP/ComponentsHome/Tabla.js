import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Acciones from './Acciones.js';

class Tabla extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Preguntas: [],
        }
        this.updateTable = this.updateTable.bind(this);
    }
    componentDidMount() {
        fetch('http://localhost:8080/2CV13ID5IDP4/API/getQuestions')
            .then(
                response => {
                    return response.ok ? response.json() : response.status;
                }
            )
            .then(
                json => {
                    console.log(json);
                    this.setState({
                        Preguntas: json,
                    });
                }
            );
    }
    updateTable(e){
        fetch('http://localhost:8080/2CV13ID5IDP4/API/getQuestions')
            .then(
                response => {
                    return response.ok ? response.json() : response.status;
                }
            )
            .then(
                json => {
                    console.log(json);
                    this.setState({
                        Preguntas: json,
                    });
                }
            );
    }
    render() {
        return (
            <Container className="help">
                <Row>
                    <Col>
                        <h2 className="textV">Preguntas</h2>
                    </Col>
                </Row>
                <Row>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>
                                    <Container>
                                        <Row className="justify-content-md-center">
                                            <Col md="auto">
                                                Nombre de la Pregunta
                                            </Col>
                                        </Row>
                                    </Container>
                                </th>
                                <th>
                                    <Container>
                                        <Row className="justify-content-md-center">
                                            <Col md="auto">
                                                Acciones
                                            </Col>
                                        </Row>
                                    </Container>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Preguntas.map(
                                pregunta =>
                                    <tr key={"fila" + pregunta.Nombre}>
                                        <td key={"Nombre" + pregunta.Nombre}>
                                            <Container>
                                                <Row className="justify-content-md-center">
                                                    <Col md="auto">
                                                        <h4>{pregunta.Nombre}</h4>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </td>
                                        <td key={"Actions" + pregunta.Nombre}><Acciones update={this.updateTable} pregunta={pregunta.Nombre} /></td>
                                    </tr>
                            )}
                        </tbody>
                    </Table>
                </Row>

            </Container>
        );
    }
}

export default Tabla;