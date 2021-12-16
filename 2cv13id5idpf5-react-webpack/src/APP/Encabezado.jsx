import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Encabezado extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <h1 className="textV1">{this.props.title}</h1>
                    </Col>
                </Row>
            </Container>
         );
    }
}
 
export default Encabezado;