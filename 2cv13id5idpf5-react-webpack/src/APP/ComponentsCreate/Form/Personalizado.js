import React, { Component } from 'react'
import { Form } from 'react-bootstrap';

class Personalizado extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Form.Group>
                <Form.Label className="textV" >
                    Carga tu Propio {this.props.tipo} \^^/
                </Form.Label>
                <Form.Control type="file" name={this.props.tipo} />
            </Form.Group>
        );
    }
}

export default Personalizado;