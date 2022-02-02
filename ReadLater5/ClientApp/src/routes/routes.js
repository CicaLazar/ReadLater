import React, { Component } from "react";
import { Route } from "react-router-dom";
import { HomePage, CategoriesPage, LoginPage, RegisterPage, AboutPage, BookmarksPage } from '../Pages';

import { PrivateRoute } from '../components/shared';

export class MyRouter extends Component {
    render() {
        return (
            <div>
                <PrivateRoute exact path="/categories" component={CategoriesPage} />
                <PrivateRoute exact path="/bookmarks" component={BookmarksPage} />
                <Route exact path="/login" render={props => <LoginPage {...props} />} />
                <Route exact path="/register" render={props => <RegisterPage {...props} />} />
                <Route exact path="/home" render={props => <HomePage />} />
                <Route exact path="/about" render={props => <AboutPage />} />
            </div>
        );
    }
}