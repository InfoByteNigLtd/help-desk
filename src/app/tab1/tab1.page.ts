import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @Input() deltaState:string = "./assets/images/DeltaState.png";
  @Input() help:string = "./assets/images/images.jpg";

  constructor() {}

}
