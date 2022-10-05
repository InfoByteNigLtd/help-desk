import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-announcements-details',
  templateUrl: './announcements-details.component.html',
  styleUrls: ['./announcements-details.component.scss'],
})
export class AnnouncementsDetailsComponent implements OnInit {


  @Input()  data: any;
  @Input() announcementData: any;
  @Output() backBtn:any = new EventEmitter();

  loadingScreen!: HTMLIonLoadingElement;
  private apiLink = environment.annoucementAPI;
  responseData: any;
  public results: any = [];

  constructor(
    private http: HttpClient,
    private ref: ChangeDetectorRef,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  backButton(){
    this.backBtn.emit('topic-list');
  }

  memoryData: any = sessionStorage.getItem('userData');
  verifyLogin() {
    if (this.memoryData == undefined || this.memoryData == null) {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 500);
    } else {

    }
  }

  ngOnInit() {
    this.verifyLogin();
    // console.log('annoucement to annoucement details', this.announcementData);
  }

}
