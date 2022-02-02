import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../helpers';
import { userActions } from '../../store/actions';

class Navigation extends Component {
    
    handleLogout = () => {
        this.props.logOut();
        history.push('/login');
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">ReadLater5</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                {
                                    this.props.loggedIn &&
                                    <Link className="nav-link text-dark" to="/categories">Categories</Link>
                                }
                            </li>
                            <li className="nav-item">
                                {
                                    this.props.loggedIn &&
                                    <Link className="nav-link text-dark" to="/bookmarks">Bookmarks</Link>
                                }
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {
                                    !this.props.loggedIn &&
                                    <Link className="nav-link text-dark" to="/register">Register</Link>
                                }
                            </li>
                            <li className="nav-item">
                                {
                                    this.props.loggedIn &&
                                    <Link className="nav-link text-dark" onClick={this.handleLogout} to="/login">Logout</Link>
                                }
                            </li>
                            <li className="nav-item">
                                {
                                    !this.props.loggedIn &&
                                    <Link className="nav-link text-dark" to="/login">Login</Link>
                                }
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        );
    }
}


function mapStateToProps(state) {
    return {
        loggedIn: state.authentication.loggedIn,
    };
}

const mapDispatchToProps = dispatch => ({
    handlePopup: (value) => dispatch({ type: "MENU_OPEN", value }),
    logOut: () => dispatch(userActions.logout())
});

const connectedNavigation = connect(mapStateToProps, mapDispatchToProps)(Navigation);
export { connectedNavigation as Navigation }; 