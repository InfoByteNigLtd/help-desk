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
  responseData: any = [];

  isNewPost: boolean = false;
  isTopicList: boolean = true;
  isPostDetail: boolean = false;


  computerNo: any;
  id: any = 0;
  plusConversations: boolean = false;
  loadingScreen!: HTMLIonLoadingElement;
  memoryData: any; 

  private apiEndPoit2 = environment.supportAPI;


  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) { 
    this.getUserData();
  }

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

  
  routeToInbox(computerNo, tkCatId, ticketId){
    if (computerNo !== undefined && tkCatId !== undefined) {
      this.isNewPost = true;
      this.isTopicList = false;
      this.isPostDetail = false;
      this.router.navigate(['/app/router/inbox-details', {computerNo: computerNo, tkCatId: tkCatId, ticketId: ticketId}])

      // this.router.navigate(['/app/router/support', {computerNo: computerNo, tkCatId: tkCatId}])
    }
   
  }
  closePage(){
    this.isNewPost = false;
    this.isPostDetail = false;
    this.isTopicList = true;
  }
  getUserData() {
    this.memoryData = JSON.parse(sessionStorage.getItem('userData'));
    console.log('from support', this.memoryData);
    this.computerNo = this.memoryData?.computerNo;
    this.id = this.memoryData?.memberId;
    console.log('computer no', this.computerNo, 'memberId', this.id);
  }

async loadingModal() {
  this.loadingScreen = await this.loadingCtrl.create({
    cssClass: "my-custom-class",
    message: "Loading...",
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

  console.log('passed arg', this.id, this.computerNo, this.plusConversations);
  

  this.http.get(`${this.apiEndPoit2}${this.computerNo}/0/${this.plusConversations}`, { }).subscribe({
    next: data => {
      console.log('message gotten from ticket', data);
      this.responseData = data;
      console.log('full post', this.responseData);
      
      // localStorage.setItem('userData', JSON.stringify(data));
      this.loadingScreen?.dismiss();
      // this.loadingScreen?.dismiss().then(() => { this.alertModal('Success!!!', 'message loaded Succefully'); });
      // setTimeout(() => {
      // this.loadingScreen?.dismiss();
        
      // }, 500);
      
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
    this.get()
  }
}
