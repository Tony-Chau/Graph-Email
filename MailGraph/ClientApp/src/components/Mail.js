import React, { Component } from 'react';
import { inputForm } from './widgets/form';

import axios from 'axios';

export class Mail extends Component {
  constructor(props){
    super(props);
  }

  state = {
    Name: "",
    Sender: "",
    Email: "",
    Subject: "",
    Message: "",
    Data: null
  }   

  updateState(){

  }
  

    render () {
      return (
        <div className="container">
          <h2>Email Graph</h2> 
          <form>
            <inputForm type="text" name="fullName" updateState={this.updateState()}/>
          </form>
          
        </div>
      );
    }





    componentDidMount(){
      // axios.get("https://localhost:44326/test").then(response =>{
      //   this.setState({data: response.data});
      // });
    }

}