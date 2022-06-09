import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from '../forum/forum.component';
import { InboxComponent } from '../inbox/inbox.component';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SupportComponent } from '../support/support.component';
import { TicketsComponent } from '../tickets/tickets.component';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'homepage',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'faq',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
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
        path: '',
        redirectTo: '/tabs/homepage',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/homepage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule],
})
export class TabsPageRoutingModule {}
