import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inbox-details',
  templateUrl: './inbox-details.component.html',
  styleUrls: ['./inbox-details.component.scss'],
})
export class InboxDetailsComponent implements OnInit {

  @Input() image: string = "../assets/images/images.jpg";
  posterImage = "../assets/images/images.jpg";

  reactions: any = {likes: 451, commentNo: 40};
  postComment = "I JUst like what you were saying sir. say anything you want and linke";


  postTopic: string = "How about pension for 2000";
  postMessage: string = 'Will they not pay us?';

  loadingScreen!: HTMLIonLoadingElement;
  computerNo: any;
  private tkCatId: any;
  private ticketId: any;
  responseData : any = [];
  commentData: any = [];

  private apiEndPoit2 = environment.supportAPI;


  constructor(private router: Router,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private activatedRoute: ActivatedRoute,
    ) { 
      this.activatedRoute.params.subscribe( param => {
        console.log('params from suppoort', param);
        
        this.computerNo = param.computerNo;
        this.tkCatId = param.tkCatId;
        this.ticketId = param.ticketId;
        console.log('recieved data from route', this.computerNo, this.tkCatId, this.ticketId);
      });
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

  getComment() {
    this.http.get(`${this.apiEndPoit2}${this.computerNo}/${this.ticketId}/true`, { }).subscribe({
      next: data => {
        console.log('inbox details received working', data);
        this.responseData = data;
        this.commentData = data[0].conversationDTOs;
        console.log('from inbox details',this.responseData);


        // this.responseData = data.conversationDTOs;
        // localStorage.setItem('userData', JSON.stringify(data));
        this.loadingScreen?.dismiss().then(() => { this.alertModal('Success!!!', 'laoded Succefully'); });
      },
      error: data => {
        console.log('something went wrong', data);
      }
    });
  }

  getPostTopic(event) {
    this.postTopic = event.target.value;
    console.log(event.target.value);
  }


  submit() {
    console.log('entered values', this.postTopic);
    this.http.post(`${this.apiEndPoit2}${this.computerNo}/${this.tkCatId}/true`, { }).subscribe({
      next: data => {
        console.log('inbox details received working', data);
        this.responseData = data;
        // this.responseData = data['conversationDTOs'];
        // console.log('from inbox details',this.responseData);
        
        // localStorage.setItem('userData', JSON.stringify(data));
        this.loadingScreen?.dismiss().then(() => { this.alertModal('Success!!!', 'laoded Succefully'); });
      },
      error: data => {
        console.log('something went wrong', data);
      }
    });
  }

  ngOnInit() {
    this.getComment();
  }

}
