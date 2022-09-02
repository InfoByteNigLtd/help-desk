/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {

  @Input() image: string = "../assets/images/images.jpg";
  @Input() message: string = "I like what am seeing";
  @Input() name: string = "Jone Doe";
  @Input() time: string = "4:45pm";
  posterImage = "../assets/images/images.jpg";

  reactions: any = {likes: 451, commentNo: 40};
  postComment = "I JUst like what you were saying sir. say anything you want and linke";


  postTopic: string = "How about pension for 2000";
  postMessage: string = 'Will they not pay us?';

  constructor() { }

  ngOnInit() {}

  getPostTopic(event) {
    this.postTopic = event.target.value;
    // console.log(event.target.value);
  }

  getPostMessage(event) {
    this.postTopic = event.target.value;
    // console.log(event.target.value);
  }

  submit() {
    // console.log('ented values', this.postTopic, this.postMessage);
  }

}
