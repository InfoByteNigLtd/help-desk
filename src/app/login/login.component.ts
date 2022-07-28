/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterContentChecked {

  public email;
  public password;
  loadingScreen!: HTMLIonLoadingElement;
  private apiEndPoit = 'app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/10008237/Admin@123';

  private apiEndPoit2 = environment.memberAPI;

  isLogin: boolean = false;
  isLogout: boolean = true;

  userStatus: string = 'inactive';

  getStatus(): string {
    return sessionStorage.getItem('userStatus');
  }
  setStatus(value: string) {
    sessionStorage.setItem('userStatus', value);
  }


  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private ref: ChangeDetectorRef,

  ) { }


  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  updateEmail(value) {
    this.email = value;
  }
  updatePassword(value) {
    this.password = value;
  }
  hey(value){
    console.log(this.password);
    
  }

  validateInput() {
    console.log('email', this.email);
    console.log('password', this.password);
    if (this.email === ' ' || this.email === undefined || this.password === ' ' || this.password === undefined) {
      this.alertModal('Error!!!', 'All fields are required');
    }
    else {
      this.loadingModal();

      this.http.post(`${this.apiEndPoit2}${this.email}/${this.password}`, {  }).subscribe({
        next: data => {
          console.log('sent successfully', data);
          sessionStorage.setItem('userData', JSON.stringify(data));
          // stop the first loadingModal
          this.loadingScreen?.dismiss();
          // show login success loading
          this.loadingModal('Login successful...');
          setTimeout(() => {
            this.loadingScreen?.dismiss().then(() => {
              this.setStatus('active');
              this.gotoDashboard();
            });
          }, 1000);

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


  async loadingModal(message: string = "Sign-in...") {
    this.loadingScreen = await this.loadingCtrl.create({
      cssClass: "my-custom-class",
      message: message,
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

  logout() {
    sessionStorage.removeItem('userData');
    this.setStatus('inactive');
    this.router.navigate(['/login']);
    window.location.reload();
  }

  refresh() {
    window.location.reload();
    this. gotoDashboard();
  }
  ngOnInit() {
    console.log('workinng on login');

    let lStatus = this.getStatus();
    console.log('status', lStatus);

    if (lStatus === 'active') {
      console.log('active');

      this.isLogin = false;
      this.isLogout = true;
    } else {
      console.log('inactive');

      this.isLogin = true;
      this.isLogout = false;
    }

  }

}


