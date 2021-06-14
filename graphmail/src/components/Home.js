import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// CSS
import Nav from './Nav';
import Record from './Record';
import Mail from './Mail';
import Footer from './Footer';
import Error from './Error';


export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Nav/>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route path="/record" component={Record}/>
                            <Route path="/mail" component={Mail}/>
                            <Route path="*" component={Error}/>
                        </Switch>
                    </div>
                </Router>
                <Footer/>
            </React.Fragment>
        )
    }
}


const HomePage = () => (
    <React.Fragment>
        <h1>Home Page</h1>
        <div>
            <p>This website will allow you to send graphs to anyone via email. Please <Link to="/mail">click here to try it out</Link></p>
        </div>
    </React.Fragment>
);

