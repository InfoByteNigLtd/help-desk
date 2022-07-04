import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { SupportComponent } from './support/support.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ApplicationPage } from './application.page';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'router',
    component: ApplicationPage,
    children: [
      {
        path: 'home',
        component: HomeComponent
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
        path: 'inbox',
        component: InboxComponent,
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
        redirectTo: '/application/homepage',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/application/homepage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule],
})
export class ApplicationPageRoutingModule {}
