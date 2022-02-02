import React, { Component } from 'react';
import { connect } from 'react-redux';
import { categoryActions } from '../../store/actions';
import { ConfirmModal } from '../../components/shared'
import { AddEditCategoryModal } from '../../components'
import { Button, Modal } from 'react-bootstrap';

class CategoriesPage extends Component {
    state = {
        id: null,
        category: {},
        showConfirmModal: false,
        showAddEditModal: false,
        disabled: false
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(categoryActions.getAll());
    }

    deleteCategory = () => {
        const { dispatch } = this.props;
        dispatch(categoryActions.deleteCategory(this.state.id));
        this.closeConfirm();
    }

    openModalDelete(id) {
        this.setState({ showConfirmModal: true, id: id });
    }

    closeConfirm = () => {
        this.setState({ showConfirmModal: false, id: null });
    }

    openModalAddEdit(id) {
        if (id) {
            categoryActions.getById(id).then(x => {
                this.setState({ category: x, showAddEditModal: true, id: id });
            });
        } else {
            this.setState({ category: { name: "" }, showAddEditModal: true, id: id });
        }
    }

    closeAddEditModal = () => {
        this.setState({ showAddEditModal: false, id: null, disabled: false });
    }

    render() {
        const { categories, dispatch } = this.props;

        const confirmModal =
            this.state.showConfirmModal ? (
                <Modal show={this.state.showConfirmModal}>
                    <ConfirmModal
                        cancel={this.closeConfirm}
                        confirm={this.deleteCategory}
                        title="Are you sure you want to delete this category?"
                    />
                </Modal>
            ) : null;

        const addEditModal =
            this.state.showAddEditModal ? (
                <Modal show={this.state.showAddEditModal}>
                    <AddEditCategoryModal
                        cancel={this.closeAddEditModal}
                        confirm={this.closeAddEditModal}
                        title={this.state.disabled ? "Details" : this.state.id ? "Edit" : "Add"}
                        category={this.state.category}
                        id={this.state.id}
                        dispatch={dispatch}
                        disabled={this.state.disabled}
                    />
                </Modal>
            ) : null;

        return (
            <div className="container">
                <main role="main" className="pb-3">
                    <h2>Categories<Button className="btn btn-primary float-right" onClick={() => this.openModalAddEdit()}>Add</Button></h2>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>{
                            categories && categories.map(x => (
                                <tr key={x.id}>
                                    <td>
                                        {x.name}
                                    </td>
                                    <td>
                                        <Button className="btn btn-danger btn-sm float-right" onClick={() => this.openModalDelete(x.id)}>Delete</Button>
                                        <Button className="btn btn-primary btn-sm float-right" onClick={() => this.openModalAddEdit(x.id)}>Edit</Button>
                                        <Button className="btn btn-light btn-sm float-right" onClick={() => {
                                            this.setState({ disabled: true });
                                            this.openModalAddEdit(x.id)
                                        }}>Details</Button>
                                    </td>
                                </tr>)
                            )
                        }
                        </tbody>
                    </table>
                </main>
                {confirmModal}
                {addEditModal}
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { categories, loading } = state.category;
    return {
        categories,
        loading
    };
}

const connectedCategories = connect(mapStateToProps)(CategoriesPage);
export { connectedCategories as CategoriesPage };
