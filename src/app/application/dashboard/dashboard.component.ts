/* eslint-disable @typescript-eslint/semi */
/* eslint-disable object-shorthand */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public services = [
    { id: 1, title: 'forum', image: '../../../assets/images/forum.svg', route: '/app/users/checkuser', icon: 'man-outline'},
    { id: 2, title: 'support', image: '../../../assets/images/support.svg', route: '/app/drivers/checkdriver', icon: 'car-sport-outline' },
    { id: 3, title: 'chat', image: '../../../assets/images/chat.svg', route: '/app/dispatcher/checkuser', icon: 'bicycle-outline' },
    { id: 4, title: 'other', image: '../../../assets/images/help.jpg', route: '/app/parcel/checkparcel', icon: 'briefcase-outline'}
  ];

  public selectedUserType: any;
  public userName: string;
  public buttonText: string = 'Proceed';
  public selectedCardId: any;
  public iconName: string = 'glasses-outline';
  public serviceRoute: string;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { }
  /**
   * This method is used to change the service card when selected and also define the user type for router
   * 
   * @param cardId - selected card id
   */
  public selectCard = (cardId: any): void => {
    this.selectedCardId = cardId;
    const service = this.services.filter((service) => service.id == cardId);
    this.selectedUserType = service[0].title;
    this.iconName = service[0].icon;
    this.serviceRoute = service[0].route;

    this.buttonText = this.selectedUserType == 'parcel'? `Send ${this.selectedUserType}` : `Proceed as ${this.selectedUserType}` ;
  }

   /** Route to the selected user dashboard */
    async goToSelectedUserDashboard() {
  
      // Check if a user type has been selected
      if (this.selectedUserType == undefined) {
        this.presentAlert( "Select A Service",'', "<i> Please select your preferred service <br> from the dashboard </i>");
      }
      //Go to selected service
      else{
          if (this.selectedUserType == 'forum') {
            this.router.navigate(['/app/router/forum']);
          }
          else if (this.selectedUserType == 'chat') {
            this.router.navigate(['/app/router/chat']);
          }
          else if (this.selectedUserType == 'support') {
            this.router.navigate(['/app/router/dashboard']);
          }else{
            console.log('no condition met check the implementation in dashboard component');
          }
        }
    }

    async presentAlert(
      header: string = "Alert",
      subHeader: string = "Subtitle",
      message: string = "This is an alert message."
    ) {
      const alert = await this.alertController.create({
        cssClass: "my-custom-class",
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: ["OK"],
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
      console.log("onDidDismiss resolved with role", role);
    }

  ngOnInit() { }

}
