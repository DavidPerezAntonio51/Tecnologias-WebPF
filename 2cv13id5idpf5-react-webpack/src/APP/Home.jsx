import React, { Component } from 'react';
import Encabezado from './Encabezado.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Tabla from './ComponentsHome/Tabla.js';


class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1 className="textV1">Laboratorio virtual de: {this.props.User}</h1>
                        </Col>
                        <Col xs md="3" lg="2">
                            <Button variant="outline-light" type="button" onClick={this.props.handleLogout}>Cerrar Sesión</Button>
                        </Col>
                    </Row>
                </Container>
                <Encabezado title={this.props.title}></Encabezado>
                <Container>
                    <Row>
                        <Col>
                            <Button variant="outline-light" as={Link}to="/2CV13ID5IDP4/create">Crear Pregunta</Button>
                        </Col>
                    </Row>
                </Container>
                <Tabla />
            </div>
         );
    }
}
 
export default Home;