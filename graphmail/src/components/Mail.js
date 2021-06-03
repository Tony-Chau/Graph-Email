import React, { Component } from 'react';
import formInput from './widgets/formInput';

export default class Mail extends Component {
    constructor(){
        super();
    }

    state = {
        SenderName: "",
        SenderEmail: "",
        Subject: "",

    };

    render() {
        return (
            <React.Fragment>
                <h1>Mail Form</h1>
                <form action="/mail" method="post">
                    <div>
                        <formInput name="SenderName" value="" type="text" labelFor="Sender's Name" label="SenderName"/>
                        <formInput name="SenderEmail" value="" type="email" labelFor="Sender's Email" label="SenderEmail"/>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}
