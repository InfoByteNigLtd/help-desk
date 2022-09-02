import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inbox-details',
  templateUrl: './inbox-details.component.html',
  styleUrls: ['./inbox-details.component.scss'],
})
export class InboxDetailsComponent implements OnInit, AfterContentChecked {

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
  responseToQuestionsAsked :any;

  private apiEndPoit2 = environment.supportAPI;
  private apiEndPoit1 = environment.supportAPI3;



  constructor(private router: Router,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private activatedRoute: ActivatedRoute,
    protected ref: ChangeDetectorRef
    ) { 
      this.activatedRoute.params.subscribe( param => {
        // console.log('params from suppoort', param);
        
        this.computerNo = param.computerNo;
        this.tkCatId = param.tkCatId;
        this.ticketId = param.ticketId;
        // console.log('recieved data from route', this.computerNo, this.tkCatId, this.ticketId);
      });
    }

    ngAfterContentChecked(): void {
      this.ref.detectChanges();
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

  getComment() {
    this.loadingModal();
    this.http.get(`${this.apiEndPoit2}${this.computerNo}/${this.ticketId}/true`, { }).subscribe({
      next: data => {
        // console.log('computerno', this.computerNo, 'ticketId', this.ticketId);
        // console.log('inbox details received working', data);
        this.responseData = data;
        this.commentData = data[0].conversationDTOs.slice();
        // console.log('passed from inbox details',this.responseData);

        // this.responseData = data.conversationDTOs;
        // localStorage.setItem('userData', JSON.stringify(data));
        this.loadingScreen?.dismiss();

        // this.loadingScreen?.dismiss().then(() => { this.alertModal('Success!!!', 'loaded Succefully'); });

  
      },
      error: data => {
        // console.log('something went wrong', data);
      }
    });
    this.loadingScreen?.dismiss();
  }

  getPostTopic(event) {
    this.responseToQuestionsAsked = event.target.value;
    // console.log(event.target.value);
  }


  submit() {
    // console.log('entered values', this.responseToQuestionsAsked);
      this.loadingModal();
      this.http.post(this.apiEndPoit1, {
        "ticketId": this.ticketId,
        "response": this.responseToQuestionsAsked
    }).subscribe({
      next: data => {
        // console.log('inbox details received working', data);
        this.loadingScreen?.dismiss();
        this.getComment();
      },
      error: data => {
        // console.log('something went wrong', data);
        this.loadingScreen?.dismiss();
      }
    });

    
    this.responseToQuestionsAsked = '';
  }

  backButton(){
    this.router.navigate(['/app/router/inbox']);
  }

  ngOnInit() {
    this.getComment();
  }

}
