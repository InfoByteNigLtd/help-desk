/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-trailing-spaces */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  @Input() coatOfArm: string = "assets/images/coat-of-arm.png";

  public computerNo: string;
  public name: string;
  public username: string;
  public email: string;
  public password: string;
  public rpassword: string;
  loadingScreen!: HTMLIonLoadingElement;
  private apiEndPoit = environment.signupAPI;
  private signUpAPI = environment.fullSignUpAPI ;
  canRegister: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: StorageService
  ) { }


  updateStaffNo(value) {
    this.computerNo = value;
    console.log(this.computerNo);
    this.loadingModal();
    this.isValidUser();
  }
  updateName(value) {
    this.name = value;
  }
  updateUserName(value) {
    this.username = value;
  }
  updateEmail(value) {
    this.email = value;
  }
  updatePassword(value) {
    this.password = value;
  }
  updateRpassword(value) {
    this.rpassword = value;
  }

  isValidUser(){
    this.http.get(`${this.apiEndPoit}${this.computerNo}`, {  }).subscribe({
      next: data => {
        // this.loadingModal('user Found.');
        console.log('success',data);
        this.loadingScreen?.dismiss();
        setTimeout(() => {
          this.loadingScreen?.dismiss().then(() => { this.alertModal('Success', `${data}`); });
        }, 1000);

      },
      error: data => { 
       
        // this.loadingModal('User Not Found...');
        console.log('error',data);
 
        console.log('error text',data.error.text);
        this.name = data.error.text;
        if (this.name == undefined) {
          setTimeout(() => {
            this.loadingScreen?.dismiss().then(() => { this.alertModal('OOPS', `${data.error}`); });
          }, 1000);
          
        } else {
           setTimeout(() => {
            this.canRegister = true;
          this.loadingScreen?.dismiss().then(() => { this.alertModal('Alert', `${data.error.text}`); });
          this.name = data.error.text;
        }, 1000); 
        this.loadingScreen?.dismiss();
        }
       
        const errorMessage = data.error;

        if (errorMessage === 'Account not yet Activated or Deactivated by user.') {
          // console.log('Deactivated account');

        }else{
          // console.log('Wrong details');
        }

      }
    });
  }

  validatepassword(){
    if (this.password === this.rpassword) {
     this.validateInput();
    } else{
      this.alertModal('OOPS!!!', "Password and Repeat Password doesn't Match");
    }
     return false;
  }


  validateInput() {
    if (this.computerNo == ' ' && this.computerNo == undefined && this.computerNo == null &&
      this.name == ' ' && this.name == undefined && this.name == null &&
      this.username == ' ' && this.username  == undefined && this.username == null &&
      this.email == ' ' && this.email == undefined && this.email == null) {
      this.alertModal('Error!!!', 'All fields are required');
    }
    else {
      this.loadingModal();

      // https://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/GetMemberByComputerNo?id=10000377 //all retiree detalils
      // https://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/GetMemberFullname?ComputerNo=10000377 //only the name
  // memberAPI: 'http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/',

      this.http.post(this.signUpAPI,
        {
          "email": this.email,
          "password": this.password,
          "username": this.username,
          "computerNo": this.computerNo
        }
      ).subscribe({
        next: data => {
          console.log('data for reg', data);
          
        },
        error: data => {
          console.log('error' , data);
          setTimeout(() => {
            this.loadingScreen?.dismiss().then(() => { this.alertModal('OOPS', `${data.error.message}`); });
          }, 1000);
          /** note: this storage line should be move out of this error to next once api endpoint is profided */
          // this.storage.store('user-data',  {
          //   'computerNo': this.computerNo,
          //   'name': this.name,
          //   'userName': this.username,
          //   'email': this.email,
          //   'password': this.password
          // });
          // this.storage.store('status', 'login');
        }
      });
    }
  }

  gotoSignin() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
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


  ngOnInit() { 
    
  }

}
