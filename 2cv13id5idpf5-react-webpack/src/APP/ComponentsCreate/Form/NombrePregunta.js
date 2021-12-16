import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class NombrePregunta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Nombre: "",
        }
        this.handlerOnChange = this.handlerOnChange.bind(this);
    }
    handlerOnChange(e) {
        this.setState({
            Nombre: e.target.value,
        });
    }
    render() {
        return (
            <Form.Group>
                <Form.Label>Escribe el nombre de tu pregunta:</Form.Label>
                <Form.Floating >
                    <Form.Control required name="NombrePregunta" type="text" placeholder="Nombre de la Pregunta" value={this.state.Nombre} onChange={this.handlerOnChange} />
                    <Form.Control.Feedback type="invalid">
                        ¡Cuidado Nombre de Pregunta Invalido!
                    </Form.Control.Feedback>
                    <label htmlFor="Nombre">Nombre de la Pregunta</label>
                </Form.Floating>
            </Form.Group>
        );
    }
}

export default NombrePregunta;