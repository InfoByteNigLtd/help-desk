/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {

  postTopic = "Government has release new pension";
  posterImage: string = "../assets/images/images.jpg";
  posterName: string = "Jone Doe";
  postTime: string = "4:45pm";
  reactions: any = {likes: 451, commentNo: 40};

  isNewPost: boolean = false;
  isTopicList: boolean = true;
  isPostDetail: boolean = false;


  constructor() { }

  swtichActivePage(page){
    if (page === 'new-post') {
      this.isNewPost = true;
      this.isTopicList = false;
      this.isPostDetail = false;
    }
    else if (page === 'post-detail') {
      this.isNewPost = false;
      this.isTopicList = false;
      this.isPostDetail = true;
    }
    else if (page === 'topic-list') {
      this.isNewPost = false;
      this.isTopicList = true;
      this.isPostDetail = false;
    }
  }

  closePage(){
    this.isNewPost = false;
    this.isPostDetail = false;
    this.isTopicList = true;
  }

  ngOnInit() {}

}
