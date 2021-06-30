import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand lg navbar-light bg-light">
                <div className="container">
                    <ul className="navbar-nav d-flex justify-content-between w-100">
                        <li>
                            <Link to="/"><h5>Graph Mail</h5></Link>
                        </li>
                        <li>
                            <div className="w-100">
                                <ul className="d-flex justify-content-between w-100">
                                    <li>
                                        <Link to="/record"><span>Record</span></Link>
                                    </li>
                                    <li>
                                        <Link to="/mail"><span>Mail</span></Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
