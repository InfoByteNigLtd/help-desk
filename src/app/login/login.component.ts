/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

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

  private apiEndPoit2 = environment.memberAPI;

  isLogin: boolean = false;
  isLogout: boolean = true;

  userStatus: string = 'inactive';

  getStatus(): string {
    return localStorage.getItem('userStatus');
  }
  setStatus(value: string){
    localStorage.setItem('userStatus', value);
  }


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
      //test username and password;
      let userIdentity = 'ukah@gmail.com';
      let passcode = 'Ukah@gmail.com123'

      this.http.post(`${this.apiEndPoit2}${this.email}/${this.password}`, {param: []}).subscribe({
        next: data => {
          console.log('sent successfully', data);
          localStorage.setItem('userData', JSON.stringify(data));
          this.loadingScreen?.dismiss().then(() => { this.alertModal('Success!!!', 'login Succefully'); });
          this.setStatus('active');
          this.gotoDashboard();
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
      window.open(url, "_blank"); //to signup page
      // window.location.href='http://app.deltastatepensionsbureau.com/IBHelpDesk/Account/Register';
      // this.router.navigate(['/tabs/sign-up']);
    }, 500);
  }

  gotoDashboard() {
    setTimeout(() => {
      this.router.navigate(['app/router/dashboard']);
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

  logout(){
    localStorage.removeItem('userData');
    this.setStatus('inactive');
    this.router.navigate(['/login']);
    window.location.reload();
  }

  ngOnInit() {
    if (this.getStatus() != undefined && this.getStatus() == 'inactive') {
    this.isLogin = true;
    this.isLogout = false;
    } else {
      this.isLogin = false;
      this.isLogout = true;
      this.setStatus('inactive');
    }

  }

}


