import React, { Component } from 'react'
import axios from 'axios';

export default class Record extends Component {
    constructor(props){
        super(props);
    }
    state = {
        isLoaded: false,
        items : [],
        error: null
    };

    componentDidMount(){
        var self = this;
        const apiTest = "https://localhost:44337/api/Email";
        axios.get(apiTest)
            .then(function(res){
                self.setState({
                    isLoaded: true,
                    items : res                
                });
                console.log(res);
            })
            .catch(function (error){
                self.setState({
                    error: error,
                    isLoaded: true
                });
            });
        
    }

    pageRender(){
        return <p>Yes</p>;
    }



    render() {
        const {error, isLoaded, items } = this.state;
        var page;
        if (isLoaded){
            page = <p>Please wait...</p>
        }
        if (Array.isArray(items) || error){
            page = <p>There is no available records to show</p>
        }else{
            page = this.pageRender();
        }
        
        
        return (
            <React.Fragment>
                <h1>Record Page</h1>
                <div className="container">
                    {page}
                </div>
            </React.Fragment>
        )
    }
}
