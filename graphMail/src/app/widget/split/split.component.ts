import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.css']
})
export class SplitComponent implements OnInit {
  margin = "";

  @Input() angle: string;
  @Input() size: number;

  constructor() { }

  ngOnInit(): void {
    switch (this.angle){
      case "horizontal":
        this.margin=`margin:${this.size}px 0px`;
        break;
      case "vertical":
        this.margin=`margin:0px ${this.size}px`;
        break;
      default:
        this.margin=`margin:${this.size}px ${this.size}px`;
        break;
    }
    console.log(this.angle, this.size, this.margin);
  }

}
