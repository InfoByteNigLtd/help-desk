/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: 'faq.page.html',
  styleUrls: ['faq.page.scss']
})
export class FaqPageComponent implements OnInit {
  @Input() deltaState = "./assets/images/DeltaState.png";
  @Input() help = "assets/images/images.jpg";
  constructor() {}

  ngOnInit(): void {
    console.log('init');
  }
}
