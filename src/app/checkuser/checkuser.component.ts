import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-checkuser',
  templateUrl: './checkuser.component.html',
  styleUrls: ['./checkuser.component.scss'],
})
export class CheckuserComponent implements OnInit {

  constructor(
    private storage: StorageService,
    private router: Router
    ) { }

  async getUserInfo() {
    const userData = await this.storage.fetch('user-data');
    if (userData === null) {
      console.log('it work');
      this.navigateTo('/app/tabs/sign-up');
    }
    else {
      this.navigateTo('/home');
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
