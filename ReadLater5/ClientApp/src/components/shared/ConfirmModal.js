import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export class ConfirmModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { cancel, confirm, title, id } = this.props;
        return (
            <>
                <Modal.Header>
                    <h5 className="text-center">
                        <strong>{title}</strong>
                    </h5>
                </Modal.Header>

                <Modal.Footer>
                    <Button className="btn btn-outline-grey" onClick={cancel}>Cancel</Button>
                    <Button className="btn btn-green" onClick={() => confirm(id)}>Confirm</Button>
                </Modal.Footer>
            </>
        );
    }
}
