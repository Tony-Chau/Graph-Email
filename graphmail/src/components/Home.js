import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Pages
import Nav from './Nav';
import Record from './Record';
import Mail from './Mail';
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
            </React.Fragment>
        )
    }
}


const HomePage = () => {
    const items = [
        {id:0, name: "React", link: "https://reactjs.org/"},
        {id:1, name: "Axios", link: "https://axios-http.com/docs/intro"},
        {id:2, name: "ApexCharts", link: "https://apexcharts.com/"},
        {id:3, name: "html2canvas", link: "https://html2canvas.hertzen.com/"},
        {id:4, name: "Microsoft Web APIs (.NET core 5.0)", link: "https://dotnet.microsoft.com/apps/aspnet/apis"},
        {id:5, name: "Bootstrap", link: "https://getbootstrap.com/"},
        {id:6, name: "Jquery", link: "https://jquery.com/"},
    ]
return(
    <React.Fragment>
        <h1>Home Page</h1>
        <div>
            <p>This website will allow you to send graphs to anyone via email. Please <Link to="/mail">click here to try it out</Link></p>
            <p>Here are the following libraries/framework that were used to make this project possible</p>
            <ul>
                {items.map((item) =>
                    <li key={item.id}><a href={item.link} target="_blank" rel="noreferrer">{item.name}</a></li>
                )}
            </ul>
        </div>
    </React.Fragment>
)};

