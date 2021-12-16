import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class Acciones extends Component {
    constructor(props) {
        super(props);
        this.handlerEliminar = this.handlerEliminar.bind(this);
    }
    handlerEliminar(e) {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            background: '#212529',
            icon: 'warning',
            iconColor: '#dc3545',
            title: '¡Cuidado!',
            text: 'Deseas Eliminar la pregunta con ID: ' + this.props.pregunta,
            showDenyButton: true,
            confirmButtonColor: '#198754',
            confirmButtonText: '¡Hagamoslo!',
            denyButtonColor: '#dc3545',
            denyButtonText: '¡NO!',
        })
            .then(result => {
                console.log(result);
                if (result.isConfirmed) {
                    fetch('http://localhost:8080/2CV13ID5IDPF5/API/deleteQuestion?pregunta=' + this.props.pregunta)
                        .then(Response => {
                            if (Response.ok) {
                                MySwal.fire({
                                    background: '#212529',
                                    icon: 'success',
                                    iconColor: '#198754',
                                    title: '¡Hecho!',
                                    text: 'La pregunta fue eliminada correctamente',
                                    timer: 3000,
                                    didOpen: () => {
                                        MySwal.showLoading();
                                    },
                                });
                                this.props.update();
                            } else {
                                MySwal.fire({
                                    background: '#212529',
                                    icon: 'error',
                                    iconColor: '#dc3545',
                                    title: '¡ERROR!',
                                    text: 'Ocurrio un error con el Servidor, Revisa tu conexiona Internet',
                                    timer: 3000,
                                    didOpen: () => {
                                        MySwal.showLoading();
                                    },
                                });
                            }
                        });
                } else {
                    MySwal.fire({
                        background: '#212529',
                        icon: 'success',
                        iconColor: '#FFFFFF',
                        title: '¡Cancelado!',
                        text: 'La pregunta esta a salvo',
                        timer: 3000,
                        didOpen: () => {
                            MySwal.showLoading();
                        },
                    });
                }
            });
    }
    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Stack direction="horizontal" gap={3}>
                            <Button as={Link} to={"/2CV13ID5IDPF5/play" + "?pregunta=" + this.props.pregunta} variant="outline-success">
                                Jugar
                            </Button>
                            <div className="vr" />
                            <Button as={Link} to={"/2CV13ID5IDPF5/preview" + "?pregunta=" + this.props.pregunta} variant="outline-info">
                                Previsualizar
                            </Button>
                            <div className="vr" />
                            <Button as={Link} to={"/2CV13ID5IDPF5/modify" + "?pregunta=" + this.props.pregunta} variant="outline-light">
                                Modificar
                            </Button>
                            <div className="vr" />
                            <Button variant="outline-danger" onClick={this.handlerEliminar}>
                                Eliminar
                            </Button>
                        </Stack>
                    </Col>

                </Row>

            </Container>
        );
    }
}

export default Acciones;