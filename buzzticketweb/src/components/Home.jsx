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

    getItems = (buscarTodos) =>{

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
            // pegando todo mundo do array de itens que está antes do item que está sendo alterado
            ...this.state.items.slice(0, itemIndex),

            // adicionando o item alterado no array, exatamente na mesma posicao do original 
            item,

            // adicionando o restante do array de itens, assim criando um novo array 
            // onde o item alterado ficará no mesmo index que ocupava antes, assim como os demais valores
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
                            <ModalForm buttonLabel="Criar Ticket"  reloadGrid={this.getItems} addItemToState={this.addItemToState} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h1 style={{ margin: "20px 0" }}>Tickets </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DataTable items={this.state.items} reloadGrid={this.getItems} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
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