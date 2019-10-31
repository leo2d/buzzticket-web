import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'
import Api from '../../Api';


class DataTable extends Component {

    deleteItem = id => {
        let confirmDelete = window.confirm('Deseja realmente excluir?')
        if (confirmDelete) {
            fetch(`${Api.baseUrl}?id=${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            })
                .then(response => response.text())
                .then(item => {
                    this.props.deleteItemFromState(id);
                })
                .catch(err => console.log(err))
        }

    }

    formatarDataExibicao(date) {
        let data = new Date(Date.parse(date));

        let mes = (data.getMonth() + 1);
        mes = mes < 10 ? `0${mes}` : mes;

        let dia = data.getUTCDate();
        dia = dia < 10 ? `0${dia}` : dia;

        data = `${dia}/${mes}/${data.getFullYear()}`;

        return data;
    }

    render() {

        const items = this.props.items.map(item => {

            let data = this.formatarDataExibicao(item.data);

            this.props.items.forEach((item, index) => item.num = index + 1);

            return (
                <tr key={item.id}>
                    {/* <th scope="row">{item.id}</th> */}
                    <td>{item.num}</td>
                    <td>{item.solicitante}</td>
                    <td>{data}</td>
                    <td>{item.aberto ? 'Aberto' : 'Fechado'}</td>
                    <td>{item.solicitacao}</td>
                    <td>
                        <div style={{ width: "200px" }}>
                            <ModalForm buttonLabel="Editar" item={item} updateState={this.props.updateState}
                                reloadGrid={this.props.reloadGrid} />
                            {' '}
                            <Button outline color="danger" size="sm" onClick={() => this.deleteItem(item.id)} >Excluir</Button>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>-</th>
                        <th>Solicitante</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Solicitação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table>
        )
    }
}

export default DataTable