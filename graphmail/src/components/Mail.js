import React, { Component } from 'react';
import FormInput from './widgets/formInput';
import Graph from './widgets/graph';

import axios from 'axios';
import XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import $ from 'jquery';


export default class Mail extends Component {
    constructor(){
        super();
        this.updateChange = this.updateChange.bind(this);
        this.resetData = this.resetData.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.renderHeading = this.renderHeading.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    state = {
        Subject: "Yes",
        Name: "Yan",
        Email: "tonychau923@gmail.com",
        Message: "This is some message I have no idea what to write about",
        excelJson: null,
        xHeadingKey: "0",
        yHeadingKey: "0",
        headings: [],
        Title: "",
        image: null,
        Graphtype: 'bar'
    };

    submitHandler(event){
        var self = this;
        var sub = $('#sub');
        // sub.attr('disabled', true);
        // API stuff
        event.preventDefault();
        var graph = $("#Graph")[0];
        html2canvas(graph, {
                            letterRendering: 1,
                            allowTaint: true,
                            useCors: true,
                            x: graph.offsetLeft, 
                            y: window.pageYOffset + graph.offsetTop
                        }).then(function(canvas){
                                var base64 = canvas.toDataURL('image/png').replace("data:image/png;base64,", "");
                                axios({
                                    method: 'POST',
                                    url: 'https://localhost:44337/api/Email/SendMail',
                                    data:{
                                        Name: self.state.Name,
                                        Email: self.state.Email,
                                        Subject: self.state.Subject,
                                        Message: self.state.Message,
                                        Image: base64
                                    },
                                    header: {
                                        'Access-Control-Allow_origin': "*"
                                    }
                                }).then(function(resp){
                                    alert("Email Sent");
                                    // window.location.reload();
                                }).catch(function(err){
                                    alert(err);
                                    sub.attr('disabled', false);
                                });
                            });
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
            case "Title":
                this.setState({Title: val});
                break;
            case "x-Head":
                this.setState({xHeadingKey: val});
                break;
            case "y-Head":
                this.setState({yHeadingKey: val});
                break;
            case "Graphtype":
                this.setState({Graphtype: val});
                break;
            default: 
                console.log("Nothing was updated");
                break;
        }       
    }

    resetData(){
        this.setState({
            Subject: "",
            Name: "",
            Email: "",
            Message: "",
            MessageSent: false,
            excelJson: null,
            Headings: [],
            xHeadingKey: "0",
            yHeadingKey: "0",
            Title: "",
            image: null,
            Graphtype: 'bar'
        });
    }

    renderHeading(type){
        return (
            <div className="col-sm-6 col-md-6">
                <label htmlFor={type}>{type.toUpperCase()}-Heading</label>
                    <select className="form-select" id={type + "-heading"} defaultValue="0" onChange={(e) =>{this.updateChange(e, `${type}-Head`)}}>
                        <option defaultValue value={0} key="0" disabled>{type.toUpperCase()}-Heading</option>
                        {this.state.headings.map((item) =>
                            <option key={item.id} value={item.id}>{item.name}</option>
                        )}
                    </select>
            </div>
        );
    }

    handleUpload(event){
        if (event.target.files[0] === undefined){
            return;
        }
        const self = this;
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) =>{
            const workbook = XLSX.read(e.target.result, {type: 'buffer'});
            // We only care about the first sheet
            const sheets = workbook.Sheets[workbook.SheetNames[0]];
            // Converting Excel Data to Json
            const json = XLSX.utils.sheet_to_json((sheets), {
                raw: true
            });
            // Adding Json keys to headings
            var keyIndex = 1;
            var headings = [];
            for(var key in json[0]){
                headings[keyIndex - 1] = {
                    id: keyIndex,
                    name: key
                };
                keyIndex += 1;
            }
            self.setState({excelJson: json,
                            headings: headings,
                            xHeadingKey: "0",
                            yHeadingKey: "0"
                        });

        };
    }

    render() {
        return (
            <React.Fragment>
                <h3>Mail Form</h3>
                <p>Fill up the details and get ready to submit your email</p>
                <form action="/mail" className="mailForm container" method="post" onSubmit={this.submitHandler}>
                    {/* Email Details */}
                    <section>
                        <div>
                            <span className="title">Send To</span>
                            <FormInput name="Name" type="text" labelFor="Receiver's Name" label="Name" required="required" change={this.updateChange} value={this.state.Name} placeholder="Enter Name"/>
                            <FormInput name="Email" type="email" labelFor="Receiver's Email" label="Email" required="required" change={this.updateChange} value={this.state.Email} placeholder="Enter Email"/>
                        </div>
                    </section>
                    <br/>
                    {/* Mail */} 
                    <section>
                        <span className="title">Mail</span>
                        <FormInput name="Subject" type="text" labelFor="Subject" label="Subject" required="optional" change={this.updateChange} value={this.state.Subject} placeholder="Enter Subject"/>
                        <FormInput name="Message" type="textarea" labelFor="message" label="Message" required="optional" change={this.updateChange} value={this.state.Message} placeholder="Write a message..." rows="5"/>
                    </section>

                    {/* Graph */}
                    <br/>
                    <section>
                        <span className="title">Graph</span>
                        <div className="form-group">
                            <label htmlFor="file">Upload Graph</label>
                            <input className="form-control" type="file" id="file" name="excelFile" onChange={this.handleUpload} accept=".xlsx, .xls" value={this.state.excelFilePath}/>
                            <span>This only works for .xlsx or .xls file</span>
                        </div>
                        <br/><br/>
                        {this.state.excelJson == null ? "" : 
                            <React.Fragment>
                                <div className="form-group row">
                                    <FormInput name="Title" type="text" labelFor="Title" label="Graph Title" required="optional" change={this.updateChange} value={this.state.Title} placeholder="Add Graph Title (optional)"/>
                                    <div className="form-group">
                                        <label htmlFor="Gtype">Graph Type</label>
                                        <select className="form-control" id="Gtype" value={this.state.Graphtype} onChange={(e) =>{ this.updateChange(e, "Graphtype")}}>
                                            <option defaultValue value="bar">Bar</option>
                                            <option value="line">Line</option>
                                        </select>
                                    </div>
                                    {this.renderHeading("x")}
                                    {this.renderHeading("y")}
                                </div>
                                <div>
                                    {/* Graph Part image rendering */}
                                    { this.state.xHeadingKey !== "0" && this.state.yHeadingKey !== "0" ? 
                                        <Graph excelJson={this.state.excelJson} xHeadingKey={this.state.xHeadingKey} yHeadingKey={this.state.yHeadingKey} headings={this.state.headings} title={this.state.Title} type={this.state.Graphtype} height="500px" width="100%"/>
                                        : 
                                        <p>Please select both x and y headings to generate a graph</p>}
                                </div>
                            </React.Fragment>
                        }

                    </section>
                    <br/>
                    <section className="d-flex justify-content-between mail-button-set">
                        <button className="btn btn-warning" onClick={this.resetData}>Reset</button>
                        <button type="submit" className="btn btn-primary" id="sub">Submit</button>
                    </section>
                </form>
            </React.Fragment>
        )
    }
}
