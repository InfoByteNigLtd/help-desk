import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {
  memberId: any;
  computerNo: any;
  public ticketCategoryId;
  public subject;
  public description;
  public status: any = 'new';
  loadingScreen!: HTMLIonLoadingElement;
  plusConversation: boolean = false;
  private tkCatId: any;
  ticketCategoryApi: any;

  private apiEndPoit2 = environment.supportAPI2;
  private apiEndPoint1 = environment.suppourtAPI4;

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
        console.log('recieved data from route', this.computerNo, this.tkCatId);
      });
    }

  async loadingModal() {
    this.loadingScreen = await this.loadingCtrl.create({
      cssClass: "my-custom-class",
      message: "Please Wait...",
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

  memoryData: any = sessionStorage.getItem('userData');

  verifyLogin() {

    if (this.memoryData == undefined || this.memoryData == null) {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 500);
    } else {
      this.getUserData();

    }
  }

  getUserData() {
    this.memoryData = JSON.parse(this.memoryData);
    console.log('from support', this.memoryData);
    this.computerNo = this.memoryData?.computerNo;
    this.memberId = this.memoryData?.memberId;
    console.log('computer no', this.computerNo, 'memberId', this.memberId);
  }

  updateTicketId(event) {
    this.ticketCategoryId = event.target.value;
    console.log('id', this.ticketCategoryId);
  }
  updateSubject(event) {
    this.subject = event.target.value;
    console.log('subject', this.subject);
  }
  updateDescripton(event) {
    this.description =event.target.value;
    console.log('desc', this.description);
  }

  validateInput() {
    console.log('ticketCategory', this.ticketCategoryId);
    console.log('computer No', this.computerNo);
    console.log('subject', this.subject);
    console.log('description', this.description);
    console.log('status', this.status);

    if (this.ticketCategoryId === ' ' || this.ticketCategoryId === undefined ||
      this.computerNo === ' ' || this.computerNo === undefined ||
      this.subject === ' ' || this.subject === undefined ||
      this.description === ' ' || this.description === undefined ||
      this.status === ' ' || this.status === undefined) {
      this.alertModal('Error!!!', 'All fields are required');
    }
    else {
      this.loadingModal();
      this.http.post(this.apiEndPoit2, {
        "ticketCategoryId": this.ticketCategoryId,
        "computerNo": this.computerNo,
        "subject": this.subject,
        "description": this.description,
        "status": "new"
    }).subscribe({
        next: data => {
          console.log('sent successfully', data);
          // localStorage.setItem('userData', JSON.stringify(data));
          this.loadingScreen?.dismiss().then(() => { this.alertModal('Success!!!', 'message sent Succefully'); });
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
  }

  get() {
    this.http.get(`${this.apiEndPoint1}`, { }).subscribe({
      next: data => {
        // console.log('inbox details received', data);
        const ticketCategory = data;
        this.ticketCategoryApi = ticketCategory;
        this.loadingScreen?.dismiss().then(() => { this.alertModal('Success!!!', 'laoded Succefully'); });
      },
      error: data => {
        console.log('something went wrong', data);
      }
    });
  }

  backButton(){
    this.router.navigate(['/app/router/inbox']);
  }

  ngOnInit() {
    this.verifyLogin();
    this.get();
  }

}
