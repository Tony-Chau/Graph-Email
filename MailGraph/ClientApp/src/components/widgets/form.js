import React, { Component } from 'react';

export class inputForm extends Component {

  state = {

  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form-group">
        <label>Yes</label>
        <input type={this.props.type} onChange={this.props.updateState}/>
      </div>
    );
  }
}
