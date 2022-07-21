/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {

  apiLink = environment.baseAPIURL;

  postTopic = "Government has release new pension";
  posterImage: string = "../assets/images/images.jpg";
  posterName: string = "Jone Doe";
  postTime: string = "4:45pm";
  reactions: any = {likes: 451, commentNo: 40};

  isNewPost: boolean = false;
  isTopicList: boolean = true;
  isPostDetail: boolean = false;


  constructor(
    private http: HttpClient,
    private ref: ChangeDetectorRef,
    private router: Router,
  ) { }

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

  // getForumData() {
  //   this.http.post(this.apiLink, {params : {id : 1}}).subscribe({
  //     next: (data) => {
  //       console.log('forum data', data);
  //     },
  //     error: data => {
  //       console.log('error', data);
  //     }
  //   });
  // }


  memoryData: any = sessionStorage.getItem('userData');

  verifyLogin(){
    if (this.memoryData == undefined || this.memoryData == null ) {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 500);
    } else {
      
      
    }
  }
  
  ngOnInit() {
    this.verifyLogin();
    // this.getForumData();
  }

}
