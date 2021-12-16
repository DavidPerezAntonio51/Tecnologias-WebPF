import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

class Lienzo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Tamaño: 10,
        }
        this.handlerOnChange = this.handlerOnChange.bind(this);
    }
    handlerOnChange(event) {
        this.setState({
            Tamaño: event.target.value
        });
    }
    render() {
        return (
            <Form.Group>
                <Form.Label>Elige el tamaño del lienzo:</Form.Label>

                <FloatingLabel controlId="Valor1" label="Tamaño">
                    <Form.Select value={this.state.Tamaño} name="Lienzo" onChange={this.handlerOnChange}>
                        <option value={10}>1-10</option>
                        <option value={20}>1-20</option>
                        <option value={30}>1-30</option>
                    </Form.Select>
                </FloatingLabel>

            </Form.Group>
        );
    }
}

export default Lienzo;