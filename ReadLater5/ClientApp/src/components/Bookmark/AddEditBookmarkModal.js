import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { bookmarkActions } from '../../store/actions'
import { connect } from 'react-redux';
import { categoryActions } from '../../store/actions';

class AddEditBookmarkModal extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        bookmark: {
            name: "",
            url: "",
            shortDescription: "",
            categoryId: null
        }
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(categoryActions.getAll());

        this.setState({
            bookmark: this.props.bookmark,
        })

    }

    save = () => {
        const { dispatch, confirm, bookmark } = this.props;
        if (bookmark.id != null) {
            dispatch(bookmarkActions.editBookmark(this.state.bookmark));
        }
        else {
            dispatch(bookmarkActions.addBookmark(this.state.bookmark));
        }
        confirm();
    }

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({
            bookmark: {
                ...this.state.bookmark,
                [name]: value
            }
        })
    };

    convertToNumber = value => {
        let intValue = parseInt(value);
        if (!isNaN(intValue)) {
            return intValue;
        }

        return null;
    };

    onCategoryChange = e => {
        const { name, value } = e.target;
        const localValue = this.convertToNumber(value);
        this.setState({
            bookmark: {
                ...this.state.bookmark,
                [name]: localValue
            }
        })
    };

    render() {
        const { cancel, title, bookmark, disabled, categories } = this.props;

        return (bookmark ?
            <>
                <Modal.Header>
                    <h5 className="text-center">
                        <strong>{title}</strong>
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="name">Url</label>
                        <input type="url"
                            className="form-control"
                            value={this.state.bookmark.url}
                            name="url"
                            onChange={this.handleChange}
                            readOnly={disabled}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Short description</label>
                        <input type="shortDescription"
                            className="form-control"
                            value={this.state.bookmark.shortDescription}
                            name="shortDescription"
                            onChange={this.handleChange}
                            readOnly={disabled}
                        />
                    </div>

                    <div class="form-group">
                        <label for="categoriId">Category</label>
                        <select
                            class="form-control"
                            name="categoryId"
                            id="categoryId"
                            value={this.state.bookmark.categoryId}
                            onChange={e => this.onCategoryChange(e)}
                            readOnly={disabled}>
                                <option></option>
                                {
                                    categories && categories.map(x => (
                                        <option value={x.id} key={x.id}>
                                            {x.name}
                                        </option>
                                    ))
                                }
                        </select>
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

function mapStateToProps(state) {
    const { categories } = state.category;
    return {
        categories
    };
}

const addEditBookmarkModal = connect(mapStateToProps)(AddEditBookmarkModal);
export { addEditBookmarkModal as AddEditBookmarkModal };
