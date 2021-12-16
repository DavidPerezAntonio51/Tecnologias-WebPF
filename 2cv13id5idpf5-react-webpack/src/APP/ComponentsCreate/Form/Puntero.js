import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import Default from './Default.js';
import Personalizado from './Personalizado.js';
import { Container, Row, Col } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack'
import FloatingLabel from 'react-bootstrap/FloatingLabel';

class Puntero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Personalizado: false,
        }
        this.handlerOnChange = this.handlerOnChange.bind(this);
    }
    handlerOnChange(e) {
        this.setState({
            Personalizado: !this.state.Personalizado,
        });
        this.props.changeEnctype();
    }
    render() {
        return (
            <Form.Group>
                <Form.Switch id="Pointer" label={"Puntero " + (this.state.Personalizado ? "Personalizado" : "por Default")}onChange={this.handlerOnChange}></Form.Switch>
                {this.state.Personalizado ? <Personalizado tipo="Puntero" /> : <Default tipo="Puntero" />}
            </Form.Group>
        );
    }
}

export default Puntero;