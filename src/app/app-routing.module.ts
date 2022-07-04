import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CheckuserComponent } from './checkuser/checkuser.component';

const routes: Routes = [
  {
    path: '',
    component: CheckuserComponent
  },
  {
    path: 'app',
    loadChildren: () => import('./application/application.module').then(m => m.ApplicationPageModule)
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
