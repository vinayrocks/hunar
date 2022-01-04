import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { RdEventListComponent } from './components/rd-event-list/rd-event-list.component';
import { RdEventAddComponent } from './components/rd-event-add/rd-event-add.component';
import { RdEventEditComponent } from './components/rd-event-edit/rd-event-edit.component';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatDialogModule } from '@angular/material/dialog';
import { EmbedVideoService } from 'ngx-embed-video';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  declarations: [RdEventListComponent, RdEventAddComponent, RdEventEditComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    JwBootstrapSwitchNg2Module,
    MatExpansionModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    AngularEditorModule,
    MatDialogModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
    MatDatepickerModule
  ],
  providers: [EmbedVideoService]
})
export class EventModule { }
