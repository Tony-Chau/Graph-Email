import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  form : IForm;

  constructor() { }

  ngOnInit(): void {
    this.form.sender = "";
    this.form.receiver = "";
  }

  addTag(event : any): void{
    console.log(event);
  }

}

interface IForm{
  sender: string,
  receiver: string,
  senderEmail: string,
  receiverEmail: string,
  subject: string,
  CC: string[], 
  body: string
}
