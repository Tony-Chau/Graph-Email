import React, { Component } from 'react';
import FormInput from './widgets/formInput';
import $ from 'jquery';

import './css/mail.css';

export default class Mail extends Component {
    constructor(props){
        super(props);
        this.updateChange = this.updateChange.bind(this);
        this.resetData = this.resetData.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    state = {
        SenderName: "Tanj",
        SenderEmail: "tan@po.com",
        Subject: "Yes",
        ReceiverName: "Yan",
        ReceiverEmail: "yan@io.com",
        Message: "This is some message I have no idea what to write about"
    };

    submitHandler(event){
        let submit = $("#sub");
        submit.disabled = true;
        // API stuff
        event.preventDefault();
        const target = event.target;
        console.log(target);

        try{

        }catch{

        }

        submit.disabled = false;
    }

    updateChange(event, state) {
        switch (state){
            case "SenderName":
                this.setState({SenderName: event.target.value}); 
                break;
            case "SenderEmail": 
                this.setState({SenderEmail: event.target.value});
                break;
            case "Subject": 
                this.setState({Subject: event.target.value});
                break;
            case "ReceiverName":
                this.setState({ReceiverName: event.target.value});
                break;
            case "ReceiverEmail": 
                this.setState({ReceiverEmail: event.target.value});
                break;
            case "Message": 
                this.setState({Message: event.target.value});
                break;
            default:
                break;
        }
    }

    resetData(){
        this.setState({
            SenderName: "", 
            SenderEmail: "",
            Subject: "",
            ReceiverName: "",
            ReceiverEmail: "",
            Message: ""
        });
    }

    render() {
        const buttonStyle = {
            margin:'10px',
            color: 'white'
        }
        return (
            <React.Fragment>
                <h3>Mail Form</h3>
                <p>Fill up the details and get ready to submit your email</p>
                <form action="/mail" className="mailForm container" method="post" onSubmit={this.submitHandler}>
                    {/* Email Details */}
                    <section className="row">
                        <div className="col">
                            <span className="title">Sender</span>
                            <FormInput name="SenderName" type="text" labelFor="Sender's Name" label="Name" required="required" change={this.updateChange} value={this.state.SenderName} placeholder="Enter Name"/>
                            <FormInput name="SenderEmail" type="email" labelFor="Sender's Email" label="Email" required="required" change={this.updateChange} value={this.state.SenderEmail} placeholder="Enter Email"/>
                        </div>
                        <div className="col">
                            <span className="title">Receiver</span>
                            <FormInput name="ReceiverName" type="text" labelFor="Receiver's Name" label="Name" required="required" change={this.updateChange} value={this.state.ReceiverName} placeholder="Enter Name"/>
                            <FormInput name="ReceiverEmail" type="email" labelFor="Receiver's Email" label="Email" required="required" change={this.updateChange} value={this.state.ReceiverEmail} placeholder="Enter Email"/>
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
