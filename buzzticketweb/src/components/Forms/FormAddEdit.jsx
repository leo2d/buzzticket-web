import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Api from '../../Api';


class AddEditForm extends React.Component {
    state = {
        id: '',
        solicitante: '',
        data: '',
        aberto: '',
        solicitacao: '',
    }



    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFormAdd = e => {
        e.preventDefault()
        fetch(Api.baseUrl, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                solicitante: this.state.solicitante,
                data: this.state.data,
                aberto: this.state.aberto,
                solicitacao: this.state.solicitacao
            })
        })
            .then(response => response.json())
            .then(item => {
                if (Array.isArray(item)) {
                    this.props.addItemToState(item[0])
                    this.props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log(err))
    }

    submitFormEdit = e => {
        e.preventDefault()
        fetch(Api.baseUrl, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                solicitante: this.state.solicitante,
                data: this.state.data,
                aberto: this.state.aberto,
                solicitacao: this.state.solicitacao
            })
        })
            .then(response => response.json())
            .then(item => {
                if (Array.isArray(item)) {
                    // console.log(item[0])
                    this.props.updateState(item[0])
                    this.props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.item) {
            const { id, solicitante, data, aberto, solicitacao } = this.props.item
            this.setState({ id, solicitante, data, aberto, solicitacao })
        }
    }

    render() {
        return (
            <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="solicitante">Solicitante</Label>
                    <Input type="text" maxLength="255" name="solicitante" id="solicitante" onChange={this.onChange} value={this.state.first === null ? '' : this.state.first} />
                </FormGroup>
                <FormGroup>
                    <Label for="data">Data</Label>
                    <Input type="text" name="data" id="data" onChange={this.onChange} value={this.state.last === null ? '' : this.state.last} />
                </FormGroup>
                <FormGroup>
                    <Label for="aberto">Aberto</Label>
                    <Input type="text" name="aberto" id="aberto" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email} />
                </FormGroup>
                <FormGroup>
                    <Label for="solicitacao">Solicitação</Label>
                    <Input type="textarea" maxLength="1000" name="solicitacao" id="solicitacao" onChange={this.onChange} value={this.state.phone === null ? '' : this.state.phone} />
                </FormGroup>

                <Button outline color="success">Salvar</Button>
            </Form>
        );
    }
}

export default AddEditForm