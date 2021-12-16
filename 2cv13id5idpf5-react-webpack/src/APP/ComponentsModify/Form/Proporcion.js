import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack'
import FloatingLabel from 'react-bootstrap/FloatingLabel';

class Proporcion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valorI: 1,
            valorD: 1,
        }
        this.handlerOnChangeI = this.handlerOnChangeI.bind(this);
        this.handlerOnChangeD = this.handlerOnChangeD.bind(this);
    }
    handlerOnChangeI(e) {
        this.setState({
            valorI: e.target.value,
        });
    }
    handlerOnChangeD(e) {
        this.setState({
            valorD: e.target.value,
        });
    }
    render() {
        return (
            <Form.Group>
                <Form.Label>Elige la porporcion que deseas usar</Form.Label>
                <Stack direction="horizontal" gap={3}>
                    <Form.Label>Proporcion </Form.Label>
                    <FloatingLabel controlId="Valor1" label={"Valor anterior: "+this.props.ValorI} style={{width:"250px"}}>
                        <Form.Select value={this.state.valorI} name="ValorI" onChange={this.handlerOnChangeI}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </Form.Select>
                    </FloatingLabel>
                    <Form.Label>a</Form.Label>
                    <FloatingLabel controlId="Valor2" label={"Valor anterior: "+this.props.ValorD} style={{width:"250px"}}>
                        <Form.Select value={this.state.valorD} name="ValorD" onChange={this.handlerOnChangeD}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </Form.Select>
                    </FloatingLabel >
                </Stack>
            </Form.Group>
        );
    }
}

export default Proporcion;