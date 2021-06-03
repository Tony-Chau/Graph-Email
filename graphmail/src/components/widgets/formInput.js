import React, { Component } from 'react'

export default class formInput extends Component {

    constructor(){
        super();
        if(this.props.required == ""){
            this.props.required = "optional";
        }
    }

    render() {
        return (
            <div className="form-group">
                <label for={this.props.labelFor}>{this.props.label}</label>
                <input 
                    type={this.props.type} 
                    className="form-control" 
                    id={this.props.labelFor} 
                    value={this.props.value} 
                    name={this.props.name} 
                    pattern={this.props.pattern} 
                    required={this.props.required}
                />
            </div>
        )
    }
}
