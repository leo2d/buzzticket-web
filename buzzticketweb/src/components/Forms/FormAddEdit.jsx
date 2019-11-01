import React from 'react';
import { Button, Form, FormGroup, Label, Input, InputGroupText } from 'reactstrap';
import Api from '../../Api';


class AddEditForm extends React.Component {
    state = {
        id: '',
        solicitante: '',
        data: null,
        aberto: true,
        solicitacao: '',
    }



    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onCheck = e => {
        this.setState({ [e.target.name]: e.target.checked })
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
                data: this.state.data || this.formatarData(new Date()),
                aberto: this.state.aberto,
                solicitacao: this.state.solicitacao
            })
        })
            .then(response => response.text())
            .then(item => {
                this.props.reloadGrid(false);
                this.props.toggle();

                //let ticket = this.state;
                //this.props.addItemToState(ticket);
                // this.props.toggle();
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
            .then(response => response.text())
            .then(item => {

                this.props.reloadGrid(false);
                this.props.toggle();
                //this.props.updateState(this.state);
                // .then(item => {
                //     if (Array.isArray(item)) {
                //         this.props.updateState(item[0])
                //         this.props.toggle()
                //     } else {
                //         console.log('failure')
                //     }
            })
            .catch(err => console.log(`error: ${err}`))
    }

    formatarData(data) {

        let mes = (data.getMonth() + 1);
        mes = mes < 10 ? `0${mes}` : mes;

        let dia = data.getDate();
        dia = dia < 10 ? `0${dia}` : dia;

        data = `${data.getFullYear()}-${mes}-${dia}`;

        return data;
    }

    componentDidMount() {

        let date = this.formatarData(new Date());

        if (this.props.item) {
            const { id, solicitante, data, aberto, solicitacao } = this.props.item
            this.setState({ id, solicitante, data, aberto, solicitacao })

            date = this.formatarData(new Date(this.props.item.data));
        }

        this.setState({ data: date });
    }

    render() {
        return (
            <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="solicitante">Solicitante</Label>
                    <Input type="text" maxLength="255" name="solicitante" id="solicitante" onChange={this.onChange} value={this.state.solicitante === null ? '' : this.state.solicitante} />
                </FormGroup>
                <FormGroup>
                    <Label for="data">Data</Label>
                    <Input type="date" name="data" id="data" disabled={this.state.id === ''} onChange={this.onChange} value={this.state.data} max={this.formatarData(new Date())} />
                </FormGroup>
                <FormGroup>
                    <Label for="aberto">Aberto</Label>
                    <InputGroupText>
                        <Input addon type="checkbox" disabled={this.state.id === ''} placeholder="Aberto" name="aberto" id="aberto" onChange={this.onCheck} checked={this.state.aberto === null ? false : this.state.aberto} />
                    </InputGroupText>
                </FormGroup>
                <FormGroup>
                    <Label for="solicitacao">Solicitação</Label>
                    <Input type="textarea" maxLength="1000" name="solicitacao" id="solicitacao" onChange={this.onChange} value={this.state.solicitacao === null ? '' : this.state.solicitacao} />
                </FormGroup>

                <Button outline color="success">Salvar</Button>
            </Form>
        );
    }
}

export default AddEditForm