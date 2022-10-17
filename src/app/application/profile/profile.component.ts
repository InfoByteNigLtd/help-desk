import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild("clickImage") clickImage: ElementRef;
  pageTitle = "Update Profile";
  loading: boolean = false;
  pickedimageDispatcherImage: string = "../../assets/icon/user.svg";
  dispatcherImageStatus: boolean = true;
  dispatcherEmail: string = "";
  dispatcherAddress: string = "";
  dispatcherMobile: string = "";

  surname: string = "";
  otherNames: string = "";
  memberId: any;
  computerNo: string = "";
  pfaCode: string = "";
  pinNo: string = "";
  gender: string = "";
  result: any;
  


  dispatcherId: any;
  loadingScreen!: HTMLIonLoadingElement;
  isDelete: boolean = false;


  private apiEndPoit2 = environment.memberAPI;


  constructor(
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
  ) { }


  backButton() {
    this.router.navigate(['/app/router/dashboard']);
  }
  updateDispatcherProfile() { }
  loadImageFromDevice(event, type) {
    const maxSize = 5;
    const imageSizeDivisor = 1024 * 1024; //to convert the image size to mb
    const file = event.target.files[0];
    // check the image size if not greater than maxSize allowed
    let imageSize = event.target.files[0].size / imageSizeDivisor;
    // console.log('image size', imageSizeDivisor, 'image size in mb ', imageSize);

    if (imageSize <= maxSize) {
      const reader = new FileReader();

      reader.readAsArrayBuffer(file);

      reader.onload = () => {
        // get the blob of the image:
        let blob: Blob = new Blob([new Uint8Array(reader.result as ArrayBuffer)]);

        // create blobURL, such that we could use it in an image element:
        let blobURL: string = URL.createObjectURL(blob);

        //CONVERT TO BASE 64
        async function blobToBase64(blob) {
          return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
        }
        // <= your blob object goes here

        blobToBase64(blob).then((base64String) =>
          this.makeit(base64String, type)
        );
      };

      reader.onerror = (error) => {
        this.presentAlert('Error', 'Something went wrong', 'Ensure image size is less than 5mb');
      };
    }
    else {
      this.presentAlert('Error', 'Upload unsuccessful', 'Ensure image size is less than 5mb');
    }
  }
  makeit(n, type) {
    if (type == "PF") {
      this.pickedimageDispatcherImage = "data:image/png;base64," + n.split(",")[1];

      this.dispatcherImageStatus = false;
    }
  }

  // Alerts

  async successfulAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Request Completed",
      message: "Profile updated successfully",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.router.navigate(["/app/drivers/router/dashboard"]);
          },
        },
      ],
    });

    await alert.present();

    await alert
      .onDidDismiss()
      .then(() => this.router.navigate(["/app/drivers/router/dashboard"]));
  }

  // Failed Alert

  async errorAlert(message) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Request Failed",
      message: `Upload unsuccessful: ${message}`,
      buttons: ["OK"],
    });

    await alert.present();

    await alert.onDidDismiss();
  }
  /** generic method to dispaly alert message to user */
  async presentAlert(
    header: string = "Alert",
    subHeader: string = "Subtitle",
    message: string = "This is an alert message."
  ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-css',
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

  verifyLogin() {
    if (this.memoryData == undefined || this.memoryData == null) {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 500);
    } else {
      this.getUserData();

    }
  }

  getUserData() {
    this.memoryData = JSON.parse(this.memoryData);
    // console.log('from local storage', this.memoryData);
    this.memoryData?.fullname;
    this.computerNo = this.memoryData?.computerNo;
    this.memberId = this.memoryData?.memberId;

    this.http.get(`${this.apiEndPoit2}${this.memberId}`, {}).subscribe({
      next: data => {
        // console.log('sent successfully', data);
        this.result = data;
        this.loadingScreen?.dismiss();
        const result: any = data;
        this.surname = result.surname;
        this.otherNames = result.firstName + " " + result.middleName
        this.pfaCode = result.pfaCode;
        this.pinNo = result.pinNo;
        
      },
      error: data => {
        // console.log('something went wrong', data);
        setTimeout(() => {
          this.loadingScreen?.dismiss().then(() => { this.alertModal('Error!!!', 'Poor Network Detected'); });
        }, 1000);

      }
      
    });

  }
  async loadingModal(message: string = "Sign-in...") {
    this.loadingScreen = await this.loadingCtrl.create({
      cssClass: "my-custom-class",
      message: message,
    });

    return await this.loadingScreen.present();
  }

  async alertModal(title: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: title,
      message: message,
      buttons: ["OK"],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

confirmDelete(){
  setTimeout(() => {
    if (this.isDelete == false) {
    this.isDelete = true;
  } else{
     this.isDelete = false;
  }
  }, 500);
  
 
}
properDelete(event: any){
  setTimeout(() => {
    console.log('computer number: ',event);
    
    this.http.delete(`${this.apiEndPoit2}${this.memberId}`, {}).subscribe({
      next: data => {
        console.log('sent successfully', data);
        this.result = data;
        this.loadingScreen?.dismiss();
        const result: any = data;
        this.surname = result.surname;
        this.otherNames = result.firstName + " " + result.middleName
        this.pfaCode = result.pfaCode;
        this.pinNo = result.pinNo;
        
      },
      error: data => {
        // console.log('something went wrong', data);
        setTimeout(() => {
          this.loadingScreen?.dismiss().then(() => { this.alertModal('Error!!!', 'Poor Network Detected'); });
        }, 1000);

      }
      
    });
  
  }, 500);

}

  ngOnInit() {
    this.verifyLogin();
  }

}
