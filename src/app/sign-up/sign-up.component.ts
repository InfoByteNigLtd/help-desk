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

  public email: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  loadingScreen!: HTMLIonLoadingElement;
  private apiEndPoit = 'localhost://8100/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: StorageService
    ) { }


  updateFirstName(value) {
    this.firstname = value;
  }
  updateLastName(value) {
    this.lastname = value;
  }
  updateEmail(value) {
    this.email = value;
  }
  updatePassword(value) {
    this.password = value;
  }

  validateInput() {
    // console.log('email', this.email);
    // console.log('password', this.password);
    if (this.firstname === ' ' || this.firstname === undefined || this.lastname === ' ' || this.lastname === undefined || this.email === ' ' || this.email === undefined || this.password === ' ' || this.password === undefined) {
      this.alertModal('Error!!!', 'All fields are required');
    }
    else {
      this.loadingModal();

      this.http.post(this.apiEndPoit, { 'first-name': this.firstname, 'last-name': this.lastname, email: this.email, password: this.password }).subscribe({
        next: data => {
          // console.log('sent successfully');

        },
        error: data => {
          /** note: this storage line should be move out of this error to next once api endpoint is profided */
          this.storage.store('user-data', { 'first-name': this.firstname, 'last-name': this.lastname, email: this.email, password: this.password });
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
      this.router.navigate(['/tabs/login']);
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
