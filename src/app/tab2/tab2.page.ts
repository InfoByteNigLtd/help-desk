import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @Input() deltaState:string = "./assets/images/DeltaState.png";
  @Input() help:string = "assets/images/images.jpg";
  constructor() {}

}
