/* eslint-disable @typescript-eslint/quotes */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
  @Input() logo = "./assets/images/coat-of-arm.png";


  constructor() { }

  ngOnInit() {}

}
