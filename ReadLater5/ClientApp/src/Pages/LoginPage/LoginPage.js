import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../store/actions';
import { history } from '../../helpers';
import { GoogleLogin } from 'react-google-login';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            rememberMe: false,
            submitted: false
        };
        this.shouldRedirectToHome();
    }

    shouldRedirectToHome = () => {
        if (this.props.location && this.props.location.pathname === '/login' && this.props.loggedIn) {
            history.push('/');
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleChecked = (e) => {
        this.setState({ rememberMe: !this.state.rememberMe });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password, rememberMe } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password, rememberMe));
        }
    }

    responseGoogle = (response) => {
        const { dispatch } = this.props;
        dispatch(userActions.googleLogin(response.tokenId));
    }

    render() {
        const { loggingIn } = this.props;
        const { email, password, rememberMe, submitted } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center align-items-center vh-100">
                        <div className="col-6">
                            <h2>Login</h2>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                                    {
                                        submitted && !email &&
                                        <div className="help-block">Email is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                    {submitted && !password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className={'form-group remember-me ' + (submitted && !rememberMe ? ' has-error' : '')}>
                                    <input type="checkbox" className="form-check-input" name="rememberMe" onChange={this.handleChecked} />
                                    <label className="form-check-label" htmlFor="rememberMe"> Remember me</label>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Login</button>
                                    <GoogleLogin
                                        clientId="657663263685-6rl2ljau8beb7qmnbb4s13poqr1kanmu.apps.googleusercontent.com"
                                        buttonText="Google"
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.responseGoogle}
                                        cookiePolicy={'single_host_origin'}/>
                                    {
                                        loggingIn &&
                                        <img alt="test" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, loggedIn } = state.authentication;
    return {
        loggingIn,
        loggedIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };