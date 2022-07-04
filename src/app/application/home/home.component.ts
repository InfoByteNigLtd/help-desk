/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() deltaState:string = "./assets/images/DeltaState.png";
  @Input() help:string = "./assets/images/images.jpg";

  constructor(private storage: StorageService, private router: Router) { }

  async getUserInfo() {
    const userData = await this.storage.fetch('status');
    if (userData === null) {
      this.navigateTo('/app/tabs/login');
    }
  }

  navigateTo(route: string) {
    setTimeout(() => {
      this.router.navigate([route]);
    }, 500);
  }

  ngOnInit() {
    this.getUserInfo();
  }

}
