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
  private apiEndPoit = 'http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/ForumTypes';

  private apiEndPoit2 = 'http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,

    ) { }

  updateEmail(value){
    this.email = value;
  }
  updatePassword(value){
    this.password = value;
  }

  validateInput() {
    console.log('email',this.email);
    console.log('password',this.password);
    if(this.email === ' ' || this.email === undefined || this.password === ' ' || this.password === undefined)
    {
      this.alertModal('Error!!!', 'All fields are required');
    }
    else
    {
      this.loadingModal();
      // this.http.post(this.apiEndPoit, {email: this.email, password: this.password}).subscribe({
      //   next: data => {
      //     console.log('sent successfully');

      //   }

      this.http.get(this.apiEndPoit2).subscribe({
        next: data => {
          console.log('sent successfully', data);

        },
        error: data => {
          console.log('something went wrong', data);
          setTimeout(() => {
            this.loadingScreen?.dismiss().then(()=>{this.alertModal('Error!!!', 'Something went wrong');});
          }, 1000);

        }
    });
    }
  }

  gotoSignup() {
    setTimeout(() => {
      this.router.navigate(['/tabs/sign-up']);
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


