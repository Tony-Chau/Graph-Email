import React, { Component } from 'react'
import axios from 'axios';

export default class Record extends Component {
    constructor(){
        super();
        this.emailChange = this.emailChange.bind(this);
        this.pageRender = this.pageRender.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
    }
    state = {
        isLoaded: false,
        items : [],
        error: false,
        searchResult: []
    };

    componentDidMount(){
        var self = this;
        const apiTest = "https://localhost:44337/api/Email";
        axios.get(apiTest)
            .then(function(res){
                self.setState({
                    isLoaded: true,
                    items : res.data,
                    searchResult: res.data                
                });
            })
            .catch(function (error){
                self.setState({
                    error: error,
                    isLoaded: true
                });
            });   
    }

    emailChange(event){
        const search = event.target.value;
        if (search === ""){
            this.setState({searchResult: this.state.items});
        }else{
            let list = this.state.items.filter(({email}) =>
                email.toLowerCase().includes(search.toLowerCase())   
            );
            this.setState({searchResult: list});
        }
    }

    handleIconClick(event){
        console.log(event);
    }

    pageRender(){
        return (
            <React.Fragment>
                <div className="form-group row">
                    <label className="col-sm-4 col-md-4" htmlFor="email" >Search your message</label>
                    <input className="form-control col-sm-8 col-md-8" id="email" placeholder="Enter email" id="email" onChange={this.emailChange}/>
                </div>
                {this.state.searchResult.length <= 0 ? <p>The result is empty</p> :     
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col">Name</th>
                                <th className="col">Email</th>
                                <th className="col">Subject</th>
                                <th className="col">Message</th>
                                <th className="col">View Graph</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.searchResult.map((item) => 
                                <tr key={item.id}>
                                    <th scope="row">{item.name}</th>
                                    <th>{item.email}</th>
                                    <th>{item.subject}</th>
                                    <th>{item.message}</th>
                                    <th className="image-icon"><i data-id={item.id} onClick={this.handleIconClick} class="material-icons">&#xe3b6;</i></th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                }

            </React.Fragment>
        )
    }



    render() {
        const {error, isLoaded, searchResult } = this.state;
        var page = this.pageRender();
        // if (isLoaded){
        //     page = <p>Please wait...</p>
        // }else{
        //     if (error){
        //         page = <p>There is an error on this page. Please try again later</p>
        //     }else{
        //         if (searchResult.length > 0){
        //             page = this.pageRender();
        //         }else{
        //             page = <p>There is no result</p>
        //         }
        //     }
        // }
        
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
