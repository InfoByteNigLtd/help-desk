import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { SupportComponent } from './support/support.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ApplicationPage } from './application.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { FaqPageComponent } from './faq/faq.page';
import { ChatPageComponent } from './chat/chat.page';
import { InboxComponent } from './inbox/inbox.component';

const routes: Routes = [
  {
    path: 'router',
    component: ApplicationPage,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'support',
        component: SupportComponent
      },
      {
        path: 'inbox',
        component: InboxComponent
      },
      {
        path: 'ticket',
        component: TicketsComponent,
      },
      {
        path: 'faq',
        component: FaqPageComponent,
      },
      {
        path: 'chat',
        component: ChatPageComponent,
      },
      {
        path: 'forum',
        component: ForumComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/router/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule],
})
export class ApplicationPageRoutingModule {}
