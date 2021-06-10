import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export default class Error extends Component {
    
    render() {
        const style={
            padding: '20px'
        };
        return (
            <React.Fragment>
                <h1>404 Page</h1>
                <span style={style}><Link to="/">Go to Home page</Link></span>
            </React.Fragment>
        )
    }
}
