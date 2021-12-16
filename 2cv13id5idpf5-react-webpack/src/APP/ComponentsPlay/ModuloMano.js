import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Image from 'react-bootstrap/Image'
import { Container, Row, Col } from 'react-bootstrap';

class ModuloMano extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objetos: [<h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1>Mano</h1>],
        }
        this.handlerUpdate = this.handlerUpdate.bind(this);
        this.handlerOnDragEnd = this.handlerOnDragEnd.bind(this);
    }
    componentDidMount() {
        const pregunta = window.location.search
        fetch('http://localhost:8080/2CV13ID5IDPF5/API/getQuestion' + pregunta)
            .then(result => {
                return result.ok ? result.json() : result.status
            })
            .then(data => {
                if (data.Tamaño == 10) {
                    this.setState({
                        objetos: [<h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>,<h1></h1>, <h1><Image className="Imaplay" src={"http:\\\\localhost:8080" + data.Puntero} fluid /></h1>]
                    })
                }
                if (data.Tamaño == 20) {
                    this.setState({
                        objetos: [<h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1><Image className="Imaplay" src={"http:\\\\localhost:8080" + data.Puntero} fluid /></h1>,<h1></h1>, <h1></h1>]
                    })
                }
                if (data.Tamaño == 30) {
                    this.setState({
                        objetos: [<h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1></h1>, <h1><Image className="Imaplay" src={"http:\\\\localhost:8080" + data.Puntero} fluid /></h1>,<h1></h1>,<h1></h1>, <h1></h1>],
                    })
                }

            })

    }
    handlerUpdate(result) {
        if (!result.destination) return;
        this.props.handlerUpdate(result.destination.index);
    }
    handlerOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(this.state.objetos);
        const [reorderedItem] = items.splice(result.source.index - 1, 1);
        items.splice(result.destination.index - 1, 0, reorderedItem);
        this.setState({
            objetos: items,
        });
    }
    render() {
        return (
            <DragDropContext onDragUpdate={this.handlerUpdate} onDragEnd={this.handlerOnDragEnd}>
                <Droppable droppableId="prueba">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {this.state.objetos.map(
                                (objeto, index) => {
                                    return (
                                        <Draggable key={"key" + index} draggableId={index + "drag"} index={index + 1}>
                                            {(provided) => (
                                                <Row>
                                                    <Col>
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            {objeto}
                                                        </li>
                                                    </Col>
                                                </Row>
                                            )}
                                        </Draggable>
                                    )
                                })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default ModuloMano;
