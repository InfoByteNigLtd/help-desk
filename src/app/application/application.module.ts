import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApplicationPageRoutingModule } from './application-routing.module';

import { ApplicationPage } from './application.page';
import { ComponentPageModule } from '../component/component.module';
import { InboxComponent } from './inbox/inbox.component';
import { HomeComponent } from './home/home.component';
import { ForumComponent } from './forum/forum.component';
import { PostDetailComponent } from './forum/post-detail/post-detail.component';
import { NewPostComponent } from './forum/new-post/new-post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Tab2PageModule } from './tab2/tab2.module';
import { Tab3PageModule } from './tab3/tab3.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ApplicationPageRoutingModule,
    ComponentPageModule,
    Tab2PageModule,
    Tab3PageModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ApplicationPage,
    InboxComponent,
    HomeComponent,
    ForumComponent,
    PostDetailComponent,
    NewPostComponent,
    DashboardComponent
  ],
  exports: [
    ApplicationPage,
    InboxComponent,
    HomeComponent,
    ForumComponent,
    PostDetailComponent,
    NewPostComponent,
    DashboardComponent
  ]
})
export class ApplicationPageModule {}
