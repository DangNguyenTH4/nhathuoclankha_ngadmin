import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonData } from './common/common';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: CommonData.StorePagePrefix,
    canActivate:[AuthGuardService],
    loadChildren:   './pages/pages.module#PagesModule'
  },
  {
    path: 'admin',
    canActivate:[AuthGuardService],
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule),
  },
  {
    path:'auth',
    loadChildren: ()=> import('./auth/auth/auth.module').then(m=>m.AuthModule),
  },
  
  { path: '', redirectTo: CommonData.StorePagePrefix, pathMatch: 'full' },
  { path: '**', redirectTo: CommonData.StorePagePrefix },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}