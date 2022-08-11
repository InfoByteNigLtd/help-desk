import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent implements OnInit {

  private apiLink = environment.annoucementAPI;

  posterImage: string = "../assets/images/delta-state-new-logo.jpg";

  isTopicList: boolean = true;
  isPostDetail: boolean = false;
  result: any;
  annoucementPostId: any;
  announcementDetails: any;
  loadingScreen!: HTMLIonLoadingElement;


  constructor(
    private http: HttpClient,
    private ref: ChangeDetectorRef,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  swtichActivePage(page, postId = 0) {
    if (page === 'annoucements-detail') {
      let userData = this.result.filter((user) => { return user.postId == postId });
      this.isTopicList = false;
      this.isPostDetail = true;
      this.annoucementPostId = postId;
      this.announcementDetails = userData;
      console.log('post id from annoucnemt', this.annoucementPostId);


    }
    else if (page === 'topic-list') {
      this.isTopicList = true;
      this.isPostDetail = false;
    }
  }

  memoryData: any = sessionStorage.getItem('userData');

  verifyLogin() {
    if (this.memoryData == undefined || this.memoryData == null) {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 500);
    } else {

    }
  }
  backButton() {
    
    this.router.navigate(['/app/router/dashboard']);
  }
  // Alerts

  async successfulAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Request Completed",
      message: "Data Received",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.router.navigate(["/app/drivers/router/dashboard"]);
          },
        },
      ],
    });

    await alert.present();

    await alert
      .onDidDismiss()
      .then(() => this.router.navigate(["/app/drivers/router/dashboard"]));
  }

  // Failed Alert

  async errorAlert(message) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Request Failed",
      message: `Error getting Data from Server: ${message}`,
      buttons: ["OK"],
    });

    await alert.present();

    await alert.onDidDismiss();
  }
  /** generic method to dispaly alert message to user */
  async presentAlert(
    header: string = "Alert",
    subHeader: string = "Subtitle",
    message: string = "This is an alert message."
  ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-css',
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ["OK"],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);
  }

  async loadingModal(message: string = "Loading...") {
    this.loadingScreen = await this.loadingCtrl.create({
      cssClass: "my-custom-class",
      message: message,
    });

    return await this.loadingScreen.present();
  }

  async alertModal(title: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: title,
      message: message,
      buttons: ["OK"],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  getUserData() {
    this.loadingModal();
    this.memoryData = JSON.parse(this.memoryData);
    console.log('from local storage', this.memoryData);
    this.memoryData?.fullname;

    this.http.get(`${this.apiLink}`, {}).subscribe({
      next: data => {
        console.log('Annoucement Received', data);
        this.result = data;
        this.loadingScreen?.dismiss();
      },
      error: data => {
        console.log('something went wrong', data);
        setTimeout(() => {
          this.loadingScreen?.dismiss().then(() => { this.alertModal('Error!!!', 'Ensure you have a steady Network'); });
        }, 1000);

      }

    });

  }

  ngOnInit() {
    this.verifyLogin();
    this.getUserData()
    // this.getForumData();
  }

}
