import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { store } from '../store/store';
import { Layout } from '../components';
import './App.css';
import httpService from '../helpers/interceptors';
import { history } from '../helpers';

export class App extends Component {
    constructor(props) {
        super(props);

        httpService.setupInterceptors(store, history);
    }

    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <div>
                        <Layout />
                    </div>
                </Router>
            </div>
        );
    }
}