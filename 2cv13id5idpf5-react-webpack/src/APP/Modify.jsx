import React, { Component } from 'react';
import Encabezado from './Encabezado.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import FormularioModify from './ComponentsModify/FormularioModify.js';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

class Modify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ValorI: 1,
            ValorD: 1,
            CanvasSize: 10,
            objetosI: [],
            objetosD: [],
            defaultPointer: 1,
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Encabezado title={this.props.title}></Encabezado>
                </Row>
                <br />
                <br />
                <Row className="justify-content-md-center">
                    <Container>
                        <Row>
                            <Col>
                                <FormularioModify />
                            </Col>
                        </Row>
                    </Container>
                </Row>
                <br />
                <br />
                <Row >
                    <Col>
                        <Row>
                            <Button as={Link} to="/2CV13ID5IDP4/home" size="lg" variant="outline-light">Regresar </Button>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col>
                                <Row>
                                <Button size="lg" as="input" type="submit" value="Actualizar" variant="outline-light" form="formify" />  
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Modify;


