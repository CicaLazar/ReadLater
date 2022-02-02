import React, { Component } from 'react';
import { Navigation } from '../../components';
import { MyRouter } from '../../routes';
import { Footer } from '../Footer/Footer';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export class Layout extends Component {
    render() {
        return (
            <div>
                <ToastContainer />
                <Navigation />
                <MyRouter />
                <Footer />
            </div>
        );
    }
}

