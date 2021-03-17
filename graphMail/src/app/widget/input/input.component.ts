import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'inputform',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() type: string;
  @Input() value: any;
  @Input() pattern?: string;
  @Input() id: string;
  @Input() min?: number;
  @Input() max?: number;

  @Output() returnValue: any;

  isTextArea= false;
  constructor() { }

  ngOnInit(): void {
    console.log(this.label, this.type, this.value, this.id);
    this.isTextArea = this.type == "textarea";
  }

  getValue(){
    return {
      name: this.label,
      value: this.value
    }
  }

}
