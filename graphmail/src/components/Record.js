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
                items : res.data,
                searchResult: res.data                
            });
        }).catch(function (error){
            self.setState({
                error: error
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
        console.log(image);
         $('#image').attr("src", `data:image/png;base64,${image.image}`);
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
                <div id="imagePreview" className="modal" onClick={this.handleClose}>
                    <span className="close" onClick={this.handleClose}>&times;</span>
                    <img className="modalContent" id="image" alt="graph"/>
                </div>

            </React.Fragment>
        )
    }

    render() {
        var {error} = this.state;
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
