import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { RdUserLayoutComponent } from './layout/rd-user-layout/rd-user-layout.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  declarations: [RdUserLayoutComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
    MatDatepickerModule
  ]
})
export class UserModule { 
 
}
