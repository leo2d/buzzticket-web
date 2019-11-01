import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from '../Forms/FormAddEdit'

class ModalForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false
        }
    }

    toggle = (close = null) => {

        if (close != null && (typeof close === 'boolean')) {
            this.setState({
                modal: close
            })
        } else {
            this.setState(prevState => ({
                modal: !prevState.modal
            }))
        }
    }

    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

        const label = this.props.buttonLabel

        let button = ''
        let title = ''

        if (label === 'Editar') {
            button = <Button outline
                color="primary"
                size="sm"
                onClick={this.toggle}
                style={{ float: "left", marginRight: "10px" }}>{label}
            </Button>
            title = 'Editar Ticket'
        } else {
            button = <Button outline
                color="success"
                onClick={this.toggle}
                style={{ float: "left", marginRight: "10px" }}>{label}
            </Button>
            title = 'Criar Ticket'
        }


        return (
            <div>
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
                    <ModalBody>
                        <AddEditForm
                            reloadGrid={this.props.reloadGrid}
                            addItemToState={this.props.addItemToState}
                            updateState={this.props.updateState}
                            toggle={this.toggle}
                            item={this.props.item} />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default ModalForm