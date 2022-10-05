import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  postTopic: string;
  postMessage: string;
  constructor() { }

  ngOnInit() {}

  getPostTopic(event) {
    this.postTopic = event.target.value;
  }

  getPostMessage(event) {
    this.postTopic = event.target.value;
  }

  submit() {
  }

}
