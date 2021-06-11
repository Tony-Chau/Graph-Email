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
        const apiTest = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
        axios.get(apiTest)
            .then(function(res){
                this.setState({
                    isLoaded: true,
                    items : res.items
                });
            })
            .catch(function (error){
                this.setState({
                    error: error,
                    isLoaded: true
                });
            })
            .then(function(){
                console.log(this.state.items);
            });

    }



    render() {
        const {error, isLoaded, items } = this.state;
        var page;
        if (isLoaded){
            page = <p>Please wait...</p>
        }
        if (error){
            page = <p>{error.message}</p> 
        } 
        if (Array.isArray(items)){
            page = <p>There is no available records to show</p>
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
