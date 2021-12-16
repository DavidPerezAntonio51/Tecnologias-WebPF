import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Default from './Default.js';
import Personalizado from './Personalizado.js';

class Radar extends Component {
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
                <Form.Switch id="Pointer" label={"Radar " + (this.state.Personalizado ? "Personalizado" : "por Default")} onChange={this.handlerOnChange}></Form.Switch>
                {this.state.Personalizado ? <Personalizado tipo="Radar" /> : <Default tipo="Radar" />}
            </Form.Group>
        );
    }
}

export default Radar;