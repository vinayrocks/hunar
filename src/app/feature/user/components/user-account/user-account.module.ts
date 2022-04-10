import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountRoutingModule } from './user-account-routing.module';
import { RdMyAccountComponent } from './components/rd-my-account/rd-my-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [RdMyAccountComponent],
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class UserAccountModule { }
