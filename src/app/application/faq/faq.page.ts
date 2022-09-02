import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: 'faq.page.html',
  styleUrls: ['faq.page.scss']
})
export class FaqPageComponent implements OnInit {
  @Input() deltaState = "./assets/images/DeltaState.png";
  @Input() help = "assets/images/images.jpg";

  memoryData: any = sessionStorage.getItem('userData');
  userName: any;

  constructor(
    private router: Router,
  ) {}

  getUserData(){
    this.memoryData = JSON.parse(this.memoryData);
    // console.log('from local storage faq',this.memoryData);
    this.memoryData?.fullname; 
    this.userName = this.memoryData?.fullname.split(" ");
    this.userName = `${this.userName?.[0]} ${this.userName?.[1]}`;

  }



  ngOnInit(): void {
    this.getUserData();
  }
}
