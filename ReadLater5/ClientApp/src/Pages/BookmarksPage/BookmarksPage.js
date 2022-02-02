import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bookmarkActions } from '../../store/actions';
import { ConfirmModal } from '../../components/shared'
import { AddEditBookmarkModal } from '../../components'
import { Button, Modal } from 'react-bootstrap';

class BookmarksPage extends Component {
    state = {
        id: null,
        bookmark: {},
        showConfirmModal: false,
        showAddEditModal: false,
        disabled: false
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(bookmarkActions.getAll());
    }

    deleteBookmark = () => {
        const { dispatch } = this.props;
        dispatch(bookmarkActions.deleteBookmark(this.state.id));
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
            bookmarkActions.getById(id).then(x => {
                this.setState({ bookmark: x, showAddEditModal: true, id: id });
            });
        } else {
            this.setState({ bookmark: { name: "" }, showAddEditModal: true, id: id });
        }
    }

    closeAddEditModal = () => {
        this.setState({ showAddEditModal: false, id: null, disabled: false });
    }

    render() {
        const { bookmarks } = this.props;

        const confirmModal =
            this.state.showConfirmModal ? (
                <Modal show={this.state.showConfirmModal}>
                    <ConfirmModal
                        cancel={this.closeConfirm}
                        confirm={this.deleteBookmark}
                        title="Are you sure you want to delete this bookmark?"
                    />
                </Modal>
            ) : null;

        const addEditModal =
            this.state.showAddEditModal ? (
                <Modal show={this.state.showAddEditModal}>
                    <AddEditBookmarkModal
                        cancel={this.closeAddEditModal}
                        confirm={this.closeAddEditModal}
                        title={this.state.disabled ? "Details" : this.state.id ? "Edit" : "Add"}
                        bookmark={this.state.bookmark}
                        id={this.state.id}
                        disabled={this.state.disabled}
                    />
                </Modal>
            ) : null;

        return (
            <div className="container">
                <main role="main" className="pb-3">
                    <h2>Bookmarks<Button className="btn btn-primary float-right" onClick={() => this.openModalAddEdit()}>Add</Button></h2>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Url</th>
                                <th>Short Description</th>
                                <th>Category</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>{
                            bookmarks && bookmarks.map(x => (
                                <tr key={x.id}>
                                    <td>
                                        {x.url}
                                    </td>
                                    <td>
                                        {x.shortDescription}
                                    </td>
                                    <td>
                                        {x.category?.name}
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
    const { bookmarks, loading } = state.bookmark;
    return {
        bookmarks,
        loading
    };
}

const connectedBookmarks = connect(mapStateToProps)(BookmarksPage);
export { connectedBookmarks as BookmarksPage };
