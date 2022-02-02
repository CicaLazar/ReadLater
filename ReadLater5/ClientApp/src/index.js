import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.css';

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    MOUNT_NODE);