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
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public services = [
    // { id: 1, title: 'forum', image: '../../../assets/images/forum.svg', route: '/app/router/forum', icon: 'man-outline'},

    { id: 1, title: 'profile', image: '../../../assets/images/forum.svg', route: '/app/router/profile', icon: 'man-outline'},
    { id: 2, title: 'support', image: '../../../assets/images/support.svg', route: '/app/router/inbox', icon: 'car-sport-outline' },
    { id: 3, title: 'status', image: '../../../assets/images/chat.svg', route: '/app/router/chat', icon: 'bicycle-outline' },
    { id: 4, title: 'faq', image: '../../../assets/images/help.jpg', route: '/app/router/faq', icon: 'briefcase-outline'}
  ];

  public selectedUserType: any;
  public userName: string;
  public buttonText: string = 'Proceed';
  public selectedCardId: any;
  public iconName: string = 'glasses-outline';
  public serviceRoute: string;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private platform: Platform,
  ) {
    this.verifyLogin();
    this.platform.backButton.subscribeWithPriority(10, () => {
      // console.log('Handler was called!');
    });
   }
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

    this.buttonText = `Proceed to ${this.selectedUserType}` ;
  }

   /** Route to the selected user dashboard */
    async goToSelectedUserDashboard() {
      setTimeout(() => {
              // Check if a user type has been selected
      if (this.selectedUserType == undefined) {
        this.presentAlert( "Select A Service",'', "<i> Please select your preferred service <br> from the dashboard </i>");
      }
      //Go to selected service
      else{
          if (this.selectedUserType == 'profile') {
            this.router.navigate(['/app/router/profile']);
          }
          else if (this.selectedUserType == 'status') {
            this.router.navigate(['/app/router/chat']);
          }
          else if (this.selectedUserType == 'support') {
            this.router.navigate(['/app/router/inbox']);
          }else{
            this.router.navigate(['/app/router/faq']);
          }
        }
      }, 700);
  

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
      // console.log("onDidDismiss resolved with role", role);
    }

    //local storage 
    /**change the localStorage to sessionStorage if you want session storage 
     * localStirage.removeItem;
    */
    memoryData: any = sessionStorage.getItem('userData');

    verifyLogin(){
      if (this.memoryData == undefined || this.memoryData == null ) {
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 500);
      } else {
        this.getUserData();
        
      }
    }

    getUserData(){
      this.memoryData = JSON.parse(this.memoryData);
      // console.log('from local storage',this.memoryData);
      this.memoryData?.fullname; 
      this.userName = this.memoryData?.fullname.split(" ");
      this.userName = `${this.userName?.[0]} ${this.userName?.[1]}`;

    }

  ngOnInit() { 
    
  }

}
