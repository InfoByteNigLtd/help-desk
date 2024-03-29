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
  public computerNo;
  loadingScreen!: HTMLIonLoadingElement;
  private apiEndPoit = 'app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/10008237/Admin@123';

  private apiEndPoit2 = environment.memberAPI;

  isLogin: boolean = false;
  isLogout: boolean = true;

  reactivation: boolean = false;

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

  updateComputerNo(value) {
    this.computerNo = value;
  }

  validateInput() {
    if (this.email === ' ' || this.email === undefined || this.password === ' ' || this.password === undefined) {
      this.alertModal('Error!!!', 'All fields are required');
    }
    else {
      this.loadingModal();

      this.http.post(`${this.apiEndPoit2}${this.email}/${this.password}`, {  }).subscribe({
        next: data => {
          console.log('success',data);

          sessionStorage.setItem('userData', JSON.stringify(data));
          this.loadingScreen?.dismiss();
          this.loadingModal('Login successful...');
          setTimeout(() => {
            this.loadingScreen?.dismiss().then(() => {
              this.setStatus('active');
              this.gotoDashboard();
            });
          }, 1000);

        },
        error: data => {
          console.log('error',data.error);
          const errorMessage = data.error;

          if (errorMessage === 'Account not yet Activated or Deactivated by user.') {
            console.log('Deactivated account');
            this.reactivation = true;
            this.isLogin = false;

          }else{
            console.log('Wrong details');
          }
          setTimeout(() => {
            this.loadingScreen?.dismiss().then(() => { this.alertModal('OOPS!!!', `${data.error}`); });
          }, 1000);

        }
      });
    }
  }

  gotoSignup(url: string) {
    setTimeout(() => {
      window.open(url, "_blank"); //to signup page
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
  backButton(){
    window.location.reload();
  }

  reactivateUser(url: string) {
    console.log('this number', this.computerNo);
    setTimeout(() => {
      window.open(url + `${this.computerNo}`, "_blank"); //to reactivation page
    }, 500);
  }

  ngOnInit() {

    let lStatus = this.getStatus();

    if (lStatus === 'active') {

      this.isLogin = false;
      this.isLogout = true;
    } else {

      this.isLogin = true;
      this.isLogout = false;
    }

  }

}


