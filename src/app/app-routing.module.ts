import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CheckuserComponent } from './checkuser/checkuser.component';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';

const routes: Routes = [
  {
    path: '',
    component: CheckuserComponent
  },
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'inbox',
    component: InboxComponent
  },
  {
    path: 'component',
    loadChildren: () => import('./component/component.module').then( m => m.ComponentPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
