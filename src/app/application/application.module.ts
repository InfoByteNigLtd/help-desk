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
import { ChatPageComponent } from './chat/chat.page';
import { FaqPageComponent } from './faq/faq.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ApplicationPageRoutingModule,
    ComponentPageModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ApplicationPage,
    InboxComponent,
    HomeComponent,
    ForumComponent,
    PostDetailComponent,
    NewPostComponent,
    DashboardComponent,
    ChatPageComponent,
    FaqPageComponent,
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