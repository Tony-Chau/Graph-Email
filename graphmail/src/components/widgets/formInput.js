import React, { Component } from 'react'

export default class FormInput extends Component {

    constructor(props){
        super(props);
        this.input = this.input.bind(this);
        this.textArea = this.textArea.bind(this);
    }

    input(){
        return (
            <input 
            type={this.props.type} 
            className="form-control" 
            id={this.props.label} 
            value={this.props.value} 
            name={this.props.name} 
            pattern={this.props.pattern} 
            {...this.props.required !== 'optional' ? 'required' : ''}
            onChange={(e) => {this.props.change(e, this.props.name)}}
            placeholder={this.props.placeholder}/>
        );
    }

    textArea(){
        return (
            <textarea
            className="form-control" 
            id={this.props.label} 
            value={this.props.value} 
            name={this.props.name} 
            pattern={this.props.pattern} 
            {...this.props.required !== 'optional' ? 'required' : ''}
            onChange={(e) => {this.props.change(e, this.props.name)}}
            placeholder={this.props.placeholder}
            cols={this.props.cols}
            rows={this.props.rows}/>
        );
    }

    render() {
        let input = this.props.type === "textarea" ? this.textArea() : this.input();
        return (
            <div className="form-group">
                <label htmlFor={this.props.labelFor}>{this.props.label}</label>
                {input}
            </div>
        )
    }
}
