import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { SupportComponent } from './support/support.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ApplicationPage } from './application.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';
import { LoginComponent } from '../login/login.component';

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
        path: 'ticket',
        component: TicketsComponent,
      },
      {
        path: 'faq',
        component: Tab2Page,
      },
      {
        path: 'chat',
        component: Tab3Page,
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
