/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit, Input, SimpleChange, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() legend: string = '';
  @Input() classType: string = '';
  @Input() inputType: string = 'default';
  @Input() name: string = '';
  @Input() label: string = '';
  @Output() value: EventEmitter<any> = new EventEmitter();
  @Input() id: string = '';
  @Input() bgColor: string = 'inherit';
  @Input() icon: string = '';
  @Input() color: string = 'inherit';
  @Input() sx: string = `background-color:${this.bgColor}; color:${this.color};`;

  valu: string = '0';

  inputTypeClass = `input-container top-space ${this.inputType} `;
  
  constructor() { }

  inputVal(event) {
    this.valu = event.target.value;
    this.value.emit(event.target.value);    
  }
  /** 
   * @method ngOnChanges is used here to enable passing of value from parent components to the button components
   * It enable the @var @inputs and @var inputTypeClass to recieve new value from parent component
   */
   ngOnChanges(changes: SimpleChange) {
    let newVal;
    if(changes['inputType'] !== undefined)
    {
      this.inputType = changes['inputType'].currentValue;
      this.inputTypeClass = `input-container top-space ${this.inputType} `;
    }
    if(changes['icon'] !== undefined)
    {
      this.icon = changes['icon'].currentValue;
    }
    if(changes['bgColor'] !== undefined)
    {
      newVal = changes['bgColor'].currentValue;
      this.bgColor = `${newVal} `;
      this.sx = `background-color:${this.bgColor}; color:${this.color};`;
    }
    if(changes['color'] !== undefined)
    {
      newVal = changes['color'].currentValue;
      this.color = `${newVal} `;
      this.sx = `background-color:${this.bgColor}; color:${this.color};`;
    }
    if(changes['sx'] !== undefined)
    {
      newVal = changes['sx'].currentValue;
      this.sx = `${newVal} `;
    }
  }




  ngOnInit() {}

}
