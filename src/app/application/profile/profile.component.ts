import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  pageTitle = "Update Profile";
  loading: boolean = false;
  dispatcherImageStatus: boolean = true;
  dispatcherEmail: string = "";
  dispatcherAddress: string = "";
  dispatcherMobile: string = "";

  surname: string = "";
  otherNames: string = "";
  memberId: any;
  computerNo: string = "";
  pfaCode: string = "";
  pinNo: string = "";
  gender: string = "";
  result: any;
  
  loadingScreen!: HTMLIonLoadingElement;
  private apiEndPoit2 = environment.memberAPI;


  constructor(
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
  ) { }


  backButton() {
    this.router.navigate(['/app/router/dashboard']);
  }

  // Alerts

  async successfulAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Request Completed",
      message: "Profile updated successfully",
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
      message: `Upload unsuccessful: ${message}`,
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
  }


  //local storage 
  /**change the localStorage to sessionStorage if you want session storage 
   * localStirage.removeItem;
  */
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
    this.memoryData?.fullname;
    this.computerNo = this.memoryData?.computerNo;
    this.memberId = this.memoryData?.memberId;

    this.http.get(`${this.apiEndPoit2}${this.memberId}`, {}).subscribe({
      next: data => {
        this.result = data;
        this.loadingScreen?.dismiss();
        const result: any = data;
        this.surname = result.surname;
        this.otherNames = result.firstName + " " + result.middleName
        this.pfaCode = result.pfaCode;
        this.pinNo = result.pinNo;
        
      },
      error: data => {
        setTimeout(() => {
          this.loadingScreen?.dismiss().then(() => { this.alertModal('OOPS!!!', 'Poor Network Detected'); });
        }, 1000);

      }
      
    });

  }
  async loadingModal(message: string = "Sign-in...") {
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


  ngOnInit() {
    this.verifyLogin();
  }

}
