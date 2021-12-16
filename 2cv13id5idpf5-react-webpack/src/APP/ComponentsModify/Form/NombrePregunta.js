import React, { Component } from 'react';
import { Placeholder } from 'react-bootstrap';
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
                <Form.Control name="NombrePregunta" type="text" placeholder={this.props.Pname} value={this.props.Pname} readOnly />

        );
    }
}

export default NombrePregunta;