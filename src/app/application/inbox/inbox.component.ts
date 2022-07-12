/* eslint-disable @typescript-eslint/quotes */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
  apiLink = environment.baseAPIURL;

  postTopic = "Government has release new pension";
  posterImage: string = "../assets/images/images.jpg";
  posterName: string = "Jone Doe";
  postTime: string = "4:45pm";
  reactions: any = {likes: 451, commentNo: 40};

  isNewPost: boolean = false;
  isTopicList: boolean = true;
  isPostDetail: boolean = false;
  computerNo: any;
  id: any = 0;
  plusConversations: boolean = false;
  loadingScreen!: HTMLIonLoadingElement;

  private apiEndPoit2 = environment.supportAPI2;


  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  swtichActivePage(page){
    if (page === 'new-post') {
      this.isNewPost = true;
      this.isTopicList = false;
      this.isPostDetail = false;
      this.router.navigate(['/app/router/support'])
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

  getForumData() {
    this.http.post(this.apiLink, {params : {id : 1}}).subscribe({
      next: (data) => {
        console.log('inbox data', data);
      },
      error: data => {
        console.log('error', data);
      }
    });
  }

  memoryData: any = localStorage.getItem('userData');

test(){
  console.log('from support inbox', this.memoryData);
  
}

async loadingModal() {
  this.loadingScreen = await this.loadingCtrl.create({
    cssClass: "my-custom-class",
    message: "Sign-in...",
  });

  return await this.loadingScreen.present();
}

async alertModal(title: string, message: string) {
  const alert = await this.alertCtrl.create({
    cssClass: "my-custom-class",
    header: title,
    message: message,
    buttons: ["OK"],
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
}

get() {
  this.loadingModal();

  // this.http.post(`${this.apiEndPoit2}${this.email}/${this.password}`, { param: [] }).subscribe({
  this.http.get(`${this.apiEndPoit2}${this.computerNo}/${this.id}/${this.plusConversations}`, { }).subscribe({
    next: data => {
      console.log('sent successfully', data);
      // localStorage.setItem('userData', JSON.stringify(data));
      this.loadingScreen?.dismiss().then(() => { this.alertModal('Success!!!', 'message Succefully'); });
      this.router.navigate(['./app/router/dashboard']);
    },
    error: data => {
      console.log('something went wrong', data);
      setTimeout(() => {
        this.loadingScreen?.dismiss().then(() => { this.alertModal('Error!!!', 'Something went wrong'); });
      }, 1000);

    }
  });
}
  
  ngOnInit() {
    this.getForumData();
    this.test();
    // this.get()
  }
}
