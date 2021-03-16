import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'inputform',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() type: string;
  @Input() value: any;
  @Input() pattern: string;

  isTextArea= false;
  constructor() { }

  ngOnInit(): void {
    this.isTextArea = this.type == "textarea";
  }

}
