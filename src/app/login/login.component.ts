/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public email;
  public password;
  loadingScreen!: HTMLIonLoadingElement;
  private apiEndPoit = 'app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/10008237/Admin@123';

  private apiEndPoit2 = 'http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/';

//   data: any = { 
//     accruedRight: 0
// accruedRightPaid: 0
// applicationStatus: "Certificate not yet Prepared"
// certificateNumber: "NA"
// certificateReady: false
// computerNo: "1000139"
// dateRetired: "2022-07-01T00:00:00"
// employeeAmount: 6490.79
// employerAmount: 23760.7
// firstName: "STEPHEN"
// indebtedness: 0
// memberId: 1
// middleName: "S"
// paymentSchedule: "Not yet Released"
// pfaCode: "ARM"
// picture: null
// pinNo: "PEN678668903322"
// processedMonth: 0
// processedYear: 0
// registered: false
// surname: "NWAINOKPO"

//   }
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,

  ) { }

  updateEmail(value) {
    this.email = value;
  }
  updatePassword(value) {
    this.password = value;
  }

  validateInput() {
    console.log('email', this.email);
    console.log('password', this.password);
    if (this.email === ' ' || this.email === undefined || this.password === ' ' || this.password === undefined) {
      this.alertModal('Error!!!', 'All fields are required');
    }
    else {
      this.loadingModal();
      // this.http.post(this.apiEndPoit, {email: this.email, password: this.password}).subscribe({
      //   next: data => {
      //     console.log('sent successfully');

      //   }

      this.http.get(this.apiEndPoit, {params: {id: 2} }).subscribe({
        next: data => {
          console.log('sent successfully', data);
          this.loadingScreen?.dismiss().then(() => { this.alertModal('Success!!!', 'data found'); });

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

  gotoSignup(url: string) {
    setTimeout(() => {
      window.open(url, "_blank");
      // window.location.href='http://app.deltastatepensionsbureau.com/IBHelpDesk/Account/Register';
      // this.router.navigate(['/tabs/sign-up']);
    }, 500);
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

  ngOnInit() {
    console.log('init');

  }

}


