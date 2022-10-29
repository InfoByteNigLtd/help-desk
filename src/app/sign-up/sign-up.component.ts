/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-trailing-spaces */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
  private apiEndPoit = 'localhost://8100/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: StorageService
  ) { }


  updateStaffNo(value) {
    this.computerNo = value;
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

  validatepassword(){
    if (this.password === this.rpassword) {
     this.validateInput();
    } else{
      this.alertModal('OOPS!!!', "Password and Repeat Password doesn't Match");
    }
     return false;
  }

  validateInput() {
    if (this.computerNo === ' ' || this.computerNo === undefined ||
      this.name === ' ' || this.name === undefined ||
      this.username === ' ' || this.username === undefined ||
      this.email === ' ' || this.email === undefined ) {
      this.alertModal('Error!!!', 'All fields are required');
    }
    else {
      this.loadingModal();

      this.http.post(this.apiEndPoit,
        {
          'computerNo': this.computerNo,
          'name': this.name,
          'userName': this.username,
          'email': this.email,
          'password': this.password
        }
      ).subscribe({
        next: data => {
        },
        error: data => {
          /** note: this storage line should be move out of this error to next once api endpoint is profided */
          this.storage.store('user-data',  {
            'computerNo': this.computerNo,
            'name': this.name,
            'userName': this.username,
            'email': this.email,
            'password': this.password
          });
          this.storage.store('status', 'login');
          setTimeout(() => {
            this.loadingScreen?.dismiss().then(() => { this.alertModal('Error!!!', 'Something went wrong'); });
          }, 1000);

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

  ngOnInit() { }

}
