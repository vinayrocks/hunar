import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountModule } from './feature/account/account.module';
import { GuestModule } from './feature/guest/guest.module';
import { UserModule } from './feature/user/user.module';
import { RdResetPasswordComponent } from './rd-reset-password/rd-reset-password.component';
import { RdAuthGuard } from './shared/authentication/guard/rd-auth.guard';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path:'',
    loadChildren: './feature/guest/guest.module#GuestModule'
  },
  {
    path:'account',
    loadChildren: './feature/account/account.module#AccountModule'
  },
  {
    path:'resetpassword',
    component: RdResetPasswordComponent
  },
  {
    path:'member',
    loadChildren: './feature/user/user.module#UserModule',
    canActivate: [RdAuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
