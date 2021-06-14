import React, { Component } from 'react';
import FormInput from './widgets/formInput';
import $ from 'jquery';
import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default class Mail extends Component {
    constructor(props){
        super(props);
        this.updateChange = this.updateChange.bind(this);
        this.resetData = this.resetData.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    state = {
        Subject: "Yes",
        Name: "Yan",
        Email: "tonychau923@gmail.com",
        Message: "This is some message I have no idea what to write about"
    };

    submitHandler(event){
        var self = this;
        var result;
        let submit = $("#sub");
        submit.disabled = true;
        // API stuff
        event.preventDefault();
        const target = event.target;

        axios.post('https://localhost:44337/api/Email/SendMail', {
                Name: self.state.Name,
                Email: self.state.Email,
                Subject: self.state.Subject,
                Message: self.state.Message
        })
        .then(function (response){
            alert("Email Sent");
            result = true;
        })
        .catch(function (error){
            alert(error);
            result = false;
        })
        
        submit.disabled = false;
        return result;
    }

    updateChange(event, state) {
        var val = event.target.value;
        switch (state){
            case "Subject": 
                this.setState({Subject: val});
                break;
            case "Name":
                this.setState({Name: val});
                break;
            case "Email": 
                this.setState({Email: val});
                break;
            case "Message": 
                this.setState({Message: val});
                break;
            default:
                break;
        }
    }

    resetData(){
        this.setState({
            Subject: "",
            ReceiverName: "",
            ReceiverEmail: "",
            Message: "",
            MessageSent: false
        });
    }

    render() {
        const buttonStyle = {
            margin:'10px',
            color: '#fff'
        }
        return (
            <React.Fragment>
                <h3>Mail Form</h3>
                <p>Fill up the details and get ready to submit your email</p>
                <form action="/mail" className="mailForm container" method="post" onSubmit={this.submitHandler}>
                    {/* Email Details */}
                    <section className="">
                        <div>
                            <span className="title">Send To</span>
                            <FormInput name="Name" type="text" labelFor="Receiver's Name" label="Name" required="required" change={this.updateChange} value={this.state.Name} placeholder="Enter Name"/>
                            <FormInput name="Email" type="email" labelFor="Receiver's Email" label="Email" required="required" change={this.updateChange} value={this.state.Email} placeholder="Enter Email"/>
                        </div>
                    </section>
                    <br/>
                    {/* Mail */}
                    <section>
                        <span className="title">Mail Section</span>
                        <FormInput name="Subject" type="text" labelFor="Subject" label="Subject" required="optional" change={this.updateChange} value={this.state.Subject} placeholder="Enter Subject"/>
                        <FormInput name="Message" type="textarea" labelFor="message" label="Message" required="optional" change={this.updateChange} value={this.state.Message} placeholder="Write a message..."/>
                    </section>

                    {/* Graph */}
                    <section>
                        
                    </section>
                    
                    <br/>
                    <section className="d-flex justify-content-between">
                        <button className="btn btn-warning" onClick={this.resetData} style={buttonStyle}>Reset</button>
                        <button type="submit" className="btn btn-primary" id="sub" style={buttonStyle}>Submit</button>
                    </section>




                </form>
            </React.Fragment>
        )
    }
}
