import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import ModalForm from './Modals/Modal'
import DataTable from './Tables/DataTable'
import Header from './Header/Header'
import Api from '../Api'

class Home extends Component {
    state = {
        items: []
    }

    getItems(buscarTodos) {

        let url = buscarTodos ? Api.baseUrl : `${Api.baseUrl}${Api.buscarOrdenado}`;

        fetch(url)
            .then(response => response.json())
            .then(items => this.setState({ items }))
            .catch(err => console.log(err))
    }

    addItemToState = (item) => {
        this.setState(prevState => ({
            items: [...prevState.items, item]
        }))
    }

    updateState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data.id === item.id)
        const newArray = [
            // destructure all items from beginning to the indexed item
            ...this.state.items.slice(0, itemIndex),
            // add the updated item to the array
            item,
            // add the rest of the items to the array from the index after the replaced item
            ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({ items: newArray })
    }

    deleteItemFromState = (id) => {
        const updatedItems = this.state.items.filter(item => item.id !== id)
        this.setState({ items: updatedItems })
    }

    componentDidMount() {
        this.getItems(false)
    }

    render() {
        return (
            <div>
                <Header />
                <Container className="App">
                    <Row>
                        <h1 style={{ marginTop: "15px" }}></h1>
                    </Row>
                    <Row>
                        <Col>
                            <ModalForm buttonLabel="Criar Ticket" addItemToState={this.addItemToState} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h1 style={{ margin: "20px 0" }}>Tickets Abertos</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button outline color="secondary" size="sm" onClick={() => this.getItems(true)} style={{ marginBottom: "30px" }}>Mostrar Todos</Button>
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }
}

export default Home