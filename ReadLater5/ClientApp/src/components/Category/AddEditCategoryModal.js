import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { categoryActions } from '../../store/actions'

export class AddEditCategoryModal extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        category: { name: "" }
    };

    componentDidMount() {
        this.setState({
            category: this.props.category
        })
    }

    save = () => {
        const { dispatch, confirm, category } = this.props;
        if (category.id != null) {
            dispatch(categoryActions.editCategory(this.state.category));
        }
        else {
            dispatch(categoryActions.addCategory(this.state.category));
        }
        confirm();
    }

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({
            category: {
                ...this.state.category,
                [name]: value
            }
        })
    };

    render() {
        const { cancel, title, category, disabled } = this.props;

        return (category ?
            <>
                <Modal.Header>
                    <h5 className="text-center">
                        <strong>{title}</strong>
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.category.name}
                            name="name"
                            onChange={this.handleChange}
                            readOnly={disabled}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="btn btn-outline-grey" onClick={cancel}>Cancel</Button>
                    {!disabled && <Button className="btn btn-green" onClick={this.save}>Confirm</Button>}
                </Modal.Footer>
            </>
            : null);
    }
}