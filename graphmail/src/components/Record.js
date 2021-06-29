import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery';

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
        axios({
            method: "GET",
            url: "https://localhost:44337/api/Email", 
            header: {
                'Access-Control-Allow_origin': "*",
                'Content-type': 'application/json'
            }
        }).then(function(res){
            self.setState({
                isLoaded: true,
                items : res.data,
                searchResult: res.data                
            });
        }).catch(function (error){
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
        const image = this.state.searchResult.find(item => item.id === parseInt(event.target.dataset.id));
        // console.log(image);
        // $("#image").attr("src", "data:image/png;base64,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");
        // $('#image').attr("src", `data:image/png;base64,${image.image}`);
         $('#imagePreview').css("display", "block");
    }

    handleClose(event){
        if(!event.target.matches("#image")){
            $('#imagePreview').css("display", "none");
        }
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
                                    <th className="image-icon"><i data-id={item.id} onClick={(e) => this.handleIconClick(e)} className="material-icons">&#xe3b6;</i></th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                }
                <button className="btn btn-primary" onClick={this.handleIconClick}>Image Test</button>
                <div id="imagePreview" class="modal" onClick={this.handleClose}>
                    <span class="close" onClick={this.handleClose}>&times;</span>
                    <img class="modalContent" id="image" alt="graph"/>
                </div>

            </React.Fragment>
        )
    }

    render() {
        var {error, isLoaded, searchResult } = this.state;
        error = false;
        var page = this.pageRender();
        return (
            <React.Fragment>
                <h1>Record Page</h1>
                {error ? 
                    <p>An error has occured, please try again at a different time or just refresh the page.</p>
                    :
                    <div className="container">
                        {page}
                    </div>
                }

            </React.Fragment>
        )
    }
}
